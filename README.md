# 系统英语语法学习 PWA

手机浏览器可直接使用的英语语法学习应用。当前版本支持：

- 左上角可收缩语法目录
- 从简单到复杂的语法路径
- 每个语法点包含知识讲解、例句、中文翻译和解析
- 每个语法点运行时生成 200 道选择题
- 练习优先抽取未做题；全部做完后优先抽取错题
- 每题提交后显示中文翻译、正确答案和语法解析
- 使用 localStorage 保存本机学习进度
- PWA 配置，支持添加到手机主屏幕
- 代码结构预留后续扩展单词、听力、阅读等模块

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## GitHub Pages 部署

本仓库已包含 GitHub Actions：`.github/workflows/deploy.yml`。

首次使用时进入：

`Settings → Pages → Build and deployment → Source → GitHub Actions`

然后推送到 `main` 分支后会自动构建和部署。

部署完成后的访问地址通常是：

`https://yipengup.github.io/english-learning-app/`

## 后续扩展建议

- 将 `src/data/grammarCatalog.js` 扩展为完整语法课程树。
- 将 `src/data/questionBank.js` 从模板生成题升级为真实 200 题静态题库或远程题库。
- 新增 `src/modules/vocabulary`、`src/modules/listening`、`src/modules/reading`，保持模块化扩展。
