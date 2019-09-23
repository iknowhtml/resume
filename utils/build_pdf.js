const puppeteer = require('puppeteer');
const path = require('path');

const generatePdf = async () => {
  try {
    console.log('launching headless browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    console.log('opening new page...');
    const page = await browser.newPage();

    console.log(`navigating to file://${path.resolve('dist', 'index.html')}`);
    await page.goto(`file://${path.resolve('dist', 'index.html')}`, {
      waitUntil: 'networkidle0',
    });

    console.log('generating pdf...');
    console.log('writing pdf to disk...');

    await page.pdf({
      path: path.resolve('dist', "Aki Gao's Resume.pdf"),
    });

    await browser.close();
    console.log('complete writing pdf to disk!');
  } catch (e) {
    console.log(e);
  }
};

generatePdf();
