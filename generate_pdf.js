const fs = require('fs');
const pdf = require('html-pdf');
const { JSDOM } = require('jsdom');

const options = {
  directory: '/tmp',
  base: `file://${__dirname}/`,
  height: '1553px',
  width: '1200px',
  orientation: 'portrait'
};

const buildHtml = () => {
  const style = fs.readFileSync('./cv.css', 'utf8');
  const dom = new JSDOM(fs.readFileSync('./index.html', 'utf8'));

  const body = dom.window.document.querySelector('body').innerHTML;

  console.log('building html...');

  return (
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
    '<title>Xiaoyu A. Gao Resume</title>' +
    '<style type="text/css">' +
    style +
    '</style>' +
    '</head><body style="font-family:">' +
    body +
    '</body></html>'
  );
};

const HTML = buildHtml();

console.log('complete building html!');
console.log('converting html to pdf...');
pdf.create(HTML, options).toFile('./cv.pdf', (err, res) => {
  if (err) {
    return console.log(err);
  }
  console.log(`wrote resume to ${res.filename}!`);
  console.log('complete converting html to pdf!');
});
