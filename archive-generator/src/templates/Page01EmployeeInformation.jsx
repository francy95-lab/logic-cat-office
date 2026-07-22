import ArchiveHeader from '../components/ArchiveHeader';
import ArchiveFooter from '../components/ArchiveFooter';
import PaperClip from '../components/PaperClip';
import ActiveStamp from '../components/ActiveStamp';
import CatPaw from '../components/CatPaw';

const fields = [
  ['NAME', '姓名', (employee) => `${employee.nameZh}（${employee.nameEn}）`],
  ['EMPLOYEE NO.', '编号', (employee) => employee.employeeNo],
  ['SPECIES', '物种', (employee) => employee.species],
  ['DEPARTMENT', '部门', (employee) => employee.department],
  ['POSITION', '职位', (employee) => employee.position],
  ['JOIN DATE', '入职日期', (employee) => employee.joinDate],
  ['STATUS', '状态', (employee) => `${employee.statusZh}（${employee.statusEn}）`],
  ['LEVEL', '等级', (employee) => employee.level],
];

export default function Page01EmployeeInformation({ employee, portraitUrl }) {
  return (
    <article className="archive-page page-01" data-page="1">
      <ArchiveHeader page={1} />
      <section className="page01-portrait">
        <PaperClip />
        <img src={portraitUrl} alt={`${employee.nameZh}员工画像`} />
      </section>
      <section className="page01-info">
        <div className="page-section-heading"><h2>EMPLOYEE<br />INFORMATION</h2><p>员工信息</p></div>
        <dl>
          {fields.map(([labelEn, labelZh, value]) => (
            <div key={labelEn}><dt>{labelEn} <small>{labelZh}</small></dt><dd>{value(employee)}</dd></div>
          ))}
        </dl>
      </section>
      <section className="page01-identity">
        <p>FILE NO.</p><strong>{employee.employeeNo}</strong>
        <h2>{employee.nameZh}<span>（{employee.nameEn}）</span></h2>
        <CatPaw />
      </section>
      <ActiveStamp text={employee.statusEn} />
      <ArchiveFooter employeeNo={employee.employeeNo} />
    </article>
  );
}
