const points = '10,1 12.9,6.8 19.3,7.7 14.6,12.2 15.7,18.6 10,15.6 4.3,18.6 5.4,12.2 .7,7.7 7.1,6.8';

export default function SkillRating({ score, total = 5 }) {
  return (
    <div className="skill-rating" aria-label={`${score} / ${total} 星`}>
      {Array.from({ length: total }, (_, index) => (
        <svg viewBox="0 0 20 20" key={index} aria-hidden="true">
          <polygon points={points} className={index < score ? 'is-filled' : ''} />
        </svg>
      ))}
    </div>
  );
}
