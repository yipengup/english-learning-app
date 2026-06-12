# 系统英语语法学习 PWA

手机浏览器可直接使用的英语语法学习应用。当前版本支持：

- 左上角可收缩语法目录
- 从简单到复杂的语法路径
- 每个语法点包含知识讲解、例句、中文翻译和解析
- 每个语法点拥有 200 道选择题容量
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

然后推送到 `master` 分支后会自动构建和部署。

部署完成后的访问地址通常是：

`https://yipengup.github.io/english-learning-app/`

## 当前架构

```text
src/
├── data/
│   ├── grammarCatalog.js              # 语法课程目录与知识讲解
│   ├── questionBank.js                # 对外题库入口
│   └── questionBanks/
│       ├── index.js                   # 题库注册中心
│       ├── bankFactory.js             # 题库生成与校验工厂
│       ├── beVerbs.js                 # Be 动词精选题库
│       └── presentSimple.js           # 一般现在时精选题库
├── domain/
│   ├── questionSchema.js              # 题目结构、校验规则
│   ├── practiceEngine.js              # 抽题、判题、进度统计策略
│   └── progressRepository.js          # 本地进度存储抽象
├── shared/
│   └── storage.js                     # 兼容旧版本入口
└── styles/
    └── app.css
```

## 设计原则

1. **内容和逻辑分离**：语法讲解在 `grammarCatalog.js`，题库在 `questionBanks/`，抽题判题在 `domain/practiceEngine.js`。
2. **题库注册制**：新增语法题库时，只需要新建一个题库文件，并在 `questionBanks/index.js` 注册。
3. **可替换存储层**：当前使用 localStorage，后续要接 Supabase、Firebase 或自建后端，只需要替换 `progressRepository.js`。
4. **可扩展模块**：后续单词、听力、阅读可以复用 `questionSchema` 和 `practiceEngine`，不需要重写练习系统。

## 新增一个语法题库的方式

1. 新建文件：`src/data/questionBanks/xxx.js`
2. 使用 `createCuratedQuestionBank(grammarId, seeds, 200)`
3. 每道题至少包含：`stem`、`translation`、`answer`、`options`、`explanation`、`difficulty`、`tags`
4. 在 `src/data/questionBanks/index.js` 注册这个 builder

## 题库质量状态

目前已经接入第一批高质量精选题库：

- Be 动词：20 个核心考点种子题，扩展为 200 题容量
- 一般现在时：20 个核心考点种子题，扩展为 200 题容量

其他语法点暂时使用 fallback 占位题库。后续应按语法顺序逐个替换为人工精选题库。

## 后续扩展建议

- 继续补齐 `现在进行时`、`一般过去时`、`现在完成时` 等题库。
- 将题库从“种子题 + 变体扩展”逐步升级成真正 200 道完全独立题。
- 增加错题本页面、收藏题目、学习日历和弱项统计。
- 新增 `src/modules/vocabulary`、`src/modules/listening`、`src/modules/reading`，保持模块化扩展。
