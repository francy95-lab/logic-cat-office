export default function ArchiveSeal({ employeeNo, year }) {
  return (
    <svg className="archive-seal" viewBox="0 0 320 320" aria-label={`档案认证章 ${employeeNo} ${year}`}>
      <defs>
        <path id="sealTop" d="M54 172a108 108 0 0 1 212 0" />
        <path id="sealBottom" d="M266 178a108 108 0 0 1-212 0" />
      </defs>
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
    </svg>
  );
}
