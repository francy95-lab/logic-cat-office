# L Signature Assets

- 原始照片：`references/brand/l-signature-source.jpg`
- 原始照片 SHA-256：`D0FD2F4FB4F508828A99E39B551B6FA4C7EB9A76AE209BDD24E03E796752F5D8`
- 正式基准候选：`l-signature-transparent.png`
- 对比候选：`l-signature.svg`

透明 PNG 由本地脚本 `scripts/process-signature.py` 对原始照片执行 EXIF 方向校正、最大连通笔画检测、精确裁切与灰纸背景透明化生成。处理过程没有使用 AI、字体字母、手工重绘、拉直或比例修正。

SVG 是根据透明 PNG 自动描摹得到的比较候选，可能损失部分笔触与墨色细节。在人工确认前，第四页继续以透明 PNG 为真实签名基准。
