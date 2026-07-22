# LCO Employee Archive Generator

独立的逻辑猫事务所员工四页档案生成器。第一阶段只实现 `AFU_V1.0` 与员工 `UC-0006`，不接入现有官网。

## 本地使用

```powershell
cd archive-generator
npm install
npm run dev
```

默认开发地址为 `http://127.0.0.1:4175/`。

正式构建：

```powershell
npm run build
```

导出脚本骨架：

```powershell
npm run preview
npm run export
```

导出脚本使用 Playwright 打开 `http://127.0.0.1:4175/?export=1`，生成单页 PNG 与四页 PDF 到 `output/UC-0006/`。第一阶段暂不包含其他员工或批量队列。

## 模板约束

- 画布固定为 1055 × 1491 px。
- 员工内容只来自 `src/data/UC-0006.json`。
- 固定排版、颜色、坐标和字体候选集中在 `src/styles/tokens.css` 与页面样式中。
- 阿福整页参考图只用于并排对比和透明叠加，不作为生成页面背景。
- 画像、数据、模板、可复用 SVG 组件、参考图和导出结果相互分离。

## 正式字体系统

- `Source Serif 4` 700：仅用于 `EMPLOYEE ARCHIVE` 主英文衬线标题。
- `IBM Plex Mono` 400 / 500 / 600：用于英文系统文字、工号、字段、数据、状态、页脚和章节标题。
- `Source Han Sans SC` 400 / 500 / 700：用于中文标题、字段和正文。
- `LXGW WenKai GB` 400：仅用于第四页便笺上的档案管理员备注正文。
- `01`～`04` 页码使用固定 SVG，不依赖字体。
- L 签名使用真实透明 PNG，不使用字体模拟。

字体全部本地自托管，不使用在线字体、第三方 CDN 或系统字体回退。版本、官方来源、原始文件名、SHA-256 和许可记录见 `licenses/fonts/FONT-MANIFEST.md`。

Typography Preview 可通过预览工具栏选择，或直接打开：

`http://127.0.0.1:4175/?view=typography`
