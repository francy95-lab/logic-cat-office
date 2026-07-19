import React, { useEffect, useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import archiveEmployees from '../data/employees';
import './EmployeeArchiveFilePage.css';

export default function EmployeeArchiveFilePage({ slug }) {
  const employee = archiveEmployees.find((item) => item.slug === slug && item.archiveFiles);
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const pageCount = employee?.archiveFiles.length ?? 0;

  const changePage = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= pageCount || nextIndex === pageIndex) return;
    setDirection(nextIndex > pageIndex ? 'next' : 'previous');
    setPageIndex(nextIndex);
  };

  useEffect(() => {
    if (!employee) return undefined;

    employee.archiveFiles.forEach((file) => {
      const image = new Image();
      image.src = file;
    });

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') setPageIndex((current) => Math.max(0, current - 1));
      if (event.key === 'ArrowRight') setPageIndex((current) => Math.min(pageCount - 1, current + 1));
      if (event.key === 'ArrowLeft') setDirection('previous');
      if (event.key === 'ArrowRight') setDirection('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [employee, pageCount]);

  if (!employee) {
    return (
      <main className="employee-file-page">
        <SiteHeader currentPath="/archive" />
        <section className="employee-file-missing shell">
          <p>ARCHIVE FILE NOT AVAILABLE</p>
          <h1>该员工档案尚未公开。</h1>
          <a href={`/archive/${slug}`}>返回员工详情</a>
        </section>
      </main>
    );
  }

  return (
    <main className="employee-file-page">
      <SiteHeader currentPath="/archive" />

      <section className="employee-file shell" aria-labelledby="employee-file-title">
        <header className="employee-file-header">
          <div>
            <p>EMPLOYEE ARCHIVE FILE</p>
            <h1 id="employee-file-title">{employee.nameZh}</h1>
          </div>
          <div className="employee-file-identity">
            <span>EMPLOYEE NO.</span>
            <strong>{employee.id}</strong>
          </div>
        </header>

        <div className="employee-file-viewer" aria-live="polite">
          <figure
            className={`employee-file-sheet is-${direction}`}
            key={`${pageIndex}-${direction}`}
          >
            <img
              src={employee.archiveFiles[pageIndex]}
              alt={`${employee.nameZh}员工档案第${pageIndex + 1}页`}
            />
          </figure>
        </div>

        <footer className="employee-file-controls">
          <a className="employee-file-back" href={`/archive/${employee.slug}`}>返回员工详情</a>
          <div className="employee-file-pagination" aria-label="档案翻页控制">
            <button
              type="button"
              onClick={() => changePage(pageIndex - 1)}
              disabled={pageIndex === 0}
              aria-label="上一页"
            >
              <span aria-hidden="true">←</span>
              <small>上一页</small>
            </button>
            <span className="employee-file-counter">
              PAGE {String(pageIndex + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => changePage(pageIndex + 1)}
              disabled={pageIndex === pageCount - 1}
              aria-label="下一页"
            >
              <small>下一页</small>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
