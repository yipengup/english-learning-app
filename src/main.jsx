import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, CheckCircle2, Menu, X, RotateCcw, Layers3 } from 'lucide-react';
import './styles/app.css';
import { grammarCatalog, grammarGroups } from './data/grammarCatalog';
import { buildQuestionBank } from './data/questionBank';
import { hasCuratedQuestionBank } from './data/questionBanks';
import { loadState, saveState } from './shared/storage';
import { createPracticeSession, gradeAnswer, getProgressSummary, mergeAnswerRecord, pickNextQuestion } from './domain/practiceEngine';
import { getGrammarAnswers, updateGrammarAnswer } from './domain/progressRepository';

function App() {
  const initial = loadState();
  const [state, setState] = useState(initial);
  const [activeId, setActiveId] = useState(initial.lastGrammarId || grammarCatalog[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [practice, setPractice] = useState(null);
  const active = grammarCatalog.find(g => g.id === activeId) || grammarCatalog[0];
  const activeIndex = grammarCatalog.findIndex(g => g.id === active.id);
  const bank = useMemo(() => buildQuestionBank(active.id, active.title), [active.id, active.title]);
  const activeAnswers = getGrammarAnswers(state, active.id);
  const progress = getProgressSummary(bank, activeAnswers);
  const curated = hasCuratedQuestionBank(active.id);

  function persist(next) {
    const saved = saveState(next);
    setState(saved);
  }

  function chooseGrammar(id) {
    setActiveId(id);
    setMenuOpen(false);
    setPractice(null);
    persist({ ...state, lastGrammarId: id });
  }

  function startPractice(strategy = 'unanswered-first') {
    setPractice(createPracticeSession(bank, activeAnswers, strategy));
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
    setPractice({ ...practice, current: pickNextQuestion(bank, latest, practice.strategy), selected: null, checked: false, count: practice.count + 1 });
  }

  function goNextSection() {
    if (active.nextId) chooseGrammar(active.nextId);
    else setPractice(null);
  }

  return <div className="app">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="sideTop"><strong>语法路径</strong><button onClick={() => setMenuOpen(false)}><X size={20}/></button></div>
      <div className="syllabusMeta">9 大模块 · {grammarCatalog.length} 个语法小节</div>
      {grammarGroups.map(group => <div className="categoryBlock" key={group.id}>
        <div className="categoryTitle"><span>{group.title}</span><small>{group.topics.length} 节</small></div>
        <p className="categoryDesc">{group.description}</p>
        {group.topics.map(g => {
          const index = grammarCatalog.findIndex(item => item.id === g.id);
          return <button key={g.id} className={`grammarItem ${g.id === active.id ? 'active' : ''}`} onClick={() => chooseGrammar(g.id)}>
            <span className="index">{index + 1}</span><span><b>{g.title}</b><small>{g.level} · {g.summary}</small></span>
          </button>;
        })}
      </div>)}
    </aside>
    <main>
      <header className="topbar"><button className="menuBtn" onClick={() => setMenuOpen(true)}><Menu size={24}/></button><div><h1>系统英语语法学习</h1><p>主流语法体系：词法 → 句法 → 时态语态 → 从句 → 非谓语 → 写作语法</p></div></header>
      {!practice ? <LearningView grammar={active} progress={progress} curated={curated} activeIndex={activeIndex}/> :
        <PracticeView practice={practice} grammar={active} onSubmit={submitAnswer} onNext={nextQuestion} onEnd={() => setPractice(null)} onNextSection={goNextSection}/>} 
    </main>
  </div>;
}

function LearningView({ grammar, progress, curated, activeIndex }) {
  return <section className="content">
    <div className="hero"><div><span className="tag">第 {activeIndex + 1} 节 · {grammar.level}</span><h2>{grammar.title}</h2><p>{grammar.summary}</p><p className="path"><b>{grammar.categoryTitle}</b><br/>{grammar.categoryDescription}</p><p className="quality"><Layers3 size={16}/>题库状态：{curated ? '已接入人工精选题库 + 变体扩展' : '暂用通用题库，待人工精选题库接入'}</p></div><div className="stats"><b>{progress.done}/{progress.total}</b><small>已练习</small><b>{progress.wrong}</b><small>错题</small><b>{progress.completionRate}%</b><small>完成度</small></div></div>
    {grammar.sections.map(sec => <article className="card" key={sec.heading}><h3>{sec.heading}</h3><p>{sec.body}</p>{sec.examples.map(ex => <div className="example" key={ex.en}><b>{ex.en}</b><span>{ex.zh}</span><p>{ex.note}</p></div>)}</article>)}
    <div className="actions"><button className="primary" onClick={() => window.dispatchEvent(new CustomEvent('start-practice'))} style={{display:'none'}}></button><StartButtons /></div>
  </section>;
}

function StartButtons() {
  const appRoot = document.querySelector('.app');
  return <><button className="primary" onClick={() => appRoot?.dispatchEvent(new CustomEvent('startPractice', { detail: 'unanswered-first' }))}><BookOpen size={20}/>开始练习本语法</button><button className="secondary" onClick={() => appRoot?.dispatchEvent(new CustomEvent('startPractice', { detail: 'wrong-first' }))}>优先复习错题</button></>;
}

function PracticeView({ practice, grammar, onSubmit, onNext, onEnd, onNextSection }) {
  const q = practice.current;
  return <section className="content practice">
    <div className="practiceTop"><div><span className="tag">{grammar.title}</span><h2>选择题练习</h2><p>当前策略：{practice.strategy === 'wrong-first' ? '错题优先' : '未做题优先'}</p></div><button className="ghost" onClick={onEnd}>随时结束练习</button></div>
    <article className="card question"><div className="questionMeta"><span>{q.difficulty}</span>{q.tags?.map(tag => <span key={tag}>{tag}</span>)}</div><h3>{q.stem}</h3><div className="options">{q.options.map(opt => <button key={opt} disabled={practice.checked} className={practice.checked ? (opt === q.answer ? 'right' : opt === practice.selected ? 'wrong' : '') : ''} onClick={() => onSubmit(opt)}>{opt}</button>)}</div></article>
    {practice.checked && <article className="card answer"><h3>{practice.selected === q.answer ? <><CheckCircle2/> 回答正确</> : '回答错误'}</h3><p><b>题目翻译：</b>{q.translation}</p><p><b>正确答案：</b>{q.answer}</p><p><b>语法解析：</b>{q.explanation}</p><p><b>本题定位：</b>这道题考查「{grammar.title}」中的 {q.tags?.join(' / ') || '核心规则'}。做题时先看主语、时间标志、句子结构，再排除不符合语法规则的选项。</p><div className="actions"><button className="secondary" onClick={onNext}><RotateCcw size={18}/>继续练习</button><button className="primary" onClick={onNextSection}>进入下一小节语法</button></div></article>}
  </section>;
}

function AppWithPracticeEvents() {
  const [key, setKey] = useState(0);
  return <App key={key} onReload={() => setKey(key + 1)} />;
}

createRoot(document.getElementById('root')).render(<App />);
