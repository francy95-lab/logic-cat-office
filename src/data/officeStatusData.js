export const officeStatusData = {
  refreshInterval: 6500,
  metrics: {
    coffee: {
      label: 'COFFEE LEVEL',
      unit: '%',
      min: 0,
      max: 200,
      ranges: [
        { max: 20, level: 'LOW', icon: 'coffee-0.svg', statuses: ['COFFEE ABSENT / OPERATIONS DELAYED', 'SYSTEM AWAKE, STAFF ARE NOT'] },
        { max: 50, level: 'LOW', icon: 'coffee-low.svg', statuses: ['LOW FUEL / POLITE PANIC', 'BREW CYCLE REQUESTED'] },
        { max: 90, level: 'MEDIUM', icon: 'coffee-mid.svg', statuses: ['FUNCTIONING WITH CONDITIONS', 'OPERATIONS WITHIN TOLERANCE'] },
        { max: 120, level: 'HIGH', icon: 'coffee-full.svg', statuses: ['OVERWORKED BUT FUNCTIONAL', 'PRODUCTIVITY TEMPORARILY PLAUSIBLE'] },
        { max: 170, level: 'ABNORMAL', icon: 'coffee-over.svg', statuses: ['CAFFEINE SURPLUS DETECTED', 'CUP CAPACITY EXCEEDED'], extreme: true },
        { max: Infinity, level: 'ABNORMAL', icon: 'coffee-meltdown.svg', statuses: ['MELTDOWN IMMINENT', 'BEVERAGE EVENT ESCALATED'], extreme: true },
      ],
    },
    fish: {
      label: 'FISH INVENTORY',
      unit: '',
      min: 0,
      max: 100,
      ranges: [
        { max: 5, level: 'NORMAL', icon: 'fish-1.svg', statuses: ['SINGLE FISH VERIFIED', 'MINIMAL STOCK / ACCOUNTED FOR'] },
        { max: 20, level: 'WARNING', icon: 'fish-basket.svg', statuses: ['STORAGE WARNING', 'BASKET CAPACITY MONITORED'] },
        { max: 50, level: 'OVERSTOCK', icon: 'fish-overstock.svg', statuses: ['FISH OVERSTOCK DETECTED', 'AUXILIARY BASKET REQUIRED'] },
        { max: Infinity, level: 'DISASTER', icon: 'fish-crisis.svg', statuses: ['FISH STORAGE CRISIS', 'MARITIME LOGISTICS FAILURE'], extreme: true },
      ],
    },
    cases: {
      label: 'OPEN CASES',
      unit: '',
      min: 0,
      max: 100,
      ranges: [
        { max: 10, level: 'NORMAL', icon: 'case-low.svg', statuses: ['CASELOAD WITHIN TOLERANCE', 'UNUSUALLY QUIET'] },
        { max: 40, level: 'BACKLOG', icon: 'case-medium.svg', statuses: ['BACKLOG DETECTED', 'FILING DELAY EXPECTED'] },
        { max: 80, level: 'DANGER', icon: 'case-flood.svg', statuses: ['CASE OVERLOAD', 'ARCHIVE PRESSURE RISING'], extreme: true },
        { max: Infinity, level: 'COLLAPSE', icon: 'case-collapse.svg', statuses: ['ARCHIVE COLLAPSE LIKELY', 'STRUCTURAL FILING FAILURE'], extreme: true },
      ],
    },
  },
  moods: [
    { label: 'STABLE', mentalWeather: 'PARTLY ORGANIZED', affectedStaff: '02 / 30', confidence: '91%', verdict: 'TEMPORARILY COOPERATIVE' },
    { label: 'CHAOTIC', mentalWeather: 'INDOOR THUNDER', affectedStaff: '19 / 30', confidence: '88%', verdict: 'NO CONSENSUS DETECTED' },
    { label: 'FISH EMERGENCY', mentalWeather: 'MARITIME PRESSURE', affectedStaff: '27 / 30', confidence: '96%', verdict: 'COLLECTIVE FISH CONCERN' },
    { label: 'LOW BATTERY', mentalWeather: 'HEAVY AFTERNOON FOG', affectedStaff: '14 / 30', confidence: '84%', verdict: 'OUTPUT BELOW EXPECTATION' },
    { label: 'SUSPICIOUS', mentalWeather: 'LOCALIZED STATIC', affectedStaff: '08 / 30', confidence: '63%', verdict: 'MOTIVES REMAIN UNCLEAR' },
    { label: 'OVERWORKED', mentalWeather: 'CAFFEINATED HEAT', affectedStaff: '23 / 30', confidence: '92%', verdict: 'REST REQUEST MISFILED' },
    { label: 'DAYDREAMING', mentalWeather: 'SOFT CLOUD COVER', affectedStaff: '11 / 30', confidence: '58%', verdict: 'PRESENT / NOT AVAILABLE' },
  ],
};

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function getMetricState(metricName, value) {
  const metric = officeStatusData.metrics[metricName];
  const range = metric.ranges.find((item) => value <= item.max) ?? metric.ranges.at(-1);
  const status = range.statuses[value % range.statuses.length];

  return {
    ...metric,
    value,
    icon: `/assets/status-icons/${metricName}/${range.icon}`,
    level: range.level,
    status,
    extreme: Boolean(range.extreme),
  };
}

export function createRandomOfficeStatus() {
  const { coffee, fish, cases } = officeStatusData.metrics;

  return {
    coffee: randomBetween(coffee.min, coffee.max),
    fish: randomBetween(fish.min, fish.max),
    cases: randomBetween(cases.min, cases.max),
    moodIndex: randomBetween(0, officeStatusData.moods.length - 1),
  };
}

export function advanceOfficeStatus(current) {
  const statusKeys = ['coffee', 'fish', 'cases', 'moodIndex'];
  const selectedKey = statusKeys[randomBetween(0, statusKeys.length - 1)];

  if (selectedKey === 'moodIndex') {
    const offset = randomBetween(1, officeStatusData.moods.length - 1);
    return {
      ...current,
      moodIndex: (current.moodIndex + offset) % officeStatusData.moods.length,
    };
  }

  const metric = officeStatusData.metrics[selectedKey];
  const maxStep = selectedKey === 'coffee' ? 7 : 3;
  let direction = Math.random() < 0.5 ? -1 : 1;
  if (current[selectedKey] <= metric.min) direction = 1;
  if (current[selectedKey] >= metric.max) direction = -1;

  return {
    ...current,
    [selectedKey]: clamp(
      current[selectedKey] + (direction * randomBetween(1, maxStep)),
      metric.min,
      metric.max,
    ),
  };
}
