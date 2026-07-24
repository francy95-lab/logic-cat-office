export default function PaperClip({ className = '', variant = 'default' }) {
  if (variant === 'page01') {
    return (
      <svg className={`paper-clip paper-clip--page01 ${className}`} viewBox="0 0 48 164" aria-hidden="true">
        <path d="M31.8 158.4C16.4 159.1 8.6 148 10 131.2L17.1 25.8C18.3 10.3 25.1 3.1 34.8 4.1c9.1.9 13.8 9.4 12.5 24.1l-7.5 94.4c-1 13-6.2 20-13.7 19.1-7.1-.9-10.6-7.4-9.6-19.2l6.8-88.8" fill="none" stroke="currentColor" strokeWidth="3.15" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.3 33.7 16.5 122.5c-1 11.8 2.5 18.3 9.6 19.2" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity=".7" />
        <path d="M34.1 6.1c5.7.2 9.1 4.2 10.2 11.2" fill="none" stroke="#fff" strokeWidth=".75" strokeLinecap="round" opacity=".58" />
      </svg>
    );
  }

  return (
    <svg className={`paper-clip ${className}`} viewBox="0 0 54 164" aria-hidden="true">
      <path d="M35 151c-16.5.4-25.5-11.7-23.8-29.4L19.1 28C20.7 11.2 29.8 3.2 40.8 5c9.7 1.6 14.8 11 13.1 27.1l-8.2 83.8c-1.1 11.7-5.8 17.8-12.8 17.1-6.8-.8-10-7-8.9-17.2l7.2-77" fill="none" stroke="currentColor" strokeWidth="3.7" strokeLinecap="round" />
      <path d="M31.2 39 24 116.8c-.9 9.2 2.1 15 8.9 16.2" fill="none" stroke="currentColor" strokeWidth="1.35" opacity=".62" />
      <path d="M39.8 7.2c5.8.5 9.4 4.8 10.5 11.5" fill="none" stroke="#fff" strokeWidth=".8" opacity=".52" />
    </svg>
  );
}
