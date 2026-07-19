import React from 'react';
import SiteHeader from '../components/SiteHeader';
import archiveEmployees from '../data/employees';
import './ArchivePage.css';

export default function ArchivePage() {
  return (
    <main className="archive-overview-page">
      <SiteHeader currentPath="/archive" />

      <section className="archive-overview shell" aria-labelledby="archive-overview-title">
        <header className="archive-overview-header">
          <div className="archive-overview-heading">
            <p>EMPLOYEE ARCHIVE</p>
            <h1 id="archive-overview-title">员工档案</h1>
          </div>
          <div className="archive-overview-summary">
            <p>已公开档案 03 份</p>
            <p>更多员工正在接受背景调查。</p>
          </div>
        </header>

        <div className="archive-catalog" aria-label="公开员工档案">
          {archiveEmployees.map((employee) => (
            <a
              className="archive-catalog-card"
              href={`/archive/${employee.slug}`}
              aria-label={`查看${employee.nameZh}员工档案`}
              key={employee.id}
            >
              <div className="archive-catalog-image">
                <img src={employee.coverImage} alt={`${employee.nameZh} / ${employee.nameEn}`} />
              </div>
              <div className="archive-catalog-info">
                <span>{employee.id}</span>
                <h2>{employee.nameZh}</h2>
                <p>{employee.nameEn}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
