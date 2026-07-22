import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'node:child_process';
import { createReadStream, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function archiveExportBridge() {
  const employeePattern = /^UC-\d{4}$/;

  function middleware(req, res, next) {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'POST' && url.pathname === '/api/archive-export') {
      const employeeNo = url.searchParams.get('employee') ?? '';
      if (!employeePattern.test(employeeNo)) {
        res.statusCode = 400;
        res.end('Invalid employee number');
        return;
      }

      const child = spawn(process.execPath, ['scripts/export-archive.mjs', employeeNo], {
        cwd: process.cwd(),
        stdio: 'ignore',
      });
      child.once('error', () => {
        res.statusCode = 500;
        res.end('Export failed');
      });
      child.once('exit', (code) => {
        res.statusCode = code === 0 ? 200 : 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: code === 0, employeeNo }));
      });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/archive-export/file') {
      const employeeNo = url.searchParams.get('employee') ?? '';
      const filename = url.searchParams.get('filename') ?? '';
      const allowedFilename = new RegExp(`^${employeeNo}-(?:archive\\.pdf|page-0[1-4]\\.png)$`);
      if (!employeePattern.test(employeeNo) || !allowedFilename.test(filename)) {
        res.statusCode = 400;
        res.end('Invalid export file');
        return;
      }
      const filePath = resolve('output', employeeNo, filename);
      if (!existsSync(filePath)) {
        res.statusCode = 404;
        res.end('Export file not found');
        return;
      }
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Type', filename.endsWith('.pdf') ? 'application/pdf' : 'image/png');
      createReadStream(filePath).pipe(res);
      return;
    }

    next();
  }

  return {
    name: 'lco-archive-export-bridge',
    configureServer(server) { server.middlewares.use(middleware); },
    configurePreviewServer(server) { server.middlewares.use(middleware); },
  };
}

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' }), archiveExportBridge()],
  server: { port: 4175, strictPort: true },
  preview: { port: 4176, strictPort: true },
});
