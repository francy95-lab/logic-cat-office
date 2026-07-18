import { useEffect, useMemo, useState } from 'react';
import {
  advanceOfficeStatus,
  createRandomOfficeStatus,
  getMetricState,
  officeStatusData,
} from '../data/officeStatusData';
import './OfficeStatus.css';

const metricOrder = ['coffee', 'fish', 'mood', 'cases'];

function MetricIcon({ metric }) {
  return (
    <figure className="office-status__figure" aria-hidden="true">
      <span className="office-status__registration">OBS. / {metric.level}</span>
      <img src={metric.icon} alt="" />
      <span className="office-status__axis office-status__axis--x" />
      <span className="office-status__axis office-status__axis--y" />
    </figure>
  );
}

function OfficeStatusCard({ index, type, snapshot }) {
  if (type === 'mood') {
    const mood = officeStatusData.moods[snapshot.moodIndex];

    return (
      <article className="office-status__card office-status__card--mood">
        <header className="office-status__card-head">
          <span>0{index + 1}</span>
          <span className="office-status__live">LIVE</span>
        </header>
        <p className="office-status__label">EMPLOYEE MOOD</p>
        <div className="office-status__mood-field">
          <span>COLLECTIVE STATE</span>
          <strong key={mood.label}>{mood.label}</strong>
          <div className="office-status__mood-meta">
            <div><span>MENTAL WEATHER</span><b>{mood.mentalWeather}</b></div>
            <div><span>AFFECTED STAFF</span><b>{mood.affectedStaff}</b></div>
            <div><span>CONFIDENCE</span><b>{mood.confidence}</b></div>
          </div>
          <i>BEHAVIOUR UNDER REVIEW</i>
        </div>
        <div className="office-status__verdict">
          <span>STATUS / MONITORED:</span>
          <b>{mood.verdict}</b>
        </div>
      </article>
    );
  }

  const metric = getMetricState(type, snapshot[type]);

  return (
    <article className={`office-status__card${metric.extreme ? ' office-status__card--extreme' : ''}`}>
      <header className="office-status__card-head">
        <span>0{index + 1}</span>
        <span className="office-status__live">LIVE</span>
      </header>
      <p className="office-status__label">{metric.label}</p>
      <MetricIcon metric={metric} />
      <div className="office-status__reading">
        <strong key={metric.value}>{metric.value}</strong>
        <span>{metric.unit}</span>
      </div>
      <div className="office-status__verdict">
        <span>STATUS / {metric.level}:</span>
        <b>{metric.status}</b>
      </div>
    </article>
  );
}

export default function OfficeStatus() {
  const [snapshot, setSnapshot] = useState(createRandomOfficeStatus);
  const stationCode = useMemo(() => `LC-${String(Math.floor(Math.random() * 900) + 100)}`, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSnapshot((current) => advanceOfficeStatus(current));
    }, officeStatusData.refreshInterval);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="office-status" className="status-section section-light office-status" aria-labelledby="office-status-title">
      <div className="shell status-head office-status__head">
        <p className="eyebrow" id="office-status-title">CURRENT OFFICE STATUS / 彩蛋</p>
        <span>LIVE DATA, PROBABLY UNRELIABLE</span>
      </div>
      <div className="shell office-status__terminal">
        <div className="office-status__terminal-head">
          <span>INTERNAL OBSERVATION TERMINAL</span>
          <span>STATION {stationCode}</span>
          <span>AUTO REFRESH / 06.5 SEC</span>
        </div>
        <div className="office-status__grid">
          {metricOrder.map((type, index) => (
            <OfficeStatusCard key={type} index={index} type={type} snapshot={snapshot} />
          ))}
        </div>
        <div className="office-status__terminal-foot">
          <span>RECORDED WITHOUT EMPLOYEE CONSENT</span>
          <span>SYSTEM NOTE / VALUES MAY BE PERSONALLY OFFENDED</span>
        </div>
      </div>
    </section>
  );
}
