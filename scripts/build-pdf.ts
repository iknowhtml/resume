import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

// Simple static file server
const mimeTypes: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : (req.url ?? '/index.html');
  const filePath = path.join(distPath, url);
  const ext = path.extname(filePath);
  
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

await new Promise<void>((resolve) => server.listen(4173, resolve));

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:4173/', {
  waitUntil: 'networkidle',
});


await page.pdf({
  path: path.join(distPath, "Aki Gao's Resume.pdf"),
  format: 'Letter',
  margin: { top: '10mm', right: '8mm', bottom: '8mm', left: '8mm' },
});

await browser.close();
server.close();
console.log('PDF generated successfully');
