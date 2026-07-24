const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.75, strokeLinecap: 'round', strokeLinejoin: 'round' };

const page02ReferenceIcons = {
  observation: new URL('../../reference/page02_eye.png', import.meta.url).href,
  recovery: new URL('../../reference/page02_bed.png', import.meta.url).href,
  movement: new URL('../../reference/page02_move.png', import.meta.url).href,
  initiative: new URL('../../reference/page02_bag.png', import.meta.url).href,
  selectiveHearing: new URL('../../reference/page02_ear.png', import.meta.url).href,
};

export default function SkillIcon({ type, variant = 'default' }) {
  const iconAliases = {
    humanObservation: 'observation',
    presence: 'observation',
    officePresence: 'observation',
    support: 'recovery',
    emotionalSupport: 'recovery',
    selfEntertainment: 'movement',
  };
  const iconType = iconAliases[type] ?? type;
  if (variant === 'page02-reference' && page02ReferenceIcons[iconType]) {
    return <img className="skill-icon skill-icon--reference" src={page02ReferenceIcons[iconType]} alt="" aria-hidden="true" />;
  }

  const content = {
    observation: <><path {...common} d="M7 24c6-10 12-14 21-14s15 4 21 14c-6 10-12 14-21 14S13 34 7 24Z"/><circle {...common} cx="28" cy="24" r="7"/><circle cx="28" cy="24" r="3"/></>,
    recovery: <><path {...common} d="M7 34V19m0 10h42v8M12 29v-9h13c5 0 8 3 8 9"/><path {...common} d="M38 12h5l-5 6h6M29 7h5l-5 6h6"/></>,
    movement: <><circle {...common} cx="34" cy="10" r="4"/><path {...common} d="m28 18 8 4 7 9m-16-13-7 9-8 1m18 0-7 14m10-10-14 3-6 10M12 16h10M7 22h11"/></>,
    initiative: <><rect {...common} x="8" y="16" width="40" height="28" rx="2"/><path {...common} d="M20 16v-5h16v5M8 28h40M25 28v6h6v-6"/></>,
    selectiveHearing: <><path {...common} d="M33 42c-5 0-7-4-5-8 2-5 7-6 7-13 0-6-4-10-10-10-7 0-12 6-12 14 0 7 3 10 6 14 2 3 5 4 8 2"/><path {...common} d="M20 26c0-6 3-9 7-9 3 0 5 2 5 5 0 5-5 5-6 10"/><path {...common} d="M42 35c4 2 6 5 6 9m-9-3c2 1 3 3 3 5"/></>,
  }[iconType] ?? <><circle {...common} cx="28" cy="28" r="18"/><path {...common} d="M20 28h16M28 20v16"/></>;

  return <svg className="skill-icon" viewBox="0 0 56 56" aria-hidden="true">{content}</svg>;
}
