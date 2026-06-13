import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, CheckCircle2, Menu, X, RotateCcw, Layers3 } from 'lucide-react';
import './styles/app.css';
import './styles/modules.css';
import './styles/practiceStats.css';
import { grammarCatalog, grammarGroups } from './data/grammarCatalog';
import { foundationLessonDetails } from './data/grammarLessons/foundationLessons';
import { buildQuestionBank } from './data/questionBank';
import { hasCuratedQuestionBank } from './data/questionBanks';
import { getLearningModule, getModuleStatusLabel, learningModules } from './data/learningModules';
import { loadState, saveState } from './shared/storage';
import { createPracticeSession, gradeAnswer, getProgressSummary, mergeAnswerRecord, pickNextQuestion, PRACTICE_STRATEGIES } from './domain/practiceEngine';
import { getGrammarAnswers, updateGrammarAnswer } from './domain/progressRepository';

const APP_NAME = '系统英语学习';
const APP_SUBTITLE = '语法 · 阅读 · 词汇 · 写作能力逐步构建';
const DEFAULT_MODULE_ID = 'grammar';

function App() {
  const initial = loadState();
  const [state, setState] = useState(initial);
  const [activeModuleId, setActiveModuleId] = useState(initial.activeModule || DEFAULT_MODULE_ID);
  const [activeId, setActiveId] = useState(initial.lastGrammarId || grammarCatalog[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [practice, setPractice] = useState(null);

  const activeModule = getLearningModule(activeModuleId);
  const active = grammarCatalog.find(g => g.id === activeId) || grammarCatalog[0];
  const lessonOverride = foundationLessonDetails[active.id];
  const displayActive = lessonOverride ? { ...active, ...lessonOverride } : active;
  const activeIndex = grammarCatalog.findIndex(g => g.id === active.id);
  const bank = useMemo(() => buildQuestionBank(active.id, active.title), [active.id, active.title]);
  const activeAnswers = getGrammarAnswers(state, active.id);
  const progress = getProgressSummary(bank, activeAnswers);
  const curated = hasCuratedQuestionBank(active.id);

  function persist(next) {
    const saved = saveState(next);
    setState(saved);
  }

  function chooseModule(moduleId) {
    setActiveModuleId(moduleId);
    setPractice(null);
    persist({ ...state, activeModule: moduleId, lastGrammarId: activeId });
  }

  function chooseGrammar(id) {
    setActiveModuleId(DEFAULT_MODULE_ID);
    setActiveId(id);
    setMenuOpen(false);
    setPractice(null);
    persist({ ...state, activeModule: DEFAULT_MODULE_ID, lastGrammarId: id });
  }

  function startPractice(strategy = PRACTICE_STRATEGIES.SEQUENTIAL) {
    setActiveModuleId(DEFAULT_MODULE_ID);
    const session = createPracticeSession(bank, activeAnswers, strategy);
    if (!session.current) return;
    setPractice(session);
  }

  function submitAnswer(option) {
    const result = gradeAnswer(practice.current, option);
    const previous = activeAnswers[practice.current.id];
    const answerRecord = mergeAnswerRecord(previous, result);
    const nextState = updateGrammarAnswer(state, active.id, practice.current.id, answerRecord);
    persist(nextState);
    setPractice({ ...practice, selected: option, checked: true });
  }

  function nextQuestion() {
    const latest = loadState().answers?.[active.id] || {};
    const current = pickNextQuestion(bank, latest, practice.strategy);
    if (!current) {
      setPractice(null);
      return;
    }
    setPractice({ ...practice, current, selected: null, checked: false, count: practice.count + 1 });
  }

  function goNextSection() {
    if (active.nextId) chooseGrammar(active.nextId);
    else setPractice(null);
  }

  return <div className="app">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="sideTop"><strong>学习路径</strong><button onClick={() => setMenuOpen(false)}><X size={20}/></button></div>
      <ModuleSwitcher activeModuleId={activeModuleId} onSelect={chooseModule}/>
      {activeModuleId === DEFAULT_MODULE_ID ? <GrammarMenu activeId={active.id} onChoose={chooseGrammar}/> : <ModuleMenuPlaceholder module={activeModule} onBackToGrammar={() => chooseModule(DEFAULT_MODULE_ID)}/>} 
    </aside>
    <main>
      <header className="topbar"><button className="menuBtn" onClick={() => setMenuOpen(true)}><Menu size={24}/></button><div><h1>{APP_NAME}</h1><p>{APP_SUBTITLE}</p></div></header>
      {activeModuleId !== DEFAULT_MODULE_ID ? <ModulePlaceholder module={activeModule} onBackToGrammar={() => chooseModule(DEFAULT_MODULE_ID)}/> : (!practice ? <LearningView grammar={displayActive} progress={progress} curated={curated} activeIndex={activeIndex} onStart={startPractice}/> :
        <PracticeView practice={practice} grammar={displayActive} onSubmit={submitAnswer} onNext={nextQuestion} onEnd={() => setPractice(null)} onNextSection={goNextSection}/>)}
    </main>
  </div>;
}

function ModuleSwitcher({ activeModuleId, onSelect }) {
  return <section className="moduleSwitch">
    <div className="moduleSwitchHeader">学习模块</div>
    <div className="moduleGrid">
      {learningModules.map(module => <button key={module.id} className={`modulePill ${module.id === activeModuleId ? 'active' : ''}`} onClick={() => onSelect(module.id)}>
        <span>{module.shortTitle}</span>
        <small>{getModuleStatusLabel(module.status)}</small>
      </button>)}
    </div>
  </section>;
}

function GrammarMenu({ activeId, onChoose }) {
  return <>
    <div className="syllabusMeta">语法模块 · {grammarGroups.length} 大模块 · {grammarCatalog.length} 个学习小节</div>
    {grammarGroups.map(group => <div className="categoryBlock" key={group.id}>
      <div className="categoryTitle"><span>{group.title}</span><small>{group.topics.length} 节</small></div>
      <p className="categoryDesc">{group.description}</p>
      {group.topics.map(g => {
        const index = grammarCatalog.findIndex(item => item.id === g.id);
        return <button key={g.id} className={`grammarItem ${g.id === activeId ? 'active' : ''}`} onClick={() => onChoose(g.id)}>
          <span className="index">{index + 1}</span><span><b>{g.title}</b><small>{g.level} · {g.summary}</small></span>
        </button>;
      })}
    </div>)}
  </>;
}

function ModuleMenuPlaceholder({ module, onBackToGrammar }) {
  return <div className="moduleMenuPlaceholder">
    <div className="syllabusMeta">{module.title}模块 · {getModuleStatusLabel(module.status)}</div>
    <p>{module.description}</p>
    <button className="secondary moduleBackBtn" onClick={onBackToGrammar}>返回语法学习</button>
  </div>;
}

function ModulePlaceholder({ module, onBackToGrammar }) {
  return <section className="content modulePlaceholderPage">
    <article className="card moduleHeroCard">
      <span className="tag">{getModuleStatusLabel(module.status)}</span>
      <h2>{module.title}模块</h2>
      <p>{module.description}</p>
      {module.id === 'reading' ? <div className="moduleRoadmap">
        <h3>阅读模块将和语法这样联动</h3>
        <ul>
          <li><b>文章精读</b>：每篇文章标注相关语法点和高频词。</li>
          <li><b>长难句分析</b>：遇到定语从句、非谓语、时态难点时可跳转到语法小节。</li>
          <li><b>阅读理解题</b>：复用当前选择题练习引擎，后续扩展判断题、主旨题、细节题。</li>
          <li><b>弱点回流</b>：阅读中反复出错的语法点，会推荐回语法模块复习。</li>
        </ul>
      </div> : <div className="moduleRoadmap"><h3>后续规划</h3><p>该模块会在保留当前语法学习进度的基础上逐步接入，不会影响已有语法题库和错题记录。</p></div>}
      <div className="actions"><button className="primary" onClick={onBackToGrammar}><BookOpen size={20}/>继续语法学习</button></div>
    </article>
  </section>;
}

const leadTerms = ['名词', '动词', '形容词', '副词', '介词', '连词', '限定词', '代词', '主语', '谓语', '宾语', '表语', '定语', '状语', '补语', '陈述句', '一般疑问句', '特殊疑问句', '祈使句', '感叹句', '第一步', '第二步', '第三步', '最后'];

function renderInline(text) {
  const markdownParts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return markdownParts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="markedText">{part.slice(2, -2)}</strong>;
    }

    const term = leadTerms.find(item => part.startsWith(item));
    if (term) {
      return <React.Fragment key={index}><strong className="markedText">{term}</strong>{part.slice(term.length)}</React.Fragment>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function splitLongBody(text) {
  const normalized = String(text || '').trim();
  if (!normalized) return [];

  if (normalized.includes('\n')) {
    return normalized.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
      if (/^[-*]\s+/.test(line)) return { type: 'li', text: line.replace(/^[-*]\s+/, '') };
      if (/^\d+[.)、]\s*/.test(line)) return { type: 'li', text: line.replace(/^\d+[.)、]\s*/, '') };
      return { type: 'p', text: line };
    });
  }

  const sentenceParts = normalized.split('。').map(item => item.trim()).filter(Boolean);
  const blocks = [];

  sentenceParts.forEach(sentence => {
    const colonMatch = sentence.match(/^(.{2,24}(?:包括|有|是|为|如下|先问))[:：](.+)$/);
    const shouldList = sentence.includes('；') && (sentence.length > 42 || colonMatch);

    if (!shouldList) {
      blocks.push({ type: 'p', text: `${sentence}。` });
      return;
    }

    if (colonMatch) {
      blocks.push({ type: 'p', text: `${colonMatch[1]}：` });
      colonMatch[2].split('；').map(item => item.trim()).filter(Boolean).forEach(item => blocks.push({ type: 'li', text: item }));
    } else {
      sentence.split('；').map(item => item.trim()).filter(Boolean).forEach(item => blocks.push({ type: 'li', text: item }));
    }
  });

  return blocks;
}

