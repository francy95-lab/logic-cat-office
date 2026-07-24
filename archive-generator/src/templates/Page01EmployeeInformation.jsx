import ArchiveHeader from '../components/ArchiveHeader';
import ArchiveFooter from '../components/ArchiveFooter';
import PaperClip from '../components/PaperClip';
import ActiveStamp from '../components/ActiveStamp';
import CatPaw from '../components/CatPaw';
import AutoFitText from '../components/AutoFitText';

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
        <svg className="page01-archive-lines" viewBox="0 0 34 758" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <filter id="page01ArchiveLineWear" x="-30%" y="-2%" width="160%" height="104%">
              <feTurbulence type="fractalNoise" baseFrequency=".04 .012" numOctaves="2" seed="8" result="lineNoise" />
              <feDisplacementMap in="SourceGraphic" in2="lineNoise" scale=".7" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <g filter="url(#page01ArchiveLineWear)" fill="none" strokeLinecap="round">
            <path className="page01-archive-line page01-archive-line--outer" d="M5.4 4C5 83 5.8 147 5.2 224c-.5 82 .7 151 .1 230-.5 68 .4 137-.1 199-.2 38 .2 70-.1 98" />
            <path className="page01-archive-line page01-archive-line--inner" d="M27 6c-.4 67 .5 132 0 200-.4 76 .6 149 .1 223-.5 69 .4 133-.1 197-.2 47 .2 84-.2 125" />
            <path className="page01-archive-line-wear" d="M4.4 48v41m1.1 76v31m-.7 95v58m.5 117v28m-.6 96v63M26.3 72v24m1.2 87v52m-.8 94v27m.6 118v49m-.7 95v35" />
          </g>
        </svg>
        <PaperClip variant="page01" />
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
        <AutoFitText as="h2" contentKey={`${employee.nameZh}-${employee.nameEn}`} maxFontSize={65} minFontSize={30} maxLineHeight={1} minLineHeight={1}>
          {employee.nameZh}<span>（{employee.nameEn}）</span>
        </AutoFitText>
        <CatPaw />
      </section>
      <ActiveStamp text={employee.statusEn} />
      <ArchiveFooter employeeNo={employee.employeeNo} />
    </article>
  );
}
