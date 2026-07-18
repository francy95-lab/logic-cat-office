import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = [
  { label: '档案', en: 'ARCHIVE', target: 'archive' },
  { label: '展览', en: 'EXHIBITION', target: 'featured' },
  { label: '案件', en: 'CASES', target: 'case' },
  { label: '保管员', en: 'KEEPER', target: 'archivist' },
];

const archiveCards = [
  { id: 'UC-021', name: '黑三角', en: 'BLACK TRIANGLE', dept: '夜间巡逻部', status: '在岗', note: '擅长在凌晨三点制造无法解释的声响。', mood: 'HIGHLY SUSPICIOUS' },
  { id: 'UC-014', name: '空气主管', en: 'AIR DIRECTOR', dept: '战略发呆部', status: '远程', note: '会议参与度极低，但从不缺席合影。', mood: 'OFFLINE' },
  { id: 'UC-008', name: '长条同事', en: 'LONG COLLEAGUE', dept: '水平移动部', status: '趴平', note: '以最低能耗完成全天候地面覆盖。', mood: 'ENERGY SAVING' },
];

const randomEmployees = [
  { id: 'UC-042', name: '塑料袋审计员', dept: '异常口感部', mood: '稳定但可疑', salary: '2 根猫条 / 日', skill: '持续检查所有塑料包装' },
  { id: 'UC-117', name: '窗边观察员', dept: '邻里监控部', mood: '高度警觉', salary: '1 个纸箱 / 周', skill: '对窗外每一片树叶建立档案' },
  { id: 'UC-303', name: '会议缺席代表', dept: '战略消失部', mood: '正在加载', salary: '按出席次数结算', skill: '准时错过所有重要会议' },
  { id: 'UC-008', name: '长条同事', dept: '水平移动部', mood: '彻底趴平', salary: '一块温暖地板', skill: '把任何空间变成休息区' },
];

