// nano-workbench 纯函数单测：抽取应用 <script>，校验导出与工具列表/筛选/分组逻辑
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const body = scripts.find(s => s.includes('buildDemoUrl'));
if (!body) { console.error('FAIL: app script not found'); process.exit(1); }

const mod = { exports: {} };
new Function('module', 'exports', body)(mod, mod.exports);
const { BASE, buildDemoUrl, escapeHTML, filterTools, groupByCat, catsOf } = mod.exports;

let pass = 0, fail = 0;
function eq(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? '✓' : '✗') + ' ' + name + '  got=' + JSON.stringify(got));
  ok ? pass++ : fail++;
}
function ok(name, cond) {
  console.log((cond ? '✓' : '✗') + ' ' + name);
  cond ? pass++ : fail++;
}

// 1. demo URL 拼装
eq('buildDemoUrl', buildDemoUrl('GraphForge'), 'https://wangzifan396-wzf.github.io/GraphForge/');
// 2. 转义
eq('escapeHTML', escapeHTML('<b>&'), '&lt;b&gt;&amp;');
// 3. 内置工具总数=28
const TOOLS_ALL = (html.match(/\{id:"/g) || []).length; // 仅粗检模板里的工具条目数量
ok('模板内嵌工具条目≥28', TOOLS_ALL >= 28);
// 4. filterTools
const sample = [
  {id:'A', name:'RegexLab', cat:'文本处理', desc:'正则', tags:['regex']},
  {id:'B', name:'GraphForge', cat:'可视化', desc:'图表', tags:['mermaid']},
  {id:'C', name:'ChatForge', cat:'AI 效率', desc:'对话', tags:['ai']}
];
eq('filter 空词全返回', filterTools(sample,'','全部').length, 3);
eq('filter 关键词 regex', filterTools(sample,'regex','全部').map(t=>t.id), ['A']);
eq('filter 分类筛选', filterTools(sample,'','可视化').map(t=>t.id), ['B']);
eq('filter 关键词+分类交集', filterTools(sample,'图','可视化').map(t=>t.id), ['B']);
// 5. groupByCat
const g = groupByCat(sample);
eq('group keys', Object.keys(g).sort(), ['AI 效率','可视化','文本处理']);
eq('group 可视化含 B', g['可视化'].map(t=>t.id), ['B']);
// 6. catsOf
eq('catsOf', catsOf(sample).sort(), ['AI 效率','可视化','文本处理']);
// 7. 单文件完整性（允许 iframe 指向 github.io，但禁止外链 <script>/<link>）
ok('单文件不含外链 <script src>', !/<script[^>]+src\s*=\s*["']https?:/i.test(html));
ok('单文件不含外链 <link href>', !/<link[^>]+href\s*=\s*["']https:/i.test(html));
ok('单文件含 github.io demo 基址', html.includes('https://wangzifan396-wzf.github.io/'));

console.log(`\n结果: ${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);
