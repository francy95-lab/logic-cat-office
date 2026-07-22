import ArchiveHeader from '../components/ArchiveHeader';
import ArchiveFooter from '../components/ArchiveFooter';
import PortraitCard from '../components/PortraitCard';
import TagLabel from '../components/TagLabel';
import GradeStamp from '../components/GradeStamp';
import AutoFitText from '../components/AutoFitText';

export default function Page03PersonalityReview({ employee, portraitUrl }) {
  const review = employee.performanceReview;
  return (
    <article className="archive-page page-03" data-page="3">
      <ArchiveHeader page={3} />
      <PortraitCard src={portraitUrl} alt={`${employee.nameZh}小画像卡`} />
      <section className="personality-block">
        <div className="page-section-heading"><h2>PERSONALITY TAG</h2><p>性格标签</p></div>
        <div className="tag-list">{employee.tags.map((tag) => <TagLabel key={tag}>{tag}</TagLabel>)}</div>
      </section>
      <section className="performance-block">
        <div className="page-section-heading"><h2>PERFORMANCE REVIEW</h2><p>员工业绩评价</p></div>
        <div className="review-paper">
          <AutoFitText className="review-copy" contentKey={JSON.stringify(review)} maxFontSize={26} minFontSize={10} maxLineHeight={1.35} minLineHeight={1.12}>
            {review.body.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
            <p className="review-grade">评价等级：{review.grade}（{review.gradeLabel}）</p>
            <div className="review-reason"><strong>原因：</strong>{review.reason.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}</div>
          </AutoFitText>
          <GradeStamp grade={review.grade} />
        </div>
      </section>
      <ArchiveFooter employeeNo={employee.employeeNo} />
    </article>
  );
}
