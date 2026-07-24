export default function ActiveStamp({ text = 'ACTIVE' }) {
  return (
    <span className="active-stamp" aria-label={text}>
      <svg viewBox="0 0 132 56" aria-hidden="true">
        <defs>
          <filter id="activeStampEdge" x="-8%" y="-12%" width="116%" height="124%">
            <feTurbulence type="fractalNoise" baseFrequency=".025 .18" numOctaves="2" seed="11" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale=".55" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <mask id="activeStampInk">
            <rect width="132" height="56" fill="#fff" />
            <g fill="#000" opacity=".36">
              <circle cx="15" cy="13" r=".7" />
              <circle cx="29" cy="43" r=".55" />
              <circle cx="47" cy="17" r=".65" />
              <circle cx="65" cy="38" r=".55" />
              <circle cx="82" cy="12" r=".5" />
              <circle cx="101" cy="34" r=".75" />
              <circle cx="118" cy="20" r=".55" />
              <path d="M7 29h7v.7H7zm108 13h9v.65h-9zM54 6h5v.55h-5z" />
            </g>
          </mask>
        </defs>
        <g filter="url(#activeStampEdge)" mask="url(#activeStampInk)">
          <path className="active-stamp__border" d="M4.2 5.7 126.4 3.2 128.1 49.4 5.7 52.1Z" />
          <text className="active-stamp__text" x="66" y="37" textAnchor="middle">{text}</text>
        </g>
      </svg>
    </span>
  );
}
