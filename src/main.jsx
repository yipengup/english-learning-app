import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, CheckCircle2, Menu, X, RotateCcw } from 'lucide-react';
import './styles/app.css';
import { grammarCatalog } from './data/grammarCatalog';
import { buildQuestionBank } from './data/questionBank';
import { loadState, pickNextQuestion, saveState } from './shared/storage';

function App() {
  const initial = loadState();
  const [state, setState] = useState(initial);
  const [activeId, setActiveId] = useState(initial.lastGrammarId || grammarCatalog[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [practice, setPractice] = useState(null);
  const active = grammarCatalog.find(g => g.id === activeId) || grammarCatalog[0];
  const bank = useMemo(() => buildQuestionBank(active.id), [active.id]);
  const activeAnswers = state.answers[active.id] || {};

  function persist(next) {
    setState(next);
    saveState(next);
  }

  function chooseGrammar(id) {
    setActiveId(id);
    setMenuOpen(false);
    setPractice(null);
    persist({ ...state, lastGrammarId: id });
  }

  function startPractice() {
    setPractice({ current: pickNextQuestion(bank, activeAnswers), selected: null, checked: false, count: 0 });
  }

  function submitAnswer(option) {
    const correct = option === practice.current.answer;
    const nextAnswers = { ...activeAnswers, [practice.current.id]: { correct, selected: option, updatedAt: Date.now() } };
    const nextState = { ...state, answers: { ...state.answers, [active.id]: nextAnswers }, lastGrammarId: active.id };
    persist(nextState);
    setPractice({ ...practice, selected: option, checked: true });
  }

  function nextQuestion() {
    const latest = loadState().answers[active.id] || {};
    setPractice({ current: pickNextQuestion(bank, latest), selected: null, checked: false, count: practice.count + 1 });
  }

  function goNextSection() {
    if (active.nextId) chooseGrammar(active.nextId);
    else setPractice(null);
  }

  const done = Object.values(activeAnswers).filter(Boolean).length;
  const wrong = Object.values(activeAnswers).filter(a => a.correct === false).length;

  return <div className="app">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="sideTop"><strong>语法路径</strong><button onClick={() => setMenuOpen(false)}><X size={20}/></button></div>
      {grammarCatalog.map((g, index) => <button key={g.id} className={`grammarItem ${g.id === active.id ? 'active' : ''}`} onClick={() => chooseGrammar(g.id)}>
        <span className="index">{index + 1}</span><span><b>{g.title}</b><small>{g.level} · {g.summary}</small></span>
      </button>)}
    </aside>
    <main>
      <header className="topbar"><button className="menuBtn" onClick={() => setMenuOpen(true)}><Menu size={24}/></button><div><h1>系统英语语法学习</h1><p>从简单到复杂，讲解 + 例句解析 + 选择题练习</p></div></header>
      {!practice ? <LearningView grammar={active} done={done} wrong={wrong} total={bank.length} onStart={startPractice}/> :
        <PracticeView practice={practice} grammar={active} onSubmit={submitAnswer} onNext={nextQuestion} onEnd={() => setPractice(null)} onNextSection={goNextSection}/>} 
    </main>
  </div>;
}

function LearningView({ grammar, done, wrong, total, onStart }) {
  return <section className="content">
    <div className="hero"><div><span className="tag">{grammar.level}</span><h2>{grammar.title}</h2><p>{grammar.summary}</p></div><div className="stats"><b>{done}/{total}</b><small>已练习</small><b>{wrong}</b><small>错题</small></div></div>
    {grammar.sections.map(sec => <article className="card" key={sec.heading}><h3>{sec.heading}</h3><p>{sec.body}</p>{sec.examples.map(ex => <div className="example" key={ex.en}><b>{ex.en}</b><span>{ex.zh}</span><p>{ex.note}</p></div>)}</article>)}
    <button className="primary" onClick={onStart}><BookOpen size={20}/>开始练习本语法</button>
  </section>;
}

function PracticeView({ practice, grammar, onSubmit, onNext, onEnd, onNextSection }) {
  const q = practice.current;
  return <section className="content practice">
    <div className="practiceTop"><div><span className="tag">{grammar.title}</span><h2>选择题练习</h2></div><button className="ghost" onClick={onEnd}>随时结束练习</button></div>
    <article className="card question"><h3>{q.stem}</h3><div className="options">{q.options.map(opt => <button key={opt} disabled={practice.checked} className={practice.checked ? (opt === q.answer ? 'right' : opt === practice.selected ? 'wrong' : '') : ''} onClick={() => onSubmit(opt)}>{opt}</button>)}</div></article>
    {practice.checked && <article className="card answer"><h3>{practice.selected === q.answer ? <><CheckCircle2/> 回答正确</> : '回答错误'}</h3><p><b>题目翻译：</b>{q.translation}</p><p><b>正确答案：</b>{q.answer}</p><p><b>语法解析：</b>{q.explanation} 这道题考查的是「{grammar.title}」，做题时要先判断主语、时间标志或句子结构，再选择符合该语法规则的形式。</p><div className="actions"><button className="secondary" onClick={onNext}><RotateCcw size={18}/>继续随机练习</button><button className="primary" onClick={onNextSection}>进入下一小节语法</button></div></article>}
  </section>;
}

createRoot(document.getElementById('root')).render(<App />);
