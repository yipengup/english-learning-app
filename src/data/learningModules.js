import { grammarCatalog, grammarGroups } from './grammarCatalog';

export const MODULE_STATUS = {
  ACTIVE: 'active',
  COMING_SOON: 'coming-soon',
  PLANNED: 'planned'
};

export const learningModules = [
  {
    id: 'grammar',
    title: '语法',
    shortTitle: '语法',
    description: '系统掌握英语语法体系，打好阅读、写作和表达的结构基础。',
    status: MODULE_STATUS.ACTIVE,
    catalog: grammarCatalog,
    groups: grammarGroups,
    entryLabel: '继续语法学习'
  },
  {
    id: 'reading',
    title: '阅读',
    shortTitle: '阅读',
    description: '未来将覆盖分级阅读、文章精读、长难句分析、词汇标注和阅读理解训练。',
    status: MODULE_STATUS.COMING_SOON,
    catalog: [],
    groups: [],
    entryLabel: '阅读模块建设中'
  },
  {
    id: 'vocabulary',
    title: '词汇',
    shortTitle: '词汇',
    description: '未来将覆盖主题词汇、词根词缀、例句记忆和复习计划。',
    status: MODULE_STATUS.PLANNED,
    catalog: [],
    groups: [],
    entryLabel: '词汇模块规划中'
  },
  {
    id: 'writing',
    title: '写作',
    shortTitle: '写作',
    description: '未来将覆盖句子升级、段落表达、语法纠错和写作模板训练。',
    status: MODULE_STATUS.PLANNED,
    catalog: [],
    groups: [],
    entryLabel: '写作模块规划中'
  }
];

export function getLearningModule(moduleId) {
  return learningModules.find(module => module.id === moduleId) || learningModules[0];
}

export function getModuleStatusLabel(status) {
  if (status === MODULE_STATUS.ACTIVE) return '已开放';
  if (status === MODULE_STATUS.COMING_SOON) return '即将开放';
  return '规划中';
}
