const page03AStampUrl = new URL('../../reference/page03_A.png', import.meta.url).href;

export default function GradeStamp({ grade, variant = 'default' }) {
  if (variant === 'page03-reference' && grade === 'A') {
    return (
      <div className="grade-stamp grade-stamp--reference" aria-label={`评价等级 ${grade}`}>
        <img src={page03AStampUrl} alt="" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="grade-stamp" aria-label={`评价等级 ${grade}`}>
      <span>{grade}</span>
    </div>
  );
}
