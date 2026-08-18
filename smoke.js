// nano-workbench jsdom 冒烟测试：页面加载无致命 JS 错误，UI 初始化正常
const fs = require('fs');
const path = require('path');
let jsdomMod;
try {
  jsdomMod = require('jsdom'); // CI / 本地 npm install jsdom
} catch (e) {
  jsdomMod = require('C:/Users/53014/.workbuddy/binaries/node/workspace/node_modules/jsdom'); // 原开发机回退路径
}
const JSDOM = jsdomMod.JSDOM || jsdomMod.default || jsdomMod;
const { VirtualConsole } = jsdomMod;

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const vcons = new VirtualConsole();
let errCount = 0;
vcons.on('jsdomError', e => { errCount++; console.log('jsdomError:', e.message); });

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  url: 'http://localhost/',
  virtualConsole: vcons,
  beforeParse(w) {
    w.URL.createObjectURL = () => 'blob:mock';
    w.URL.revokeObjectURL = () => {};
  }
});

setTimeout(() => {
  const d = dom.window.document;
  const c = {
    hasSearch: !!d.getElementById('search'),
    hasSide: !!d.getElementById('side'),
    hasTabs: !!d.getElementById('tabs'),
    hasEmpty: !!d.getElementById('empty'),
    tools: d.getElementById('side') ? d.getElementById('side').querySelectorAll('.tool').length : 0,
    lang: !!d.getElementById('langBtn')
  };
  console.log('checks:', c);
  const okAll = errCount === 0 && c.hasSearch && c.hasSide && c.hasTabs && c.hasEmpty && c.tools >= 20 && c.lang;
  console.log(okAll ? 'SMOKE PASS' : 'SMOKE FAIL', 'jsdomError=' + errCount);
  process.exit(okAll ? 0 : 1);
}, 2500);
