import React, { useState } from 'react';

const navItems = [
  { label: '档案', en: 'ARCHIVE', target: 'archive', href: '/archive' },
  { label: '展览', en: 'EXHIBITION', target: 'featured' },
  { label: '案件', en: 'CASES', target: 'case' },
  { label: '保管员', en: 'KEEPER', target: 'archivist' },
];

function BrandContent() {
  return (
    <>
      <span className="brand-mark">LC</span>
      <span className="brand-copy"><b>逻辑猫事务所</b><small>LOGIC CAT OFFICE</small></span>
    </>
  );
}

export default function SiteHeader({ currentPath = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isArchivePage = currentPath === '/archive';

  const navigateToSection = (target) => {
    setMenuOpen(false);
    if (isArchivePage) {
      window.location.assign(`/#${target}`);
      return;
    }
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="site-header">
      {isArchivePage ? (
        <a className="brand" href="/" aria-label="返回首页"><BrandContent /></a>
      ) : (
        <button className="brand" onClick={() => navigateToSection('home')} aria-label="返回首页"><BrandContent /></button>
      )}

      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="主导航">
        {navItems.map((item) => (
          item.href ? (
            <a className={currentPath === item.href ? 'is-current' : undefined} href={item.href} aria-current={currentPath === item.href ? 'page' : undefined} key={item.target}>
              <span>{item.en}</span><small>{item.label}</small>
            </a>
          ) : (
            <button key={item.target} onClick={() => navigateToSection(item.target)}>
              <span>{item.en}</span><small>{item.label}</small>
            </button>
          )
        ))}
      </nav>

      <div className="header-actions">
        <button className="language-switch" title="多语言功能预留">中 / EN / 日</button>
        <a className="contact-chip" href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer">联系 L ↗</a>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="切换菜单" aria-expanded={menuOpen}>
        <span></span><span></span>
      </button>
    </header>
  );
}
