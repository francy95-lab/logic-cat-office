import ArchiveHeader from '../components/ArchiveHeader';
import ArchiveFooter from '../components/ArchiveFooter';
import PortraitCard from '../components/PortraitCard';
import ArchiveSeal from '../components/ArchiveSeal';
import ArchivistSignature from '../components/ArchivistSignature';
import AutoFitText from '../components/AutoFitText';

export default function Page04ArchivistNote({ employee, portraitUrl }) {
  return (
    <article className="archive-page page-04" data-page="4">
      <ArchiveHeader page={4} />
      <PortraitCard src={portraitUrl} alt={`${employee.nameZh}小画像卡`} variant="page04" />
      <div className="page04-title page-section-heading"><h2>ARCHIVIST NOTE</h2><p>档案管理员备注</p></div>
      <section className="note-paper">
        <div className="binder-holes" aria-hidden="true">{Array.from({ length: 13 }, (_, index) => <i key={index} />)}</div>
        <AutoFitText className="note-copy" contentKey={employee.archivistNote.join('\n')} maxFontSize={34} minFontSize={21} maxLineHeight={1.6} minLineHeight={1.28}>
          {employee.archivistNote.map((line, index) => line ? <p key={`${line}-${index}`}>{line}</p> : <span className="note-gap" key={index} />)}
        </AutoFitText>
        <ArchivistSignature />
      </section>
      <ArchiveSeal employeeNo={employee.employeeNo} year={employee.sealYear} variant="page04-reference" />
      <ArchiveFooter employeeNo={employee.employeeNo} />
    </article>
  );
}
