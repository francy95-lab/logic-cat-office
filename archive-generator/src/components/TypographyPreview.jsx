import { useEffect, useState } from 'react';
import signaturePngUrl from '../assets/signatures/l-signature-transparent.png';
import signatureSvgUrl from '../assets/signatures/l-signature.svg';

const signatureSourceUrl = new URL('../../references/brand/l-signature-source.jpg', import.meta.url).href;

const fontChecks = [
  {
    key: 'source-serif',
    name: 'Source Serif 4',
    family: 'Source Serif 4',
    weights: [700],
    sample: 'EMPLOYEE ARCHIVE',
  },
  {
    key: 'ibm-plex-mono',
    name: 'IBM Plex Mono',
    family: 'IBM Plex Mono',
    weights: [400, 500, 600],
    sample: 'FILE NO. UC-0006',
  },
  {
    key: 'source-han-sans',
    name: 'Source Han Sans SC',
    family: 'Source Han Sans SC',
    weights: [400, 500, 700],
    sample: '逻辑猫事务所·员工档案',
  },
  {
    key: 'lxgw-wenkai',
    name: 'LXGW WenKai GB',
    family: 'LXGW WenKai GB',
    weights: [400],
    sample: '第一次记录阿福的时候',
  },
];

export default function TypographyPreview({ background }) {
  const [loadReport, setLoadReport] = useState(() => fontChecks.map((font) => ({ ...font, loaded: false, state: '等待加载' })));

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (!active) return;
      setLoadReport(fontChecks.map((font) => {
        const loadedWeights = font.weights.filter((weight) => document.fonts.check(`${weight} 32px "${font.family}"`, font.sample));
        return {
          ...font,
          loaded: loadedWeights.length === font.weights.length,
          state: `${loadedWeights.length}/${font.weights.length} 字重已加载`,
        };
      }));
    });
    return () => { active = false; };
  }, []);

  return (
    <article className={`typography-preview typography-preview--${background}`}>
      <header className="typography-preview__header">
        <div>
          <p>DEVELOPMENT MODE / FONT LOCK</p>
          <h1>TYPOGRAPHY PREVIEW</h1>
        </div>
        <p>AFU_V1.0 · UC-0006</p>
      </header>

      <section className="font-status-grid" aria-label="字体加载状态">
        {loadReport.map((font) => (
          <div className={`font-status ${font.loaded ? 'is-loaded' : 'is-missing'}`} key={font.key} data-font-status={font.loaded ? 'loaded' : 'missing'}>
            <span aria-hidden="true" />
            <strong>{font.name}</strong>
            <small>{font.state}</small>
          </div>
        ))}
      </section>

      <section className="type-sample type-sample--serif">
        <div className="type-sample__meta"><strong>Source Serif 4</strong><span>font-family: Source Serif 4 · weight: 700</span></div>
        <h2>EMPLOYEE ARCHIVE</h2>
        <p>Logic Cat Office · Employee Archive · Afu</p>
      </section>

      <section className="type-sample type-sample--mono">
        <div className="type-sample__meta"><strong>IBM Plex Mono</strong><span>font-family: IBM Plex Mono · weights: 400 / 500 / 600</span></div>
        <h2>LOGIC CAT OFFICE</h2>
        <p className="weight-400">FILE NO. UC-0006 · 2026.07.19 · ACTIVE</p>
        <p className="weight-600">EMPLOYEE INFORMATION / 01 — [ARCHIVE VERIFIED]</p>
      </section>

      <section className="type-sample type-sample--chinese">
        <div className="type-sample__meta"><strong>Source Han Sans SC / 思源黑体</strong><span>font-family: Source Han Sans SC · weights: 400 / 500 / 700</span></div>
        <h2>逻辑猫事务所·员工档案</h2>
        <h3>员工信息　异常行为研究部</h3>
        <p>每一份员工档案都经过观察、确认与归档，并被永久收录于事务所数据库。</p>
      </section>

      <section className="type-sample type-sample--hand">
        <div className="type-sample__meta"><strong>LXGW WenKai GB / 霞鹜文楷 GB</strong><span>font-family: LXGW WenKai GB · weight: 400</span></div>
        <h2>第一次记录阿福的时候，</h2>
        <p>我以为它只是一只表情很臭的猫。后来我发现：有些猫不需要做什么。它们存在本身，就是一种记录。</p>
      </section>

      <section className="signature-comparison">
        <div className="type-sample__meta"><strong>L / REAL SIGNATURE</strong><span>原图保留 · PNG 为基准 · SVG 为自动描摹候选</span></div>
        <div className="signature-comparison__grid">
          <figure>
            <div className="signature-preview-cell signature-preview-cell--source"><img src={signatureSourceUrl} alt="L 真实签名原始照片" /></div>
            <figcaption>ORIGINAL SOURCE JPG<br /><small>未覆盖、未修改</small></figcaption>
          </figure>
          <figure>
            <div className="signature-preview-cell signature-preview-cell--transparent"><img src={signaturePngUrl} alt="L 真实签名透明 PNG" /></div>
            <figcaption>TRANSPARENT PNG<br /><small>第四页当前使用基准</small></figcaption>
          </figure>
          <figure>
            <div className="signature-preview-cell signature-preview-cell--vector"><img src={signatureSvgUrl} alt="L 真实签名 SVG 候选" /></div>
            <figcaption>SVG CANDIDATE<br /><small>仅供视觉对比</small></figcaption>
          </figure>
        </div>
      </section>
    </article>
  );
}
