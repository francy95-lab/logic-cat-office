const employeeModules = import.meta.glob('../../employees/UC-*/data.json', {
  eager: true,
  import: 'default',
});

const portraitModules = import.meta.glob('../../employees/UC-*/portrait.png', {
  eager: true,
  import: 'default',
  query: '?url',
});

function normalizeEmployee(raw, sourcePath) {
  const sourceEmployeeNo = employeeNoFromPath(sourcePath);
  const dataEmployeeNo = raw.employeeNo;
  if (sourceEmployeeNo && dataEmployeeNo && sourceEmployeeNo !== dataEmployeeNo) {
    throw new Error(`员工编号不一致：${sourcePath} 声明为 ${dataEmployeeNo}`);
  }
  const employeeNo = sourceEmployeeNo ?? dataEmployeeNo;
  if (!employeeNo) throw new Error(`员工数据缺少 employeeNo：${sourcePath}`);

  const requiredTextFields = ['templateVersion', 'nameZh', 'nameEn', 'species', 'department', 'position', 'joinDate', 'statusZh', 'statusEn', 'level', 'portrait', 'archivistSignature', 'sealYear'];
  const missingFields = requiredTextFields.filter((field) => typeof raw[field] !== 'string' || !raw[field].trim());
  if (missingFields.length) throw new Error(`员工 ${employeeNo} 缺少必填字段：${missingFields.join(', ')}`);

  const normalized = { ...raw, employeeNo };

  if (!Array.isArray(normalized.skills) || !normalized.skills.length || normalized.skills.some(({ key, labelZh, score }) => !key || !labelZh || !Number.isInteger(score) || score < 0 || score > 5)) {
    throw new Error(`员工 ${employeeNo} 的 skills 必须使用 { key, labelZh, score } 结构`);
  }
  if (!Array.isArray(normalized.tags) || !Array.isArray(normalized.archivistNote)) throw new Error(`员工 ${employeeNo} 的 tags 和 archivistNote 必须为数组`);
  if (!Array.isArray(normalized.performanceReview?.body) || !Array.isArray(normalized.performanceReview?.reason)) throw new Error(`员工 ${employeeNo} 的 performanceReview 结构无效`);

  return normalized;
}

function employeeNoFromPath(path) {
  return path.match(/UC-\d{4}/)?.[0];
}

export const employees = Object.entries(employeeModules)
  .map(([path, data]) => normalizeEmployee(data, path))
  .sort((a, b) => a.employeeNo.localeCompare(b.employeeNo));

const employeeNumbers = employees.map(({ employeeNo }) => employeeNo);
if (new Set(employeeNumbers).size !== employeeNumbers.length) {
  throw new Error('员工数据中存在重复 employeeNo');
}

export const portraitsByEmployeeNo = Object.fromEntries(
  Object.entries(portraitModules).map(([path, url]) => [employeeNoFromPath(path), url]),
);

export function getEmployeePortrait(employeeNo) {
  const portraitUrl = portraitsByEmployeeNo[employeeNo];
  if (!portraitUrl) throw new Error(`找不到员工头像：employees/${employeeNo}/portrait.png`);
  return portraitUrl;
}
