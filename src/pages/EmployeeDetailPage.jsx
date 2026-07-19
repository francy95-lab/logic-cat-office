import React from 'react';
import SiteHeader from '../components/SiteHeader';
import archiveEmployees from '../data/employees';
import './EmployeeDetailPage.css';

export default function EmployeeDetailPage({ slug }) {
  const employee = archiveEmployees.find((item) => item.slug === slug);

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
            {employee.archiveFiles ? (
              <a className="employee-detail-file-button" href={`/archive/${employee.slug}/file`}>
                <span>VIEW ARCHIVE FILE</span>
                <small>查看员工档案</small>
              </a>
            ) : (
              <button className="employee-detail-file-button" type="button">
                <span>VIEW ARCHIVE FILE</span>
                <small>查看员工档案</small>
              </button>
            )}
            <a className="employee-detail-back" href="/archive">← 返回员工档案</a>
          </div>
        </div>
      </section>
    </main>
  );
}
