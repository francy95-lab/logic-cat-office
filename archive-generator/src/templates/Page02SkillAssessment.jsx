import ArchiveHeader from '../components/ArchiveHeader';
import ArchiveFooter from '../components/ArchiveFooter';
import PortraitCard from '../components/PortraitCard';
import SkillIcon from '../components/SkillIcon';
import SkillRating from '../components/SkillRating';

export default function Page02SkillAssessment({ employee, portraitUrl }) {
  return (
    <article className="archive-page page-02" data-page="2">
      <ArchiveHeader page={2} />
      <PortraitCard src={portraitUrl} alt={`${employee.nameZh}小画像卡`} variant="page02" />
      <div className="page02-title page-section-heading"><h2>SKILL<br />ASSESSMENT</h2><p>能力评估</p></div>
      <section className="skill-list">
        {employee.skills.map((skill) => (
          <div className="skill-row" key={skill.key}>
            <span className="skill-icon-frame"><SkillIcon type={skill.key} variant="page02-reference" /></span>
            <span className="skill-name">{skill.labelZh}</span>
            <SkillRating score={skill.score} variant="page02-v11" />
          </div>
        ))}
      </section>
      <ArchiveFooter employeeNo={employee.employeeNo} />
    </article>
  );
}
