const digitPaths = {
  0: 'M 27 5 C 13 6 7 24 7 52 C 7 83 15 102 28 102 C 42 102 49 79 49 51 C 49 23 41 5 27 5',
  1: 'M 14 25 L 31 8 L 31 102 M 16 102 L 47 102',
  2: 'M 7 28 C 10 12 20 5 31 7 C 43 9 48 19 46 31 C 43 48 24 61 8 78 L 7 101 L 48 101',
  3: 'M 8 17 C 17 7 31 4 40 11 C 51 20 44 38 30 48 C 45 51 51 61 48 77 C 45 94 29 105 9 98',
  4: 'M 40 103 L 40 6 L 7 70 L 51 70',
};

export default function ArchivePageNumber({ page }) {
  return (
    <svg className="archive-page-number" viewBox="0 0 112 110" aria-label={`第 ${page} 页`} role="img">
      <g className="archive-page-number__digit">
        <path d={digitPaths[0]} />
      </g>
      <g className="archive-page-number__digit" transform="translate(57 0)">
        <path d={digitPaths[page]} />
      </g>
    </svg>
  );
}