function RichText({ text }) {
  const blocks = splitLongBody(text);
  const rendered = [];
  let listItems = [];

  function flushList(keyPrefix) {
    if (!listItems.length) return;
    rendered.push(<ul className="smartList" key={`list-${keyPrefix}`}>{listItems.map((item, index) => <li key={index}>{renderInline(item)}</li>)}</ul>);
    listItems = [];
  }

  blocks.forEach((block, index) => {
    if (block.type === 'li') {
      listItems.push(block.text);
      return;
    }
    flushList(index);
    rendered.push(<p className="bodyBlock" key={`p-${index}`}>{renderInline(block.text)}</p>);
  });

  flushList('end');
  return <div className="richText">{rendered}</div>;
}

function LearningView({ grammar, progress, curated, activeIndex, onStart }) {
  const statusLabel = progress.done === 0 ? '未开始' : progress.done < progress.total ? '进行中' : progress.wrong > 0 ? '复习中' : '首轮完成';
  const wrongDisabled = progress.wrong === 0;

  return <section className="content">
    <div className="hero">
      <div>
        <span className="tag">第 {activeIndex + 1} 节 · {grammar.level}</span>
        <h2>{grammar.title}</h2>
        <p>{grammar.summary}</p>
        <p className="path"><b>{grammar.categoryTitle}</b><br/>{grammar.categoryDescription}</p>
        <p className="quality"><Layers3 size={16}/>题库状态：{curated ? '已接入人工精选题库' : '暂用通用题库，待人工精选题库接入'}</p>
        <div className="studyStatus">本小节状态：<b>{statusLabel}</b> · 首轮完成 {progress.completionRate}% · 错题 {progress.wrong} 道 · 还需 {progress.pending} 道完成首轮</div>
      </div>
      <div className="stats statGrid">
        <div><b>{progress.done}/{progress.total}</b><small>进度</small></div>
        <div><b>{progress.accuracyRate}%</b><small>正确率</small></div>
        <div><b>{progress.wrong}</b><small>错题</small></div>
        <div><b>{progress.pending}</b><small>待练</small></div>
        <div><b>{progress.mastered}</b><small>已掌握</small></div>
        <div><b>{progress.totalAttempts}</b><small>累计作答</small></div>
      </div>
    </div>
    {grammar.sections.map(sec => <article className="card" key={sec.heading}><h3>{sec.heading}</h3><RichText text={sec.body}/>{sec.examples.map(ex => <div className="example" key={ex.en}><b>{ex.en}</b><span>{ex.zh}</span><p>{ex.note}</p></div>)}</article>)}
    <div className="actions practiceActions">
      <button className="primary" onClick={() => onStart(PRACTICE_STRATEGIES.SEQUENTIAL)}><BookOpen size={20}/>继续顺序练习</button>
      <button className="secondary" disabled={wrongDisabled} title={wrongDisabled ? '暂无错题，先完成一轮练习吧' : ''} onClick={() => onStart(PRACTICE_STRATEGIES.WRONG_ONLY)}>练当前小节错题</button>
      <button className="secondary" onClick={() => onStart(PRACTICE_STRATEGIES.RANDOM_REVIEW)}>随机冲刺 10 题</button>
    </div>
    {wrongDisabled && <p className="actionHint">暂无错题，先完成一轮练习吧。</p>}
  </section>;
}