const officeMoods = ['STABLE', 'CHAOTIC', 'FISH EMERGENCY', 'LOW BATTERY'];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState('');
  const [employeeIndex, setEmployeeIndex] = useState(0);
  const [officeMood, setOfficeMood] = useState('STABLE');
  const [fish, setFish] = useState(12);
  const year = useMemo(() => new Date().getFullYear(), []);
  const randomEmployee = randomEmployees[employeeIndex];

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).format(new Date()));
    update();
    const timer = setInterval(update, 1000);
    setEmployeeIndex(Math.floor(Math.random() * randomEmployees.length));
    setOfficeMood(officeMoods[Math.floor(Math.random() * officeMoods.length)]);
    setFish(8 + Math.floor(Math.random() * 21));
    return () => clearInterval(timer);
  }, []);

  const shuffleEmployee = () => {
    setEmployeeIndex((current) => (current + 1 + Math.floor(Math.random() * (randomEmployees.length - 1))) % randomEmployees.length);
  };

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => scrollToSection('home')} aria-label="返回首页">
          <span className="brand-mark">LC</span>
          <span className="brand-copy"><b>逻辑猫事务所</b><small>LOGIC CAT OFFICE</small></span>
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="主导航">
          {navItems.map((item) => (
            <button key={item.target} onClick={() => { scrollToSection(item.target); setMenuOpen(false); }}>
              <span>{item.en}</span><small>{item.label}</small>
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="language-switch" title="多语言功能预留">中 / EN / 日</button>
          <a className="contact-chip" href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer">联系 L ↗</a>
        </div>

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
        <div className="hero-scan"></div>

        <div className="hero-topline shell">
          <span>ARCHIVE NO. 000 / OPEN TO THE PUBLIC</span>
          <span>HANGZHOU / {time}</span>
        </div>

        <div className="hero-content shell">
          <div className="hero-kicker">EVERY UGLY CAT DESERVES A FILE.</div>
          <h1>
            <span>逻辑猫</span>
            <span className="outline">事务所</span>
          </h1>
          <div className="hero-footer-row">
            <div>
              <p>每一只丑猫，都值得拥有一份档案。</p>
              <small>An unofficial agency documenting ugly cats, awkward expressions and beautifully inappropriate poses.</small>
            </div>
            <button className="round-arrow" onClick={() => scrollToSection('about')} aria-label="继续浏览">↓</button>
          </div>
        </div>
      </section>

      <section id="about" className="about-section section-light">
        <div className="shell section-grid">
          <div className="section-label"><span>01</span><p>WHAT WE DO</p></div>
          <div className="section-heading"><p className="eyebrow">事务所说明 / OFFICE MANIFESTO</p><h2>记录丑丑的猫。<br />不是为了纠正它们，<br />只是为了留下证据。</h2></div>
        </div>
        <div className="shell manifesto-grid">
          {[['01','丑丑的猫','UGLY CATS','/assets/丑丑的猫.jpg'],['02','失控的表情','QUESTIONABLE EXPRESSIONS','/assets/失控的表情.jpg'],['03','不合时宜的姿势','INAPPROPRIATE POSES','/assets/不合时宜的姿势.jpg']].map(([n,zh,en,image]) => (
            <article key={n}><span>{n}</span><div className="manifesto-image"><img src={image} alt={zh} /></div><h3>{zh}</h3><p>{en}</p></article>
          ))}
        </div>
      </section>

      <section id="archive" className="archive-section section-light">
        <div className="shell section-grid">
          <div className="section-label"><span>02</span><p>EMPLOYEE ARCHIVE</p></div>
          <div className="section-heading"><p className="eyebrow">员工档案室 / RESTRICTED FILES</p><h2>这里不展示作品。<br />这里只保存员工证据。</h2></div>
        </div>
        <div className="shell archive-stage">
          <div className="archive-image-wrap"><img src="/assets/employee-archive.jpg" alt="黑色丑猫员工档案" /><span className="image-stamp">ORIGINAL RECORD / 03</span></div>
          <div className="archive-list">
            {archiveCards.map((card, index) => (
              <article className="archive-card" key={card.id}>
                <div className="archive-card-index">0{index + 1}</div>
                <div>
                  <div className="archive-card-head"><div><h3>{card.name}</h3><small>{card.en}</small></div><span>{card.status}</span></div>
                  <dl><div><dt>编号</dt><dd>{card.id}</dd></div><div><dt>部门</dt><dd>{card.dept}</dd></div><div><dt>状态</dt><dd>{card.mood}</dd></div><div><dt>评级</dt><dd>★★★★☆</dd></div></dl>
                  <p>{card.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="featured-section section-dark">
        <div className="shell section-grid inverse">
          <div className="section-label"><span>03</span><p>STAR EMPLOYEES</p></div>
          <div className="section-heading"><p className="eyebrow">明星员工展览板 / THIS MONTH</p><h2>表现并不优秀，<br />但镜头感十分稳定。</h2></div>
        </div>
        <div className="shell feature-card">
          <div className="feature-image"><img src="/assets/star-employees.jpg" alt="两只猫及其丑猫画像" /></div>
          <div className="feature-copy">
            <div className="feature-meta"><span>EXHIBIT 002</span><span>DUO PORTRAIT</span></div>
            <div><p className="eyebrow">SELECTED PROJECT</p><h3>双人入职照</h3><p className="feature-description">根据宠物实照提取最有记忆点的表情，再由 L 用极少线条留下“像，但绝不正常”的正式档案。</p></div>
            <div className="feature-tags"><span>实照定制</span><span>L 亲绘原稿</span><span>非标准肖像</span></div>
          </div>
        </div>
      </section>

      <section id="case" className="case-section section-light">
        <div className="shell section-grid">
          <div className="section-label"><span>04</span><p>TODAY'S CASE</p></div>
          <div className="section-heading"><p className="eyebrow">今日案件 / CASE NO. 014</p><h2>凌晨 03:17，<br />员工开始攻击空气。</h2></div>
        </div>
        <div className="shell case-board">
          <div className="case-image"><img src="/assets/空气主管.jpg" alt="今日案件空气主管猫咪线稿" /></div>
          <div className="case-report">
            <div className="report-line"><span>SUBJECT</span><b>UC-014 / 空气主管</b></div>
            <div className="report-line"><span>CHARGE</span><b>对空气持续发起无效攻击</b></div>
            <div className="report-line"><span>EVIDENCE</span><b>地板震动、尾巴膨胀、无受害者</b></div>
            <div className="report-line"><span>RESULT</span><b>空气已认输</b></div>
            <div className="case-status">STATUS / STILL UNDER INVESTIGATION</div>
          </div>
        </div>
      </section>

      <section id="random" className="random-section section-dark">
        <div className="shell random-layout">
          <div className="random-intro"><p className="eyebrow">RANDOM EMPLOYEE / LIVE ARCHIVE</p><h2>今日值班员工</h2><p>每次刷新或点击按钮，事务所都会随机推送一位状态不明的员工。</p><button onClick={shuffleEmployee}>重新抽取员工 ↻</button></div>
          <article className="random-card">
            <div className="random-card-top"><span>{randomEmployee.id}</span><span>OFFICIAL FILE</span></div>
            <h3>{randomEmployee.name}</h3>
            <dl><div><dt>所属部门</dt><dd>{randomEmployee.dept}</dd></div><div><dt>当前情绪</dt><dd>{randomEmployee.mood}</dd></div><div><dt>薪资待遇</dt><dd>{randomEmployee.salary}</dd></div><div><dt>核心技能</dt><dd>{randomEmployee.skill}</dd></div></dl>
            <div className="official-stamp">APPROVED<br/>LOGIC CAT OFFICE</div>
          </article>
        </div>
      </section>

      <section className="status-section section-light">
        <div className="shell status-head"><p className="eyebrow">CURRENT OFFICE STATUS / 彩蛋</p><span>LIVE DATA, PROBABLY UNRELIABLE</span></div>
        <div className="shell status-grid">
          <div><span>COFFEE LEVEL</span><b>98%</b></div><div><span>FISH INVENTORY</span><b>{fish}</b></div><div><span>EMPLOYEE MOOD</span><b>{officeMood}</b></div><div><span>OPEN CASES</span><b>27</b></div>
        </div>
      </section>

      <section id="enter" className="enter-section section-dark">
        <div className="enter-grain"></div>
        <div className="shell enter-content"><p>THE ARCHIVE IS OPEN</p><h2>ENTER<br/><span>THE ARCHIVES</span></h2><button onClick={() => scrollToSection('archive')}>进入员工档案室 ↗</button></div>
      </section>

      <section id="archivist" className="archivist-section section-light">
        <div className="archivist-photo"><img src="/assets/archivist-l.jpg" alt="档案保管员 L 展示手绘速写本" /></div>
        <div className="archivist-panel">
          <div className="archivist-number">07 / CHIEF ARCHIVIST</div>
          <div className="archivist-main"><p className="eyebrow">档案保管员 · L</p><h2>真正赋予员工身份的人。</h2><p className="archivist-intro">AI 只负责入职流程与趣味评估。每一份最终档案，仍由 L 亲手观察、亲手绘制并亲自签发。</p><p className="archivist-intro">有人想让自己的猫、狗或其他宠物入职事务所，可以提交真实照片，由 L 为它录入一份独一无二的正式档案。</p></div>
          <div className="contact-block"><span>OPEN RECRUITMENT / 档案申请入口</span><a href="https://www.xiaohongshu.com" target="_blank" rel="noreferrer">小红书号：LinnnnnLiu <b>↗</b></a></div>
          <footer><span>© {year} LOGIC CAT OFFICE</span><span>ALL EMPLOYEES ARE QUESTIONABLE.</span></footer>
        </div>
      </section>

      <section className="end-section section-dark">
        <div className="shell end-inner"><p>END OF FILE.</p><h2>仍有 8,923 只猫<br/>等待建档。</h2><div><span>THUNDERUGLYCAT.COM</span><span>HANGZHOU / WORLDWIDE</span></div></div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
