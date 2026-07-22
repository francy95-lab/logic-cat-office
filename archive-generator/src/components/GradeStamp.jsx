export default function GradeStamp({ grade }) {
  return (
    <div className="grade-stamp" aria-label={`评价等级 ${grade}`}>
      <span>{grade}</span>
    </div>
  );
}