function getStrategyLabel(strategy) {
  if (strategy === PRACTICE_STRATEGIES.WRONG_ONLY || strategy === 'wrong-first') return '当前小节错题专项';
  if (strategy === PRACTICE_STRATEGIES.RANDOM_REVIEW) return '随机冲刺';
  return '顺序练习';
}

function PracticeView({ practice, grammar, onSubmit, onNext, onEnd, onNextSection }) {
  const q = practice.current;
  if (!q) {
    return <section className="content practice practicePage">
      <article className="card answerCard">
        <h3>当前没有可练习的题目</h3>
        <p>当前模式下没有可用题目。可以先返回本小节继续顺序练习。</p>
        <div className="actions"><button className="primary" onClick={onEnd}>返回本小节</button></div>
      </article>
    </section>;
  }

  return <section className="content practice practicePage">
    <div className="practiceTop practiceHero">
      <div>
        <span className="tag">{grammar.title}</span>
        <h2>选择题练习</h2>
        <p>当前策略：{getStrategyLabel(practice.strategy)}。先判断目标词在句子里承担什么功能，再看选项词类和结构。</p>
      </div>
      <button className="ghost" onClick={onEnd}>随时结束练习</button>
    </div>

    <article className="card question practiceCard">
      <div className="questionMeta"><span>{q.difficulty}</span>{q.tags?.map(tag => <span key={tag}>{tag}</span>)}</div>
      <h3 className="questionStem">{q.stem}</h3>
      <div className="options optionStack">{q.options.map(opt => <button key={opt} disabled={practice.checked} className={practice.checked ? (opt === q.answer ? 'right' : opt === practice.selected ? 'wrong' : '') : ''} onClick={() => onSubmit(opt)}>{opt}</button>)}</div>
    </article>

    {practice.checked && <article className="card answer answerCard"><h3>{practice.selected === q.answer ? <><CheckCircle2/> 回答正确</> : '回答错误'}</h3><p><b>题目翻译：</b>{q.translation}</p><p><b>正确答案：</b>{q.answer}</p><p><b>语法解析：</b>{q.explanation}</p><p><b>本题定位：</b>这道题考查「{grammar.title}」中的 {q.tags?.join(' / ') || '核心规则'}。做题时先看主语、时间标志、句子结构，再排除不符合语法规则的选项。</p><div className="actions"><button className="secondary" onClick={onNext}><RotateCcw size={18}/>继续练习</button><button className="primary" onClick={onNextSection}>进入下一小节语法</button></div></article>}
  </section>;
}

createRoot(document.getElementById('root')).render(<App />);
