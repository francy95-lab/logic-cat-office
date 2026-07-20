import React, { useEffect, useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import archiveEmployees from '../data/employees';
import './EmployeeDetailPage.css';

export default function EmployeeDetailPage({ slug }) {
  const employee = archiveEmployees.find((item) => item.slug === slug);
  const [archivePageIndex, setArchivePageIndex] = useState(0);
  const [archiveDirection, setArchiveDirection] = useState('next');
  const archivePageCount = employee?.archiveFiles?.length ?? 0;

  const changeArchivePage = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= archivePageCount || nextIndex === archivePageIndex) return;
    setArchiveDirection(nextIndex > archivePageIndex ? 'next' : 'previous');
    setArchivePageIndex(nextIndex);
  };

  useEffect(() => {
    if (!employee?.archiveFiles?.length) return undefined;

    employee.archiveFiles.forEach((file) => {
      const image = new Image();
      image.src = file;
    });

    const handleArchiveKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setArchiveDirection('previous');
        setArchivePageIndex((current) => Math.max(0, current - 1));
      }
      if (event.key === 'ArrowRight') {
        setArchiveDirection('next');
        setArchivePageIndex((current) => Math.min(archivePageCount - 1, current + 1));
      }
    };

    window.addEventListener('keydown', handleArchiveKeyDown);
    return () => window.removeEventListener('keydown', handleArchiveKeyDown);
  }, [employee, archivePageCount]);

  if (!employee) {
    return (
      <main className="employee-detail-page">
        <SiteHeader currentPath="/archive" />
        <section className="employee-detail-missing shell">
          <p>EMPLOYEE FILE NOT FOUND</p>
          <h1>未找到该员工档案。</h1>
          <a href="/archive">返回员工档案</a>
        </section>
      </main>
    );
  }

  const employeeDetails = [
    ['员工编号', employee.id],
    ['部门', employee.department],
    ['职位', employee.position],
    ['状态', employee.status],
    ['等级', employee.rating],
  ];

  return (
    <main className="employee-detail-page">
      <SiteHeader currentPath="/archive" />

      <section className="employee-detail shell" aria-labelledby="employee-detail-name">
        <div className="employee-detail-visual">
          <img src={employee.coverImage} alt={`${employee.nameZh} / ${employee.nameEn}`} />
        </div>

        <div className="employee-detail-information">
          <div className="employee-detail-heading">
            <p>EMPLOYEE FILE / {employee.id}</p>
            <h1 id="employee-detail-name">{employee.nameZh}</h1>
            <span>{employee.nameEn}</span>
          </div>

          <dl className="employee-detail-specs">
            {employeeDetails.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="employee-detail-actions">
            <a className="employee-detail-back" href="/archive">← 返回员工档案</a>
          </div>
        </div>
      </section>

      {employee.archiveFiles?.length > 0 && (
        <section className="employee-detail-archive shell" aria-labelledby="employee-detail-archive-title">
          <header className="employee-detail-archive-header">
            <div>
              <p>OFFICIAL EMPLOYEE RECORD</p>
              <h2 id="employee-detail-archive-title">EMPLOYEE ARCHIVE FILE</h2>
            </div>
            <span>{employee.id} / {String(employee.archiveFiles.length).padStart(2, '0')} PAGES</span>
          </header>

          <div className="employee-detail-archive-viewer" aria-live="polite">
            <figure
              className={`employee-detail-archive-sheet is-${archiveDirection}`}
              key={`${archivePageIndex}-${archiveDirection}`}
            >
              <img
                src={employee.archiveFiles[archivePageIndex]}
                alt={`${employee.nameZh}员工档案第${archivePageIndex + 1}页`}
              />
            </figure>
          </div>

          <div className="employee-detail-archive-controls" aria-label="档案翻页控制">
            <button
              type="button"
              onClick={() => changeArchivePage(archivePageIndex - 1)}
              disabled={archivePageIndex === 0}
              aria-label="上一页"
            >
              <small>上一页</small>
              <span aria-hidden="true">←</span>
            </button>
            <span className="employee-detail-archive-counter">
              PAGE {String(archivePageIndex + 1).padStart(2, '0')} / {String(archivePageCount).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => changeArchivePage(archivePageIndex + 1)}
              disabled={archivePageIndex === archivePageCount - 1}
              aria-label="下一页"
            >
              <span aria-hidden="true">→</span>
              <small>下一页</small>
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
