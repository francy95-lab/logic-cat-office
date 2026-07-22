export default function PaperClip({ className = '' }) {
  return (
    <svg className={`paper-clip ${className}`} viewBox="0 0 54 164" aria-hidden="true">
      <path d="M35 151c-17 0-26-12-24-29L19 28C21 11 30 3 41 5c10 2 15 11 13 27l-8 84c-1 12-6 18-13 17-7-1-10-7-9-17l7-77" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M31 39 24 117c-1 9 2 15 9 16" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".55" />
    </svg>
  );
}
