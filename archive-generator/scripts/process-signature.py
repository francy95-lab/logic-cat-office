"""Extract L's real signature without generative or redrawing steps.

The PNG is the archival source asset. The SVG is an automatically traced
candidate for visual comparison only and must not replace the PNG without
human approval.
"""

from collections import defaultdict, deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "references" / "brand" / "l-signature-source.jpg"
OUTPUT_DIR = ROOT / "src" / "assets" / "signatures"
PNG_OUTPUT = OUTPUT_DIR / "l-signature-transparent.png"
SVG_OUTPUT = OUTPUT_DIR / "l-signature.svg"


def largest_component(mask: np.ndarray) -> np.ndarray:
    points = {tuple(point) for point in np.argwhere(mask)}
    largest: list[tuple[int, int]] = []

    while points:
        start = points.pop()
        queue = deque([start])
        component = [start]

        while queue:
            y, x = queue.popleft()
            for neighbor in (
                (y - 1, x - 1), (y - 1, x), (y - 1, x + 1),
                (y, x - 1), (y, x + 1),
                (y + 1, x - 1), (y + 1, x), (y + 1, x + 1),
            ):
                if neighbor in points:
                    points.remove(neighbor)
                    queue.append(neighbor)
                    component.append(neighbor)

        if len(component) > len(largest):
            largest = component

    result = np.zeros_like(mask, dtype=bool)
    if largest:
        ys, xs = zip(*largest)
        result[np.asarray(ys), np.asarray(xs)] = True
    return result


def simplify_collinear(points: list[tuple[int, int]]) -> list[tuple[int, int]]:
    if len(points) < 4:
        return points
    simplified = [points[0]]
    for index in range(1, len(points) - 1):
        ax, ay = simplified[-1]
        bx, by = points[index]
        cx, cy = points[index + 1]
        if (bx - ax) * (cy - by) != (by - ay) * (cx - bx):
            simplified.append((bx, by))
    simplified.append(points[-1])
    return simplified


def trace_pixel_edges(mask: np.ndarray) -> list[list[tuple[int, int]]]:
    height, width = mask.shape
    outgoing: dict[tuple[int, int], list[tuple[int, int]]] = defaultdict(list)

    for y, x in np.argwhere(mask):
        if y == 0 or not mask[y - 1, x]:
            outgoing[(x, y)].append((x + 1, y))
        if x == width - 1 or not mask[y, x + 1]:
            outgoing[(x + 1, y)].append((x + 1, y + 1))
        if y == height - 1 or not mask[y + 1, x]:
            outgoing[(x + 1, y + 1)].append((x, y + 1))
        if x == 0 or not mask[y, x - 1]:
            outgoing[(x, y + 1)].append((x, y))

    loops: list[list[tuple[int, int]]] = []
    while outgoing:
        start = next(iter(outgoing))
        current = start
        loop = [start]

        while True:
            candidates = outgoing.get(current)
            if not candidates:
                break
            next_point = candidates.pop()
            if not candidates:
                outgoing.pop(current, None)
            loop.append(next_point)
            current = next_point
            if current == start:
                break

        if len(loop) >= 4 and loop[-1] == start:
            loops.append(simplify_collinear(loop))
    return loops


def create_svg(alpha: Image.Image, output: Path) -> None:
    target_height = 520
    scale = target_height / alpha.height
    target_width = max(1, round(alpha.width * scale))
    resized = alpha.resize((target_width, target_height), Image.Resampling.LANCZOS)
    binary = np.asarray(resized) >= 72
    binary = largest_component(binary)
    loops = trace_pixel_edges(binary)
    paths = []

    for loop in loops:
        commands = [f"M {loop[0][0]} {loop[0][1]}"]
        commands.extend(f"L {x} {y}" for x, y in loop[1:-1])
        commands.append("Z")
        paths.append(" ".join(commands))

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {target_width} {target_height}" role="img" aria-label="L signature vector candidate">
  <title>L signature — automatically traced comparison candidate</title>
  <desc>Derived from l-signature-transparent.png. The PNG remains the archival signature source asset.</desc>
  <path d="{' '.join(paths)}" fill="#111111" fill-rule="evenodd"/>
</svg>
'''
    output.write_text(svg, encoding="utf-8", newline="\n")


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"Signature source is missing: {SOURCE}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    original = ImageOps.exif_transpose(Image.open(SOURCE)).convert("RGB")
    grayscale = ImageOps.grayscale(original)
    gray_array = np.asarray(grayscale)

    core = largest_component(gray_array < 100)
    y_points, x_points = np.where(core)
    if not len(x_points):
        raise RuntimeError("No signature stroke could be isolated from the source photo.")

    padding = 52
    left = max(0, int(x_points.min()) - padding)
    top = max(0, int(y_points.min()) - padding)
    right = min(original.width, int(x_points.max()) + padding + 1)
    bottom = min(original.height, int(y_points.max()) + padding + 1)

    crop_box = (left, top, right, bottom)
    gray_crop = grayscale.crop(crop_box)
    crop_array = np.asarray(gray_crop).astype(np.int16)
    core_crop = Image.fromarray((core[top:bottom, left:right] * 255).astype(np.uint8))
    permitted_region = np.asarray(core_crop.filter(ImageFilter.MaxFilter(25))) > 0

    local_background = np.asarray(gray_crop.filter(ImageFilter.GaussianBlur(34))).astype(np.int16)
    local_difference = np.maximum(local_background - crop_array, 0)
    difference_alpha = np.clip((local_difference - 3) * 5.2, 0, 255)
    absolute_alpha = np.clip((146 - crop_array) * 1.45, 0, 255)
    alpha_array = np.maximum(difference_alpha, absolute_alpha * 0.68)
    alpha_array = np.where(permitted_region, alpha_array, 0)
    alpha_array = np.where(alpha_array >= 7, alpha_array, 0).astype(np.uint8)

    alpha = Image.fromarray(alpha_array, mode="L")
    alpha_bbox = alpha.getbbox()
    if alpha_bbox is None:
        raise RuntimeError("The generated transparent signature has no visible pixels.")

    trim_padding = 8
    ax0, ay0, ax1, ay1 = alpha_bbox
    trim_box = (
        max(0, ax0 - trim_padding),
        max(0, ay0 - trim_padding),
        min(alpha.width, ax1 + trim_padding),
        min(alpha.height, ay1 + trim_padding),
    )
    alpha = alpha.crop(trim_box)
    rgba = Image.new("RGBA", alpha.size, (15, 15, 15, 0))
    rgba.putalpha(alpha)
    rgba.save(PNG_OUTPUT, optimize=True)
    create_svg(alpha, SVG_OUTPUT)

    print(f"Source preserved: {SOURCE}")
    print(f"Transparent PNG: {PNG_OUTPUT} ({rgba.width}x{rgba.height})")
    print(f"SVG candidate: {SVG_OUTPUT}")


if __name__ == "__main__":
    main()
