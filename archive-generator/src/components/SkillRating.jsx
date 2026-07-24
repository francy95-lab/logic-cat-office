const starPath = 'M10 1.1 12.8 6.7 19.1 7.6 14.5 12.1 15.6 18.5 10 15.5 4.2 18.6 5.4 12.2.8 7.7 7.1 6.8Z';

export default function SkillRating({ score, total = 5, variant = 'default' }) {
  return (
    <div className={`skill-rating skill-rating--${variant}`} aria-label={`${score} / ${total} 星`}>
      {Array.from({ length: total }, (_, index) => (
        <svg viewBox="0 0 20 20" key={index} aria-hidden="true">
          <path d={starPath} className={index < score ? 'is-filled' : ''} />
        </svg>
      ))}
    </div>
  );
}
