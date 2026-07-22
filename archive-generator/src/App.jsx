import { useEffect, useMemo, useState } from 'react';
import { employees, getEmployeePortrait } from './data/employees';
import Page01EmployeeInformation from './templates/Page01EmployeeInformation';
import Page02SkillAssessment from './templates/Page02SkillAssessment';
import Page03PersonalityReview from './templates/Page03PersonalityReview';
import Page04ArchivistNote from './templates/Page04ArchivistNote';
import TypographyPreview from './components/TypographyPreview';

const referenceUrls = [1, 2, 3, 4].map((page) => new URL(`../references/afu-v1/afu-v1-page-0${page}.png`, import.meta.url).href);

const pages = [
  Page01EmployeeInformation,
  Page02SkillAssessment,
  Page03PersonalityReview,
  Page04ArchivistNote,
];

function GeneratedPage({ index, employee, portraitUrl }) {
  const Template = pages[index];
  return <Template employee={employee} portraitUrl={portraitUrl} />;
}

function ScaledPage({ index, scale, overlay, opacity, employee, portraitUrl }) {
  return (
    <div className="page-scale-shell" style={{ '--scale': scale }}>
      <div className="page-scale-stage">
        <GeneratedPage index={index} employee={employee} portraitUrl={portraitUrl} />
        {overlay && <img className="reference-overlay" src={referenceUrls[index]} alt="" style={{ opacity }} />}
      </div>
    </div>
  );
}

function ScaledTypography({ scale, background }) {
  return (
    <div className="typography-scale-shell" style={{ '--scale': scale }}>
      <div className="typography-scale-stage">
        <TypographyPreview background={background} />
      </div>
    </div>
  );
}

export default function App() {
  const query = new URLSearchParams(window.location.search);
  const exportMode = query.has('export');
  const developmentToolsEnabled = query.has('dev');
  const initialEmployeeNo = query.get('employee') ?? 'UC-0001';
  const [selectedEmployeeNo, setSelectedEmployeeNo] = useState(
    employees.some(({ employeeNo }) => employeeNo === initialEmployeeNo) ? initialEmployeeNo : 'UC-0001',
  );
  const [mode, setMode] = useState(developmentToolsEnabled && query.get('view') === 'typography' ? 'typography' : 'continuous');
  const [page, setPage] = useState(0);
  const [sizeMode, setSizeMode] = useState('fit');
  const [overlay, setOverlay] = useState(false);
  const [opacity, setOpacity] = useState(.45);
  const [typographyBackground, setTypographyBackground] = useState('paper');
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const employee = employees.find(({ employeeNo }) => employeeNo === selectedEmployeeNo) ?? employees[0];
  const portraitUrl = getEmployeePortrait(employee.employeeNo);

  async function exportEmployee(format) {
    const response = await fetch(`/api/archive-export?employee=${encodeURIComponent(employee.employeeNo)}`, { method: 'POST' });
    if (!response.ok) throw new Error(`导出 ${employee.employeeNo} 失败`);

    const filenames = format === 'pdf'
      ? [`${employee.employeeNo}-archive.pdf`]
      : [1, 2, 3, 4].map((pageNumber) => `${employee.employeeNo}-page-0${pageNumber}.png`);
    filenames.forEach((filename) => {
      const link = document.createElement('a');
      link.href = `/api/archive-export/file?employee=${encodeURIComponent(employee.employeeNo)}&filename=${encodeURIComponent(filename)}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const scale = useMemo(() => {
    if (exportMode || sizeMode === 'actual') return 1;
    const available = mode === 'compare' ? (viewportWidth - 132) / 2 : viewportWidth - 96;
    return Math.max(.18, Math.min(.72, available / 1055));
  }, [exportMode, mode, sizeMode, viewportWidth]);

  if (exportMode) {
    return <main className="export-pages">{pages.map((_, index) => <GeneratedPage index={index} employee={employee} portraitUrl={portraitUrl} key={index} />)}</main>;
  }

  const visiblePages = mode === 'continuous' ? [0, 1, 2, 3] : [page];
  const isArchivePreview = mode !== 'typography';

  return (
    <main className="generator-app">
      <header className="generator-toolbar">
        <div><strong>LCO ARCHIVE GENERATOR</strong><span>{employee.templateVersion} · {employee.employeeNo}</span></div>
        <nav aria-label="预览控制">
          <label>员工<select aria-label="员工选择" value={selectedEmployeeNo} onChange={(event) => setSelectedEmployeeNo(event.target.value)}>{employees.map((item) => <option value={item.employeeNo} key={item.employeeNo}>{item.employeeNo} · {item.nameZh}</option>)}</select></label>
          <label>模式<select value={mode} onChange={(event) => setMode(event.target.value)}><option value="continuous">四页连续</option><option value="single">单页</option>{developmentToolsEnabled && <option value="compare">并排对比</option>}{developmentToolsEnabled && <option value="typography">TYPOGRAPHY PREVIEW</option>}</select></label>
          {(mode === 'single' || mode === 'compare') && <label>页码<select value={page} onChange={(event) => setPage(Number(event.target.value))}>{pages.map((_, index) => <option value={index} key={index}>0{index + 1}</option>)}</select></label>}
          {mode === 'typography' && <label>背景<select value={typographyBackground} onChange={(event) => setTypographyBackground(event.target.value)}><option value="paper">米白档案纸</option><option value="white">纯白</option></select></label>}
          <button type="button" className={sizeMode === 'fit' ? 'is-active' : ''} onClick={() => setSizeMode('fit')}>自适应</button>
          <button type="button" className={sizeMode === 'actual' ? 'is-active' : ''} onClick={() => setSizeMode('actual')}>100%</button>
          {!developmentToolsEnabled && <button type="button" onClick={() => exportEmployee('png')}>导出PNG</button>}
          {!developmentToolsEnabled && <button type="button" onClick={() => exportEmployee('pdf')}>导出PDF</button>}
          {developmentToolsEnabled && isArchivePreview && <button type="button" className={overlay ? 'is-active' : ''} onClick={() => setOverlay((value) => !value)}>参考叠加</button>}
          {developmentToolsEnabled && isArchivePreview && overlay && <label>透明度<input type="range" min="0" max="1" step=".05" value={opacity} onChange={(event) => setOpacity(Number(event.target.value))} /></label>}
        </nav>
      </header>
      <section className={`preview-workspace preview-workspace--${mode}`}>
        {mode === 'typography' ? <ScaledTypography scale={scale} background={typographyBackground} /> : visiblePages.map((index) => mode === 'compare' ? (
          <div className="compare-row" key={index}>
            <div><span>CODE / GENERATED</span><ScaledPage index={index} scale={scale} overlay={overlay} opacity={opacity} employee={employee} portraitUrl={portraitUrl} /></div>
            <div><span>REFERENCE / AFU V1</span><div className="reference-scale-shell" style={{ '--scale': scale }}><img src={referenceUrls[index]} alt={`阿福 V1 第 ${index + 1} 页参考图`} /></div></div>
          </div>
        ) : <ScaledPage index={index} scale={scale} overlay={overlay} opacity={opacity} employee={employee} portraitUrl={portraitUrl} key={index} />)}
      </section>
    </main>
  );
}
