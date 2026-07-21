import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import OfficeStatus from './components/OfficeStatus';
import SiteHeader from './components/SiteHeader';
import ArchivePage from './pages/ArchivePage';
import EmployeeArchiveFilePage from './pages/EmployeeArchiveFilePage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import './styles.css';

const archiveCards = [
  { id: 'UC-0021', name: '黑三角', en: 'BLACK TRIANGLE', dept: '夜间巡逻部', status: '在岗', note: '擅长在凌晨三点制造无法解释的声响。', mood: 'HIGHLY SUSPICIOUS', image: '/assets/employee-archive.jpg' },
  { id: 'UC-0014', name: '贴贴', en: 'TIETIE', dept: '异常观察部', status: '近距离观察员', note: '擅长近距离确认所有事情，但经常忘记保持距离。', mood: 'OVER OBSERVING', image: '/assets/贴贴.jpg' },
  { id: 'UC-0008', name: '垂手同事', en: 'LONG-ARM COLLEAGUE', dept: '垂直待机部', status: '垂手', note: '长期保持原地待机，双手总比本人更早抵达地面。', mood: 'STANDING BY', image: '/assets/长条同事.jpg' },
];

const caseFile = {
  number: '014',
  id: 'UC-0004',
  name: '空空',
  position: '空气主管',
  title: ['凌晨03:17，', '员工开始攻击空气。'],
  charge: '对空气持续发起无效攻击',
  evidence: '地板震动、尾巴膨胀、无受害者',
  result: '空气已认输',
  image: '/assets/空气主管.jpg',
};

