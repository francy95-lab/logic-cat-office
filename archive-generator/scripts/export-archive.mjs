import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const employeeNo = process.argv[2] ?? process.env.ARCHIVE_EMPLOYEE ?? 'UC-0001';
if (!/^UC-\d{4}$/.test(employeeNo)) {
  throw new Error(`无效员工编号：${employeeNo}。请使用 UC-xxxx 格式。`);
}

const outputDir = resolve('output', employeeNo);
const previewUrl = new URL(process.env.ARCHIVE_PREVIEW_URL ?? 'http://127.0.0.1:4175/');
previewUrl.searchParams.set('export', '1');
previewUrl.searchParams.set('employee', employeeNo);

await mkdir(outputDir, { recursive: true });

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  throw new Error('Playwright 尚未安装。请在 archive-generator 目录执行 npm install 后再运行 npm run export。');
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1055, height: 1491 }, deviceScaleFactor: 1 });
await page.goto(previewUrl.href, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  await document.fonts.ready;
  const requiredFonts = [
    ['Source Serif 4', 700, 'EMPLOYEE ARCHIVE'],
    ['IBM Plex Mono', 400, 'FILE NO. UC-0001'],
    ['IBM Plex Mono', 500, 'ACTIVE'],
    ['IBM Plex Mono', 600, 'EMPLOYEE INFORMATION'],
    ['Source Han Sans SC', 400, '逻辑猫事务所·员工档案'],
    ['Source Han Sans SC', 500, '员工信息'],
    ['Source Han Sans SC', 700, '评价等级'],
    ['LXGW WenKai GB', 400, '档案管理员备注'],
  ];
  const missing = requiredFonts.filter(([family, weight, sample]) => !document.fonts.check(`${weight} 24px "${family}"`, sample));
  if (missing.length) {
    throw new Error(`Required archive fonts failed to load: ${missing.map(([family, weight]) => `${family} ${weight}`).join(', ')}`);
  }
});

const archivePages = page.locator('.archive-page');
const count = await archivePages.count();
for (let index = 0; index < count; index += 1) {
  await archivePages.nth(index).screenshot({ path: resolve(outputDir, `${employeeNo}-page-${String(index + 1).padStart(2, '0')}.png`) });
}

await page.pdf({ path: resolve(outputDir, `${employeeNo}-archive.pdf`), width: '1055px', height: '1491px', printBackground: true, preferCSSPageSize: true });
await browser.close();

console.log(`Exported ${count} pages to ${outputDir}`);
