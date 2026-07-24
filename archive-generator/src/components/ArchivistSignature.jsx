import signatureUrl from '../assets/signatures/l-signature-transparent.png';

export default function ArchivistSignature() {
  return (
    <figure className="archivist-signature">
      <span className="archivist-signature__marks" aria-hidden="true">--</span>
      <img src={signatureUrl} alt="档案管理员 L 的真实手写签名" />
    </figure>
  );
}
