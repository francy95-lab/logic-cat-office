import ArchivePageNumber from './ArchivePageNumber';

export default function ArchiveHeader({ page }) {
  return (
    <header className="archive-header">
      <p className="archive-office">LOGIC CAT OFFICE</p>
      <h1>EMPLOYEE ARCHIVE</h1>
      <p className="archive-subtitle">逻辑猫事务所 · 员工档案</p>
      <ArchivePageNumber page={page} />
    </header>
  );
}
