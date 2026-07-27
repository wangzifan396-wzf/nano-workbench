# nano-workbench · 工具工作台

> 单文件、零依赖的 **nano-tools 统一工作台**：一个标签页收纳全部 **100** 款单文件工具，点选即在内嵌窗口里运行、标签间即时切换，无需反复打开新页面。
> 属于 [nano-tools](https://github.com/wangzifan396-wzf) 单文件开发者工具矩阵。

[![live demo](https://img.shields.io/badge/demo-online-brightgreen)](#在线试用)
[![license](https://img.shields.io/badge/license-MIT-blue)](#)
[![single-file](https://img.shields.io/badge/single%20file-1%20HTML-orange)](#)

## ✨ 特性

- 🧩 **单文件**：整个应用就是一个 `index.html`，双击即开，无需安装、无需服务器
- 🚫 **零依赖**：纯原生 JS，运行时**不加载任何第三方脚本 / 样式表**
- 🗂 **标签页工作台**：左侧工具列表（搜索 + 分类分组），点击即在主区打开；多工具同时驻留为标签，一键切换
- 🔗 **实时运行**：每个工具以内嵌窗口加载其 GitHub Pages 在线 demo，所见即所得
- ↗️ **新标签打开**：每个标签带「在新标签打开」按钮，方便独立使用
- 🌐 **中英双语**：界面一键切换，偏好记忆
- 🎨 **暗色主题**：Linear 风格，与全矩阵一致

## 🖥 在线试用

打开 `index.html` 即可。也可访问 GitHub Pages 在线 Demo（仓库启用后自动生成）。

> 说明：工作台以 iframe 加载各工具的 GitHub Pages 在线 demo，因此需要联网；若需完全离线，请直接使用各工具的单文件 `index.html`。

## 🚀 用法

1. 左侧搜索或按分类找到工具，点击即在新标签中打开
2. 顶部标签栏切换已打开的工具，点 `×` 关闭、点 `↗` 在新标签打开
3. 所有工具数据与 WB 门户同源，保持 100 款一致

## 🛠 开发

源码在 `template.html`，由 `build.py` 产出单文件 `index.html`：

```bash
python build.py   # 产出 index.html（纯原生，无第三方库）
```

> 发布时只需 `index.html` 一个文件。工具清单内嵌于 `TOOLS` 数组，与 WB 门户保持一致。

## ✅ 测试

```bash
node _test.js     # 纯函数单测（demo URL 拼装 / 工具筛选 / 分类分组 / 单文件无外链脚本）
node smoke.js     # jsdom 加载冒烟（UI 初始化无致命错误）
```

## 📄 许可证

MIT © nano-tools
