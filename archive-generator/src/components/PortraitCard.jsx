import PaperClip from './PaperClip';

export default function PortraitCard({ src, alt, variant = 'small' }) {
  return (
    <figure className={`portrait-card portrait-card--${variant}`}>
      <PaperClip />
      <img src={src} alt={alt} />
    </figure>
  );
}
