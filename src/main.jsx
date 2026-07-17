import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  { label: '首页', target: 'home' },
  { label: '员工档案室', target: 'archive' },
  { label: '明星员工', target: 'featured' },
  { label: '档案保管员', target: 'archivist' },
];

const archiveCards = [
  { id: 'UC-021', name: '黑三角', dept: '夜间巡逻部', status: '在岗', note: '擅长在凌晨三点制造无法解释的声响。' },
  { id: 'UC-014', name: '空气主管', dept: '战略发呆部', status: '远程', note: '会议参与度极低，但从不缺席合影。' },
  { id: 'UC-008', name: '长条同事', dept: '水平移动部', status: '趴平', note: '以最低能耗完成全天候地面覆盖。' },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState('');
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).format(new Date()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => scrollToSection('home')} aria-label="返回首页">
          <span className="brand-mark">LC</span>
          <span className="brand-text">逻辑猫事务所</span>
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="主导航">
          {navItems.map((item) => (
            <button key={item.target} onClick={() => { scrollToSection(item.target); setMenuOpen(false); }}>
              {item.label}
            </button>
          ))}
        </nav>

        <a className="contact-chip" href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer">
          联系 L <span aria-hidden="true">↗</span>
        </a>

        <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="切换菜单">
          <span></span><span></span>
        </button>
      </header>

      <section id="home" className="hero section-dark">
        <video className="hero-video" autoPlay muted loop playsInline poster="/assets/hero-cat.jpg">
          <source src="/assets/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-grain"></div>

        <div className="hero-topline shell">
          <span>EST. IN AN UNCERTAIN YEAR</span>
          <span>HANGZHOU / {time}</span>
        </div>

        <div className="hero-content shell">
          <div className="hero-kicker">ARCHIVE NO. 000 — OPEN TO THE PUBLIC</div>
          <h1>
            <span>逻辑猫</span>
            <span className="outline">事务所</span>
          </h1>
          <div className="hero-footer-row">
            <p>一家负责记录怪猫生活、失控表情与不合时宜姿势的非正式机构。</p>
            <button className="round-arrow" onClick={() => scrollToSection('archive')} aria-label="查看员工档案">↓</button>
          </div>
        </div>
      </section>

      <section id="archive" className="archive-section section-light">
        <div className="shell section-grid">
          <div className="section-label">
            <span>01</span>
            <p>EMPLOYEE ARCHIVE</p>
          </div>
          <div className="section-heading">
            <p className="eyebrow">员工档案室 / RESTRICTED FILES</p>
            <h2>这里不展示作品。<br />这里只保存员工证据。</h2>
          </div>
        </div>

        <div className="shell archive-stage">
          <div className="archive-image-wrap">
            <img src="/assets/employee-archive.jpg" alt="黑色怪猫员工档案" />
            <span className="image-stamp">ORIGINAL RECORD / 03</span>
          </div>

          <div className="archive-list">
            {archiveCards.map((card, index) => (
              <article className="archive-card" key={card.id}>
                <div className="archive-card-index">0{index + 1}</div>
                <div>
                  <div className="archive-card-head">
                    <h3>{card.name}</h3>
                    <span>{card.status}</span>
                  </div>
                  <dl>
                    <div><dt>编号</dt><dd>{card.id}</dd></div>
                    <div><dt>部门</dt><dd>{card.dept}</dd></div>
                  </dl>
                  <p>{card.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="featured-section section-dark">
        <div className="shell section-grid inverse">
          <div className="section-label">
            <span>02</span>
            <p>STAR EMPLOYEES</p>
          </div>
          <div className="section-heading">
            <p className="eyebrow">明星员工展览板 / THIS MONTH</p>
            <h2>表现并不优秀，<br />但镜头感十分稳定。</h2>
          </div>
        </div>

        <div className="shell feature-card">
          <div className="feature-image">
            <img src="/assets/star-employees.jpg" alt="两只猫及其怪猫画像" />
          </div>
          <div className="feature-copy">
            <div className="feature-meta"><span>EXHIBIT 002</span><span>DUO PORTRAIT</span></div>
            <div>
              <p className="eyebrow">SELECTED PROJECT</p>
              <h3>双人入职照</h3>
              <p className="feature-description">根据宠物实照建立人物关系、提取最有记忆点的表情，并以极少的线条留下“像，但绝不正常”的正式档案。</p>
            </div>
            <div className="feature-tags"><span>实照定制</span><span>手绘原稿</span><span>非标准肖像</span></div>
          </div>
        </div>
      </section>

      <section id="archivist" className="archivist-section section-light">
        <div className="archivist-photo">
          <img src="/assets/archivist-l.jpg" alt="档案保管员 L 展示手绘速写本" />
        </div>
        <div className="archivist-panel">
          <div className="archivist-number">03 / ARCHIVIST</div>
          <div className="archivist-main">
            <p className="eyebrow">档案保管员 · L</p>
            <h2>负责记录<br />怪猫生活的人。</h2>
            <p className="archivist-intro">L 将日常里那些不够标准、无法复制、甚至有点荒唐的宠物瞬间，整理成一份独一无二的入职档案。</p>
            <p className="archivist-intro">有人想让自己的猫、狗或其他宠物入职事务所，L 会根据真实照片，为它录入一份专属丑猫／丑狗画像。</p>
          </div>
          <div className="contact-block">
            <span>档案申请入口</span>
            <a href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer">
              小红书号：LinnnnnLiu <b>↗</b>
            </a>
          </div>
          <footer>
            <span>© {year} LOGIC CAT OFFICE</span>
            <span>ALL EMPLOYEES ARE QUESTIONABLE.</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
