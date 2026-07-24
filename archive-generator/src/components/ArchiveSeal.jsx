export default function ArchiveSeal({ employeeNo, year, variant = 'default' }) {
  const idSuffix = employeeNo.replace(/[^a-zA-Z0-9]/g, '');
  const roughFilterId = `sealRough-${idSuffix}`;
  const inkMaskId = `sealInk-${idSuffix}`;

  return (
    <svg className={`archive-seal archive-seal--${variant}`} viewBox="0 0 320 320" aria-label={`档案认证章 ${employeeNo} ${year}`}>
      <defs>
        <path id="sealTop" d="M54 172a108 108 0 0 1 212 0" />
        <path id="sealBottom" d="M266 178a108 108 0 0 1-212 0" />
        <filter id={roughFilterId} x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency=".02 .11" numOctaves="2" seed="17" result="sealNoise" />
          <feDisplacementMap in="SourceGraphic" in2="sealNoise" scale=".42" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <mask id={inkMaskId} maskUnits="userSpaceOnUse">
          <rect width="320" height="320" fill="#fff" />
          <g fill="#000" opacity=".32">
            <circle cx="60" cy="102" r="1.1" />
            <circle cx="93" cy="52" r=".8" />
            <circle cx="154" cy="22" r=".9" />
            <circle cx="231" cy="62" r="1" />
            <circle cx="278" cy="131" r=".75" />
            <circle cx="287" cy="214" r="1.1" />
            <circle cx="231" cy="271" r=".8" />
            <circle cx="139" cy="294" r="1" />
            <circle cx="71" cy="256" r=".9" />
            <circle cx="32" cy="184" r=".7" />
            <path d="M42 151h13v1.1H42zm217 21h17v1H259zM112 39h9v.9h-9zm47 246h15v1h-15z" />
          </g>
        </mask>
      </defs>
      <g
        filter={variant === 'page04-reference' ? `url(#${roughFilterId})` : undefined}
        mask={variant === 'page04-reference' ? `url(#${inkMaskId})` : undefined}
      >
        <circle cx="160" cy="160" r="145" fill="rgba(247,244,237,.82)" stroke="currentColor" strokeWidth="5" />
        <circle cx="160" cy="160" r="136" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="14 4 3 4" />
        <circle cx="160" cy="160" r="104" fill="none" stroke="currentColor" strokeWidth="2" />
        <text className="seal-ring"><textPath href="#sealTop" startOffset="50%" textAnchor="middle">LOGIC CAT OFFICE</textPath></text>
        <text className="seal-ring"><textPath href="#sealBottom" startOffset="50%" textAnchor="middle">ARCHIVE VERIFIED</textPath></text>
        <polygon points="0,-12 3,-4 12,-4 5,2 8,11 0,6 -8,11 -5,2 -12,-4 -3,-4" transform="translate(34 173)" fill="currentColor" />
        <polygon points="0,-12 3,-4 12,-4 5,2 8,11 0,6 -8,11 -5,2 -12,-4 -3,-4" transform="translate(286 173)" fill="currentColor" />
        <path d="M126 123c3-24 18-37 34-37s31 13 34 37l12-9-5 25c-7 18-21 27-41 27s-34-9-41-27l-5-25 12 9Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M142 133h4m28 0h4m-18 11v7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <text x="160" y="211" textAnchor="middle" className="seal-number">{employeeNo}</text>
        <text x="160" y="244" textAnchor="middle" className="seal-year">{year}</text>
      </g>
    </svg>
  );
}