const randomEmployees = [
  { id: 'UC-042', name: '塑料袋审计员', dept: '异常口感部', mood: '稳定但可疑', salary: '2 根猫条 / 日', skill: '持续检查所有塑料包装' },
  { id: 'UC-117', name: '窗边观察员', dept: '邻里监控部', mood: '高度警觉', salary: '1 个纸箱 / 周', skill: '对窗外每一片树叶建立档案' },
  { id: 'UC-303', name: '会议缺席代表', dept: '战略消失部', mood: '正在加载', salary: '按出席次数结算', skill: '准时错过所有重要会议' },
  { id: 'UC-0008', name: '长条同事', dept: '水平移动部', mood: '彻底趴平', salary: '一块温暖地板', skill: '把任何空间变成休息区' },
  { id: 'UC-056', name: '纸箱结构顾问', dept: '空间利用部', mood: '准备入住', salary: '1 个加厚纸箱 / 月', skill: '评估所有纸箱的居住价值' },
  { id: 'UC-073', name: '清晨叫醒专员', dept: '非必要提醒部', mood: '过度积极', salary: '3 块冻干 / 次', skill: '在 05:12 准时启动全屋提醒' },
  { id: 'UC-091', name: '键盘占用工程师', dept: '输入干扰部', mood: '正在踩键', salary: '每小时 1 次摸头', skill: '在最关键时刻覆盖全部快捷键' },
  { id: 'UC-126', name: '水杯风险管理员', dept: '桌面安全部', mood: '边缘试探', salary: '1 小碟温水 / 日', skill: '将所有水杯推向风险临界点' },
  { id: 'UC-138', name: '快递盒验收官', dept: '包装审查部', mood: '立即入住', salary: '纸箱永久使用权', skill: '对每个新包裹实施内部验收' },
  { id: 'UC-154', name: '门缝观察员', dept: '边界情报部', mood: '单眼在线', salary: '半扇开着的门', skill: '从三厘米门缝获取完整情报' },
  { id: 'UC-169', name: '夜间跑酷教练', dept: '室内运动部', mood: '能量过剩', salary: '凌晨自由活动权', skill: '规划家具之间的高速移动路线' },
  { id: 'UC-184', name: '阳光测量师', dept: '光照管理部', mood: '缓慢融化', salary: '每日 4 小时窗台', skill: '用身体丈量光斑移动轨迹' },
  { id: 'UC-205', name: '文件压平专员', dept: '纸面管理部', mood: '坚决坐下', salary: '1 叠待签文件', skill: '在每份重要材料上留下体温' },
  { id: 'UC-219', name: '冰箱门监听员', dept: '食物情报部', mood: '高度期待', salary: '未知零食分成', skill: '识别冰箱开启前的细微声响' },
  { id: 'UC-237', name: '洗衣篮驻场代表', dept: '纺织休息部', mood: '拒绝撤离', salary: '1 篮干净衣物', skill: '在衣服折叠前完成全面占领' },
  { id: 'UC-248', name: '鱼缸外交官', dept: '跨物种事务部', mood: '保持凝视', salary: '每周 1 次水族会议', skill: '与鱼类进行长期单方面谈判' },
  { id: 'UC-264', name: '扫地机器人监工', dept: '自动化监察部', mood: '跟随检查', salary: '优先乘车权', skill: '全程监督地面清洁路线' },
  { id: 'UC-276', name: '土壤质检员', dept: '室内园艺部', mood: '爪部取样', salary: '1 盆安全猫草', skill: '对所有花盆进行非授权抽检' },
  { id: 'UC-289', name: '浴室回声测试员', dept: '声学研究部', mood: '独自演唱', salary: '浴室独占 10 分钟', skill: '在瓷砖空间测试声音回弹' },
  { id: 'UC-312', name: '被子隧道勘探员', dept: '软体建筑部', mood: '深度潜伏', salary: '1 床未整理被子', skill: '建立床品内部秘密通道' },
  { id: 'UC-327', name: '窗帘摆动分析师', dept: '微风研究部', mood: '持续追踪', salary: '永久靠窗座位', skill: '判断窗帘后是否存在未知目标' },
  { id: 'UC-341', name: '食盆空缺申诉员', dept: '餐饮监督部', mood: '明显不满', salary: '随时补充服务', skill: '将半空食盆判定为严重短缺' },
  { id: 'UC-358', name: '鞋盒档案管理员', dept: '玄关资料部', mood: '尺寸不符但满意', salary: '1 只限量鞋盒', skill: '把最小容器登记为最佳工位' },
  { id: 'UC-372', name: '会议桌沉默顾问', dept: '决策旁听部', mood: '不发表意见', salary: '会议桌中央席位', skill: '通过闭眼推动所有议题结束' },
  { id: 'UC-389', name: '纸团回收运动员', dept: '循环娱乐部', mood: '等待投掷', salary: '无限量废纸团', skill: '将报废文件转化为竞技项目' },
  { id: 'UC-404', name: '信号失踪专员', dept: '网络异常部', mood: '暂时不可见', salary: '路由器旁保留席', skill: '在需要回应时立即离线' },
  { id: 'UC-421', name: '沙发缝调查员', dept: '遗失物侦查部', mood: '发现可疑碎屑', salary: '所有找到的零食', skill: '深入沙发缝寻找历史证物' },
  { id: 'UC-447', name: '半夜歌唱家', dept: '非正式声乐部', mood: '情绪饱满', salary: '1 次全屋回声 / 夜', skill: '在所有人入睡后开始独唱' },
  { id: 'UC-471', name: '外卖袋安检员', dept: '入境检查部', mood: '嗅觉全开', salary: '安检后袋子归属权', skill: '检查每份外卖携带的气味信息' },
  { id: 'UC-499', name: '午睡排期主管', dept: '时间资源部', mood: '日程已满', salary: '每日 18 小时带薪睡眠', skill: '协调全天所有休息时段' },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [archiveIndex, setArchiveIndex] = useState(0);
  const [isMobileHero, setIsMobileHero] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  const [time, setTime] = useState('');
  const [employeeIndex, setEmployeeIndex] = useState(0);
  const year = useMemo(() => new Date().getFullYear(), []);
  const randomEmployee = randomEmployees[employeeIndex];

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).format(new Date()));
    update();
    const timer = setInterval(update, 1000);
    setEmployeeIndex(Math.floor(Math.random() * randomEmployees.length));
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const mobileHeroQuery = window.matchMedia('(max-width: 768px)');
    const updateHeroMedia = () => setIsMobileHero(mobileHeroQuery.matches);
    updateHeroMedia();
    if (mobileHeroQuery.addEventListener) mobileHeroQuery.addEventListener('change', updateHeroMedia);
    else mobileHeroQuery.addListener(updateHeroMedia);
    return () => {
      if (mobileHeroQuery.removeEventListener) mobileHeroQuery.removeEventListener('change', updateHeroMedia);
      else mobileHeroQuery.removeListener(updateHeroMedia);
    };
  }, []);

  const shuffleEmployee = () => {
    setEmployeeIndex((current) => (current + 1 + Math.floor(Math.random() * (randomEmployees.length - 1))) % randomEmployees.length);
  };

  const changeArchive = (direction) => {
    setArchiveIndex((current) => (current + direction + archiveCards.length) % archiveCards.length);
  };

  return (
    <main>
      <SiteHeader />

      <section id="home" className="hero section-dark">
        {isMobileHero ? (
          <img className="hero-mobile-art" src="/assets/hero-cat.jpg" alt="" aria-hidden="true" />
        ) : (
          <video className="hero-video" autoPlay muted loop playsInline poster="/assets/hero-cat.jpg">
            <source src="/assets/hero-loop.mp4" type="video/mp4" />
          </video>
        )}
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
          <div className="archive-image-wrap">
            <div className="archive-image-stack">
              {archiveCards.map((card, index) => (
                <img
                  className={`archive-image${index === archiveIndex ? ' is-active' : ''}`}
                  src={card.image}
                  alt={index === archiveIndex ? `${card.name} / ${card.en} 员工档案` : ''}
                  aria-hidden={index !== archiveIndex}
                  key={card.id}
                />
              ))}
              <button className="archive-switch archive-switch-prev" type="button" onClick={() => changeArchive(-1)} aria-label="查看上一位员工档案"><span aria-hidden="true">←</span></button>
              <button className="archive-switch archive-switch-next" type="button" onClick={() => changeArchive(1)} aria-label="查看下一位员工档案"><span aria-hidden="true">→</span></button>
            </div>
            <span className="image-stamp">ORIGINAL RECORD / 03</span>
          </div>
          <div className="archive-list">
            {archiveCards.map((card, index) => (
              <article className={`archive-card${index === archiveIndex ? ' is-active' : ''}`} aria-current={index === archiveIndex ? 'true' : undefined} key={card.id}>
                <div className="archive-card-index">0{index + 1}</div>
                <div>
                  <div className="archive-card-head"><div className="archive-card-title"><h3>{card.name}</h3><small>{card.en}</small></div><span>{card.status}</span></div>
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
          <div className="section-heading"><p className="eyebrow">今日案件 / CASE NO. {caseFile.number}</p><h2>{caseFile.title[0]}<br />{caseFile.title[1]}</h2></div>
        </div>
        <div className="shell case-board">
          <div className="case-image"><img src={caseFile.image} alt={`今日案件${caseFile.position}${caseFile.name}猫咪线稿`} /></div>
          <div className="case-report">
            <div className="report-line"><span>SUBJECT</span><b>{caseFile.id} / {caseFile.name}</b></div>
            <div className="report-line"><span>CHARGE</span><b>{caseFile.charge}</b></div>
            <div className="report-line"><span>EVIDENCE</span><b>{caseFile.evidence}</b></div>
            <div className="report-line"><span>RESULT</span><b>{caseFile.result}</b></div>
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

      <OfficeStatus />

      <section id="enter" className="enter-section section-dark">
        <div className="enter-grain"></div>
        <div className="shell enter-content"><p>THE ARCHIVE IS OPEN</p><h2>ENTER<br/><span>THE ARCHIVES</span></h2><button onClick={() => window.location.assign('/archive')}>进入员工档案室 ↗</button></div>
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

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const employeeFileMatch = currentPath.match(/^\/archive\/([^/]+)\/file$/);
const employeeDetailMatch = currentPath.match(/^\/archive\/([^/]+)$/);
const currentPage = currentPath === '/archive'
  ? <ArchivePage />
  : employeeFileMatch
    ? <EmployeeArchiveFilePage slug={employeeFileMatch[1]} />
  : employeeDetailMatch
    ? <EmployeeDetailPage slug={employeeDetailMatch[1]} />
    : <App />;

createRoot(document.getElementById('root')).render(currentPage);
