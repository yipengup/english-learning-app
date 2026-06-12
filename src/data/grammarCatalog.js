function t(id, title, summary, mustKnow, mustUnderstand, commonTraps, examples = null) {
  return {
    id,
    title,
    summary,
    mustKnow,
    mustUnderstand,
    commonTraps,
    examples
  };
}

const groups = [
  {
    id: 'foundation',
    title: '01 入门地基：句子、词类与句子成分',
    description: '先建立词类、句子成分、句子类型和基本句型，解决“英语句子怎么搭起来”。',
    level: '入门',
    topics: [
      t('parts-of-speech', '词类总览', '认识名词、动词、形容词、副词、介词、连词、限定词等核心词类。', ['能判断一个词在具体句子中的词类', '能区分实词和功能词', '知道同一个词可能有多种词类'], ['词类不是由中文意思决定，而是由它在句子中的位置和功能决定。'], ['只按中文翻译判断词类', '把介词短语误当成完整谓语']),
      t('sentence-elements', '句子成分：主谓宾表定状补', '理解主语、谓语、宾语、表语、定语、状语、补语在句子里的功能。', ['能找出主语和谓语', '能区分宾语、表语和补语', '能识别定语和状语修饰对象'], ['英语句子必须围绕谓语动词组织，其他成分服务于谓语和名词。'], ['把中文话题当英文主语', '忽略谓语动词导致残缺句']),
      t('sentence-types', '句子类型：陈述、疑问、祈使、感叹', '掌握四类基本句子的语序和功能。', ['能区分句子交际功能', '能构造一般疑问句和特殊疑问句', '能识别祈使句省略主语 you'], ['句子类型影响词序、助动词位置和标点。'], ['疑问句忘记助动词提前', '感叹句 what/how 混用']),
      t('basic-sentence-patterns', '五大基本句型', '掌握 SV、SVO、SVC、SVOO、SVOC 五种英语句子骨架。', ['能把句子拆成五种骨架之一', '能判断动词后需要什么成分', '能用骨架检查句子是否完整'], ['五大句型本质是动词的搭配能力，不是固定翻译模板。'], ['及物动词缺宾语', '系动词后误用副词作表语']),
      t('be-verbs', 'Be 动词：am / is / are', '掌握英语最基础的系动词结构：主语 + be + 表语。', ['能根据主语选择 am/is/are', '能构造 be 句的否定和疑问', '能识别 be 后面的表语'], ['be 不表示具体动作，常用于身份、状态、位置、性质。'], ['I am agree', 'She be happy', 'be 与实义动词重复']),
      t('there-be', 'There be 句型', '表达“某处有某物/某人”，区分 there is 和 there are。', ['能根据真正主语选择 is/are', '能表达地点存在', '能构造否定和疑问'], ['there 是引导词，真正的主语通常在 be 后面。'], ['There has...', 'there be 与 have 混用', '忽略就近原则']),
      t('questions-negatives', '疑问句与否定句基础', '掌握 be、助动词、情态动词构成疑问和否定的核心规则。', ['能判断是否需要 do/does/did', '能把 be/情态动词提前构成疑问', '能正确放置 not'], ['英语疑问和否定通常依赖助动词系统。'], ['实义动词疑问句不加 do', 'did 后仍用过去式']),
      t('word-order-basics', '英语基本语序', '掌握主语—谓语—宾语以及状语位置的基本规律。', ['能按英文语序组织句子', '能放置时间、地点、频率状语', '能避免中文式倒装'], ['英语比中文更依赖固定语序表达语法关系。'], ['把时间状语插入主谓之间不当', '疑问句和陈述句语序混淆'])
    ]
  },
  {
    id: 'noun-system',
    title: '02 名词系统：名词短语、冠词、代词与限定词',
    description: '解决英语名词短语如何表达“一个、这个、这些、很多、我的、某些”。',
    level: '基础',
    topics: [
      t('nouns-countability', '名词可数与不可数', '区分 a book / water / advice 等可数与不可数用法。', ['能判断常见名词可数性', '能正确使用 a/an 和复数', '能识别抽象名词和物质名词'], ['可数性决定冠词、数量词和谓语一致。'], ['advice/information/equipment 加 s', '不可数名词前误用 a']),
      t('singular-plural', '名词单复数', '掌握规则复数、不规则复数以及单复数一致。', ['掌握 -s/-es/-ies 等规则', '掌握 child/children 等不规则', '能处理复合名词复数'], ['复数不仅是词尾变化，还会影响代词和主谓一致。'], ['people/person 混用', '单复数与谓语不一致']),
      t('articles', '冠词：a / an / the / 零冠词', '理解泛指、特指、首次提及和再次提及。', ['能区分泛指和特指', '能使用零冠词场景', '能处理独一无二事物和乐器等固定用法'], ['冠词表达说话人和听话人是否能共同识别该名词。'], ['中文无冠词导致漏冠词', 'the 与 a/an 随意替换']),
      t('determiners', '限定词总览', '掌握 this / that / some / any / each 等名词前限定成分。', ['能识别限定词位置', '能区分指示、数量、所有、分配限定词', '能避免多个限定词冲突'], ['限定词决定名词短语的范围和指向。'], ['my the book', 'these kind of 错误一致']),
      t('demonstratives', '指示限定词与指示代词', '掌握 this / that / these / those 的距离、数量和代词功能。', ['能根据远近和单复数选择形式', '能区分限定词和代词用法'], ['指示词同时表达物理距离、心理距离和篇章指代。'], ['this books', 'that 指代不清']),
      t('pronouns', '代词系统', '掌握人称代词、物主代词、反身代词、指示代词和不定代词。', ['能选择主格/宾格/所有格', '能使用反身代词', '能处理 everyone/something 等不定代词'], ['代词必须和先行词在人称、数、意义上匹配。'], ['Me and him are...', 'its/it’s 混淆']),
      t('quantifiers', '数量词：many / much / few / little / enough', '区分可数、不可数以及数量强弱。', ['能根据名词可数性选择 many/much', '能区分 few/a few 与 little/a little', '能使用 enough, plenty of, a number of'], ['数量词不仅表示多少，还表达说话人的态度。'], ['few 与 a few 意义相反', 'much 修饰可数名词']),
      t('possessives', "所有格：'s 与 of", "表达所属关系，区分 Tom's book 和 the door of the room。", ['能使用名词所有格', '能区分生命名词和无生命名词的常见表达', '能处理双重所有格'], ['所有关系可以表示拥有、关系、时间、用途等。'], ['the book of Tom 过度直译', '复数所有格位置错误']),
      t('apposition', '同位语', '用一个名词或名词短语解释另一个名词。', ['能识别同位语', '能使用逗号同位语', '能区分同位语和定语从句'], ['同位语是“再说一遍并解释”的结构。'], ['逗号使用不当', '把同位语误判为主谓结构'])
    ]
  },
  {
    id: 'verb-basics',
    title: '03 动词基础：动词类型、助动词与动词形式',
    description: '先理解动词本身，再进入完整时态系统。',
    level: '核心',
    topics: [
      t('verb-types', '动词类型：及物、不及物、系动词', '根据动词后能接什么成分判断句子结构。', ['能区分 vt/vi/linking verb', '能判断是否需要宾语', '能识别常见系动词'], ['动词类型决定句型，是时态和语态学习的前提。'], ['arrive 后直接接宾语', 'look 后形容词/副词误用']),
      t('stative-dynamic-verbs', '状态动词与动作动词', '区分 know, like, own 等状态动词和 run, write 等动作动词。', ['能判断动词是否通常用于进行时', '能理解状态动词用于进行时的特殊含义'], ['动词的意义类型影响能否使用进行体。'], ['I am knowing...', '状态动词绝对不能进行时的过度规则']),
      t('auxiliary-verbs', '助动词：be / do / have', '掌握 be、do、have 在疑问、否定、时态和语态中的作用。', ['能区分助动词和实义动词', '能使用 do 支撑否定疑问', '能用 have 构成完成时'], ['助动词是英语时态、疑问、否定和强调的骨架。'], ['Do you are...', 'have done 与 have 实义动词混淆']),
      t('verb-forms', '动词五种形式', '系统掌握原形、三单、过去式、过去分词、ing 形式。', ['能写出规则动词变化', '能识别不规则动词', '能区分过去式和过去分词'], ['动词形式是时态、语态、非谓语的共同基础。'], ['did 后用过去式', '过去分词当过去式使用']),
      t('subject-verb-agreement-core', '主谓一致基础', '掌握主语单复数和谓语形式的一致。', ['能判断真正主语', '能处理第三人称单数', '能识别倒装/介词短语干扰'], ['谓语形式跟主语一致，不跟离它最近的名词一致。'], ['The list of items are...', 'There be 就近原则误用']),
      t('imperatives', '祈使句', '用动词原形表达命令、请求、建议和说明。', ['能构造肯定/否定祈使句', '能理解省略主语 you', '能使用 let’s 表建议'], ['祈使句语气强弱取决于语境和礼貌标记。'], ['Don’t to do...', 'please 位置和标点不当']),
      t('tag-questions', '反意疑问句', '掌握前肯后否、前否后肯以及助动词匹配。', ['能选择正确附加问句', '能处理 be/情态/助动词', '能理解回答逻辑'], ['反意疑问句确认信息，附加部分取决于主句的助动词和极性。'], ['Yes/No 回答被中文逻辑干扰', 'hardly 等半否定词忽略'])
    ]
  },
  {
    id: 'tense-aspect',
    title: '04 时态系统：时间 × 状态/体',
    description: '完整掌握现在、过去、将来、过去将来与一般、进行、完成、完成进行的组合。',
    level: '核心',
    topics: [
      t('time-aspect-matrix', '时态总览：时间 × 状态/体', '用矩阵理解 4 个时间和 4 种状态组合出的 16 种时态结构。', ['能说出四个时间轴：现在、过去、将来、过去将来', '能说出四种体：一般、进行、完成、完成进行', '能理解时态表达的是时间关系和动作状态'], ['时态不是死背名称，而是“动作发生在哪个时间视角 + 动作处于什么状态”。'], ['把完成时理解成“完成了”而忽略与参照时间的关系', '把 will 当作唯一将来表达']),
      t('present-simple', '一般现在时', '表达习惯、事实、规律和稳定状态。', ['掌握主语三单变化', '掌握频率副词和时间标志', '能表达事实、习惯、安排'], ['一般现在时不是只表示“现在”，还表达稳定、重复和客观。'], ['第三人称单数漏 s', '用现在进行时表达所有现在情况']),
      t('present-continuous', '现在进行时', '表达此刻正在发生或当前阶段正在进行的动作。', ['掌握 am/is/are + doing', '能识别 now/at the moment 等标志', '能表达近期安排'], ['进行体强调动作在某一阶段内部展开。'], ['状态动词误用进行时', 'be 动词遗漏']),
      t('present-perfect', '现在完成时', '表达过去动作对现在的影响，或从过去持续到现在。', ['掌握 have/has + done', '能区分 since/for', '能表达经验、结果、持续'], ['现在完成时的参照点是现在，重点是过去与现在的联系。'], ['和一般过去时混用', 'since 后接时间段']),
      t('present-perfect-continuous', '现在完成进行时', '强调从过去持续到现在的动作过程。', ['掌握 have/has been doing', '能表达动作持续和近期痕迹', '能和现在完成时对比'], ['完成进行体强调“持续过程”，常带有动作还在继续或刚结束的感觉。'], ['只看 for/since 就机械选择', '忽略状态动词限制']),
      t('past-simple', '一般过去时', '表达过去某个时间发生并结束的动作或状态。', ['掌握规则和不规则过去式', '能识别 yesterday/last/in 2020 等过去时间', '能叙述过去事件'], ['一般过去时把事件放在过去时间框架内，不强调与现在的联系。'], ['过去时间出现却用现在完成时', 'did 后动词仍用过去式']),
      t('past-continuous', '过去进行时', '表达过去某一时刻正在进行的动作或背景。', ['掌握 was/were + doing', '能表达过去时间点正在发生', '能作故事背景'], ['过去进行时常用于“背景动作”，为另一个过去动作提供场景。'], ['when/while 机械套规则', '忽略短动作和长动作差异']),
      t('past-perfect', '过去完成时', '表达过去的过去，说明两个过去动作的先后。', ['掌握 had + done', '能找出过去参照点', '能表达先发生的过去动作'], ['过去完成时必须依赖另一个过去时间点作参照。'], ['没有过去参照点也乱用', '和一般过去时先后关系不清']),
      t('past-perfect-continuous', '过去完成进行时', '强调到过去某一时间为止一直在进行的动作。', ['掌握 had been doing', '能表达过去之前的持续过程', '能解释过去结果的原因'], ['它把完成进行体的参照点从现在移到过去。'], ['和过去进行时混淆', '忽略持续到过去参照点']),
      t('future-forms', '将来表达总览', '比较 will、be going to、be about to、be to、现在进行时表将来和一般现在时表安排。', ['能区分预测、计划、安排、临时决定', '能理解英语将来常靠结构表达', '能识别时间表用一般现在时'], ['学习层可以用“将来时”，理解层要知道英语将来表达不只 will。'], ['所有将来都用 will', 'be going to 和现在进行时表安排混淆']),
      t('future-simple', '一般将来时', '表达未来动作、预测、意愿或临时决定。', ['掌握 will + do', '掌握 be going to + do', '能根据语境选择将来结构'], ['一般将来关注未来事件本身，不强调过程或完成状态。'], ['will 与 be going to 完全等同', 'will 后加 to']),
      t('future-continuous', '将来进行时', '表达将来某一时间正在进行的动作或礼貌询问安排。', ['掌握 will be doing', '能描述未来时间点的进行状态', '能理解礼貌询问用法'], ['将来进行时把视角放到未来某一时刻的动作内部。'], ['和一般将来混用', 'be 遗漏']),
      t('future-perfect', '将来完成时', '表达到将来某一时间为止已经完成的动作。', ['掌握 will have done', '能识别 by + 将来时间', '能表达截止点前完成'], ['完成时的参照点可以放在未来。'], ['by then 出现却用一般将来', 'have done 中 done 形式错误']),
      t('future-perfect-continuous', '将来完成进行时', '表达到将来某一时间为止已经持续进行多久。', ['掌握 will have been doing', '能表达未来截止点前的持续过程', '能和将来完成时对比'], ['它强调持续时间，而不只是结果。'], ['结构过长导致漏 been', '只看完成而忽略进行含义']),
      t('future-in-the-past-simple', '过去将来时', '从过去视角看未来要发生的动作。', ['掌握 would do 和 was/were going to do', '能用于间接引语和过去叙述', '能表达过去计划'], ['过去将来不是现在的将来，而是“过去某时认为的未来”。'], ['把 would 只理解成“会/愿意”', '忽略过去参照点']),
      t('future-in-the-past-continuous', '过去将来进行时', '从过去视角看未来某时正在进行的动作。', ['掌握 would be doing', '能理解过去计划中的未来过程'], ['它把“进行”放在过去视角中的未来时间点。'], ['结构识别困难', '和过去进行时混淆']),
      t('future-in-the-past-perfect', '过去将来完成时', '从过去视角看未来某时已经完成的动作。', ['掌握 would have done', '能理解过去视角中的未来截止点'], ['常见于间接引语、虚拟和复杂叙述。'], ['和情态完成式混淆', '缺少过去视角']),
      t('future-in-the-past-perfect-continuous', '过去将来完成进行时', '从过去视角看未来某时已经持续进行多久。', ['掌握 would have been doing', '能理解四层结构：过去视角 + 将来 + 完成 + 进行'], ['这是完整矩阵中的高级结构，重点是识别和理解，不必过早追求大量输出。'], ['机械背结构但不找参照点', '误判为过去完成进行时']),
      t('tense-comparison', '时态综合辨析', '比较一般时、进行时、完成时、完成进行时在真实语境中的选择。', ['能根据时间标志和语境选择时态', '能解释时态意义差异', '能处理混合时态句子'], ['时态选择最终由语境决定，不是只靠关键词。'], ['看到 always 就选一般现在', '看到 for 就只选完成时'])
    ]
  },
  {
    id: 'modality-voice-mood',
    title: '05 情态、语态与语气',
    description: '表达能力、义务、推测、被动、条件和假设。',
    level: '进阶',
    topics: [
      t('modal-verbs', '情态动词总览', '表达能力、可能性、许可、建议、义务等语气。', ['掌握 can/may/must/should/would 等基本意义', '知道情态动词后接原形', '能区分义务、推测和建议'], ['情态动词表达说话人态度，不只是动作本身。'], ['情态动词后加 to', 'must 和 have to 完全等同']),
      t('ability-permission-obligation', '能力、许可与义务', '比较 can, could, may, must, have to, should。', ['能表达能力和许可', '能区分 must/have to/should', '能理解否定形式差异'], ['情态动词的否定往往不是简单反义。'], ['mustn’t 与 don’t have to 混淆', 'may 与 can 语域差异忽略']),
      t('modals-deduction', '情态动词表推测', '用 must/may/might/can’t 表达对现在或过去的推测。', ['能判断推测强弱', '能构造对现在和过去的推测', '能结合语境证据'], ['推测不是事实陈述，而是基于证据的判断。'], ['must 表“必须”和“肯定是”混淆', 'can’t have done 误解']),
      t('modal-perfect', '情态动词 + have done', '表达对过去的推测、遗憾或责备。', ['掌握 should have done, could have done, must have done', '能区分推测和责备', '能理解反事实意味'], ['have done 把情态意义指向过去。'], ['should have done 翻译成应该已经做了而忽略责备']),
      t('passive-voice', '被动语态', '当重点是动作承受者时，使用 be + 过去分词。', ['掌握各时态被动结构', '能判断动作承受者', '能决定是否保留 by 短语'], ['被动语态改变信息焦点，不只是中文“被”。'], ['用 have + done 当被动', '不及物动词误用被动']),
      t('passive-voice-advanced', '被动语态进阶', '处理双宾语、情态被动、短语动词被动和不定式被动。', ['能构造 modal + be done', '能处理 give/send/tell 双宾语被动', '能保留短语动词小品词'], ['被动结构必须保留动词搭配完整性。'], ['look after 中 after 丢失', '双宾语被动主语选择不清']),
      t('causative-have-get', '使役结构：have / get something done', '表达让别人完成某事或某事被处理。', ['掌握 have/get + object + done', '能区分主动使役和被动处理', '能表达服务场景'], ['该结构强调安排别人做，而不是主语亲自动作。'], ['have someone done 与 have something done 混淆']),
      t('conditionals', '条件句总览：零、一、二、三类', '系统掌握 if 条件句中的真实、可能和虚拟。', ['能区分真实条件和虚拟条件', '能掌握主从句时态搭配', '能理解条件与结果关系'], ['条件句本质是“条件是否可能/真实”的判断。'], ['if 从句乱用 will', '二三类条件句混淆']),
      t('mixed-conditionals', '混合条件句', '表达过去条件影响现在结果，或现在条件影响过去结果。', ['能识别时间错位', '能构造 had done + would do', '能解释反事实链条'], ['混合条件句重点是条件和结果不在同一时间层。'], ['按固定二/三类套而不看时间关系']),
      t('subjunctive-mood', '虚拟语气基础', '表达与事实相反、愿望、建议和假设。', ['掌握 wish/if only/as if', '掌握建议类 that 从句用动词原形', '能理解 were 虚拟'], ['虚拟语气表达“非事实”或“主观要求”。'], ['I wish I am...', 'suggest 后误用 should 必须出现']),
      t('reported-speech', '直接引语与间接引语', '掌握时态后移、人称变化、时间地点变化。', ['能把直接引语改为间接引语', '能处理疑问句语序', '能理解时态是否需要后移'], ['间接引语不是机械改时态，要看转述时信息是否仍然成立。'], ['间接疑问句仍用疑问语序', '所有时态都机械后移'])
    ]
  },
  {
    id: 'modifier-system',
    title: '06 修饰系统：形容词、副词、介词与比较',
    description: '让句子变得准确：描述性质、程度、方式、地点、时间和逻辑关系。',
    level: '基础',
    topics: [
      t('adjectives', '形容词用法', '掌握形容词作定语、表语及多个形容词排序。', ['能区分定语和表语形容词', '能掌握多个形容词大致顺序', '能识别 -ed/-ing 形容词'], ['形容词修饰名词或说明主语/宾语状态。'], ['interesting/interested 混淆', '形容词修饰动词']),
      t('adverbs', '副词用法', '表达方式、频率、程度、时间和地点。', ['能区分副词类型', '能正确放置频率副词', '能使用程度副词修饰形容词/副词'], ['副词可以修饰动词、形容词、副词甚至整句。'], ['good/well 混用', '频率副词位置错误']),
      t('comparatives-superlatives', '比较级与最高级', '比较两者、多者以及倍数表达。', ['掌握 -er/-est 和 more/most', '能使用 than/of/in', '能表达 as...as 和倍数'], ['比较结构必须明确比较对象和比较维度。'], ['比较对象不对等', 'more better 双重比较']),
      t('prepositions-place-time', '介词：时间与地点', '区分 at / in / on / by / during / for / since 等高频介词。', ['掌握时间介词基本图式', '掌握地点介词基本图式', '能区分 for/since/during'], ['介词表达关系，不要只按中文“在/到/为”翻译。'], ['in Monday', 'arrive to school']),
      t('prepositional-phrases', '介词短语', '理解介词短语作定语、状语和补语。', ['能识别介词短语边界', '能判断修饰对象', '能处理句末介词'], ['介词短语常造成长难句修饰关系难点。'], ['误把介词短语当谓语', '修饰对象判断错误']),
      t('phrasal-verbs', '短语动词', '掌握 look up、give up、turn on 等动词 + 小品词结构。', ['能区分可分和不可分短语动词', '能理解字面义和引申义', '能处理代词宾语位置'], ['短语动词是整体意义单位，不能只翻译单个动词。'], ['look it up 与 look up it 混淆']),
      t('modifiers-misplaced-dangling', '修饰语错位与悬垂结构', '避免修饰语放错位置导致句义错误。', ['能识别修饰对象', '能改正 misplaced modifier', '能避免 dangling participle'], ['修饰语必须靠近它修饰的对象。'], ['Walking down the street, the tree... 这类悬垂结构']),
      t('degree-intensifiers', '程度副词与强化表达', '掌握 very, too, enough, so, such, rather, quite 等。', ['能区分 too/enough', '能使用 so/such 结构', '能理解 quite/rather 语气'], ['程度副词改变评价强弱，有时改变句子含义。'], ['too 与 very 混用', 'so/such 结构不完整'])
    ]
  },
  {
    id: 'clause-system',
    title: '07 从句系统：名词从句、定语从句、状语从句',
    description: '把简单句变复杂句，是阅读长难句和写作升级的核心。',
    level: '高级',
    topics: [
      t('clause-overview', '从句总览', '理解从句为什么可以充当名词、形容词或副词功能。', ['能区分主句和从句', '能判断从句功能', '能识别连接词/关系词'], ['从句不是按引导词背，而是看它在主句中承担什么功能。'], ['只看到 that 就判定一种从句']),
      t('noun-clauses-subject-object', '名词性从句：主语从句与宾语从句', '掌握 that / whether / wh- 从句作主语和宾语。', ['能识别主语从句和宾语从句', '能处理形式主语 it', '能使用陈述语序'], ['名词性从句整体相当于一个名词。'], ['宾语从句用疑问语序', 'that 该省略与不该省略混淆']),
      t('noun-clauses-predicative-appositive', '名词性从句：表语从句与同位语从句', '掌握从句作表语以及解释抽象名词。', ['能区分表语从句和同位语从句', '能识别 fact/idea/news 后的同位语从句'], ['同位语从句解释名词内容，定语从句修饰名词范围。'], ['同位语从句和定语从句混淆']),
      t('relative-clauses-defining', '限制性定语从句', '用从句限定名词范围，关系词常为 who/which/that/where/when。', ['能选择关系代词/副词', '能判断先行词', '能理解关系词在从句中的成分'], ['限制性定语从句是名词身份不可缺少的一部分。'], ['关系词选择只看先行词不看从句缺什么成分']),
      t('relative-clauses-nondefining', '非限制性定语从句', '用逗号补充说明名词、整句或已知对象。', ['能使用逗号', '能区分 which 指代整句', '能避免 that 引导非限制性从句'], ['非限制性从句是补充信息，不限定范围。'], ['逗号遗漏', 'that 用在非限制性定语从句']),
      t('relative-pronoun-omission', '关系词省略', '判断定语从句中 that / which / who 何时可以省略。', ['能判断关系词是否作宾语', '能区分主语关系词不可省', '能理解省略后的句子结构'], ['省略关系词后，从句仍然有完整语法关系。'], ['主语关系词误省略']),
      t('adverbial-clauses-time', '时间状语从句', '掌握 when / while / before / after / until / as soon as。', ['能区分 when/while', '能掌握主将从现', '能表达先后关系'], ['时间从句建立两个动作的时间关系。'], ['as soon as 后用 will', 'until 与 not...until 混淆']),
      t('adverbial-clauses-reason-result-purpose', '原因、结果、目的状语从句', '掌握 because / since / so that / so...that / in order that。', ['能区分原因、结果、目的', '能使用 so that 表目的或结果', '能识别 because 和 so 不宜重复'], ['逻辑连接词表达句子之间的因果和目的关系。'], ['Because...so... 中式重复']),
      t('adverbial-clauses-condition-concession', '条件、让步与对比状语从句', '掌握 if / unless / although / even though / whereas。', ['能区分条件和让步', '能使用 unless', '能表达对比关系'], ['让步表示“虽然如此，主句仍成立”。'], ['although 和 but 重复', 'unless 与 if...not 混淆']),
      t('adverbial-clauses-manner-comparison', '方式与比较状语从句', '掌握 as / as if / than / as...as 等结构。', ['能识别方式从句', '能构造比较从句', '能理解省略比较结构'], ['比较从句常省略重复成分，但逻辑对象必须一致。'], ['比较对象不平行']),
      t('reduced-clauses', '从句简化', '把部分从句压缩成分词短语、不定式或介词短语。', ['能判断主语一致时可简化', '能区分主动 doing 和被动 done', '能理解时间/原因/条件简化'], ['简化从句不是随意省略，而是保留逻辑关系。'], ['主语不一致导致悬垂分词'])
    ]
  },
  {
    id: 'nonfinite',
    title: '08 非谓语动词：不定式、动名词、分词',
    description: '解决一个句子里出现多个动词时如何处理。',
    level: '高级',
    topics: [
      t('nonfinite-overview', '非谓语总览', '理解 to do、doing、done 为什么能表达动作却不作谓语。', ['能区分谓语和非谓语', '能判断非谓语功能', '能理解逻辑主语'], ['一个简单句通常只有一个核心谓语，其他动作要非谓语化或从句化。'], ['一个句子堆多个谓语动词']),
      t('infinitives', '不定式：to do', '掌握作主语、宾语、目的状语、定语和补语。', ['能识别不定式功能', '能掌握常接 to do 的动词', '能使用不定式表目的'], ['不定式常带有未发生、目的、具体动作的意味。'], ['to 后加动词 ing', '省 to 不定式场景混淆']),
      t('bare-infinitive', '不带 to 的不定式', '掌握情态动词、使役动词、感官动词后的动词原形。', ['能使用 make/let/have + do', '能使用 see/hear/watch + do', '能理解被动时 to 回来'], ['bare infinitive 常出现在特殊动词搭配后。'], ['被动 make 后漏 to']),
      t('gerunds', '动名词：doing', '掌握 doing 作名词性成分，以及常接 gerund 的动词。', ['能让 doing 作主语/宾语', '掌握 enjoy/avoid/finish 等后接 doing', '能区分介词后 doing'], ['动名词把动作名词化，表示活动或概念。'], ['介词后接原形', 'avoid to do']),
      t('participles', '分词：doing / done', '掌握现在分词和过去分词作定语、状语和补语。', ['能区分主动 doing 和被动/完成 done', '能识别分词作定语和状语', '能判断逻辑主语'], ['分词表达动作与名词/主语之间的主动或被动关系。'], ['surprising/surprised 混淆', '逻辑主语错位']),
      t('infinitive-vs-gerund', 'to do 与 doing 辨析', '比较 remember to do / remember doing 等常见差异。', ['掌握 remember/forget/stop/try/regret 后差异', '能解释意义变化', '能根据语境选择'], ['to do 常偏向未发生或目的，doing 常偏向已发生或活动本身。'], ['只背固定搭配不看意义']),
      t('nonfinite-perfect-passive', '非谓语的完成式与被动式', '掌握 to have done、having done、being done、done 等结构。', ['能表达非谓语动作先于谓语', '能表达被动关系', '能识别完成被动'], ['非谓语也有时间先后和主被动关系。'], ['having done 与 doing 混用', 'being done 和 done 区别不清']),
      t('absolute-construction', '独立主格结构', '理解名词/代词 + 分词/形容词/介词短语的高级表达。', ['能识别独立主格', '能理解其逻辑主语不同于主句主语', '能用于书面阅读理解'], ['独立主格是压缩状语从句的高级结构。'], ['误认为完整句子', '逗号和逻辑关系忽略'])
    ]
  },
  {
    id: 'syntax-advanced',
    title: '09 句法提升：并列、倒装、强调、省略与一致',
    description: '从“正确”走向“高级、地道、书面化”。',
    level: '高级',
    topics: [
      t('coordination', '并列结构', '掌握 and / but / or / so / yet 连接词、短语和句子。', ['能连接同级成分', '能区分并列连词和从属连词', '能使用相关并列结构'], ['并列要求语法层级相同。'], ['连接不同层级成分', '逗号拼接完整句']),
      t('parallelism', '平行结构', '保持语法形式一致，让表达更清晰。', ['能保持词性和结构一致', '能处理 not only...but also', '能修改不平行句子'], ['平行结构是写作清晰度的重要规则。'], ['to do, doing, noun 混杂并列']),
      t('inversion', '倒装句', '掌握否定词前置、only 前置、so/neither 倒装等结构。', ['能识别全部倒装和部分倒装', '能处理否定副词前置', '能使用 so/neither 表示同样情况'], ['倒装通常用于强调、衔接或语法要求。'], ['否定词前置后不倒装', 'only 修饰主语时误倒装']),
      t('emphasis', '强调句与强调结构', '掌握 It is/was...that... 以及 do 强调。', ['能识别强调句', '能强调主语/宾语/状语', '能区分强调句和定语从句'], ['强调句通过结构突出信息焦点。'], ['It is...that 与形式主语混淆']),
      t('ellipsis', '省略结构', '理解重复信息省略，提升阅读复杂句能力。', ['能识别并列省略', '能理解比较结构省略', '能补全省略信息'], ['省略建立在语境可恢复的基础上。'], ['把省略结构误判为残缺句']),
      t('agreement', '主谓一致进阶', '掌握单复数主语、就近原则、集合名词等一致规则。', ['能处理 each/every/either/neither', '能处理集合名词', '能处理 there be 和倒装句'], ['一致规则看真正主语和意义单复数。'], ['插入语干扰', 'or/nor 就近原则忽略']),
      t('substitution', '替代结构：one / ones / do so / so / not', '用替代避免重复，提升阅读和写作理解。', ['能识别名词替代 one/ones', '能使用 do so 替代动作', '能理解 so/not 替代从句'], ['替代和省略都服务于信息经济。'], ['one 指代不可数名词', 'do so 指代不清']),
      t('information-structure', '信息结构：旧信息与新信息', '理解英语如何安排重点、焦点和已知信息。', ['能理解句首衔接功能', '能识别强调位置', '能调整句子焦点'], ['语法结构常服务于信息组织，而非单纯形式变化。'], ['所有句子都按中文话题顺序直译'])
    ]
  },
  {
    id: 'writing-grammar',
    title: '10 写作语法与句子边界',
    description: '面向考试、写作和真实表达的语法准确性。',
    level: '综合',
    topics: [
      t('punctuation', '标点与句子边界', '掌握逗号、分号、冒号、引号及避免逗号拼接。', ['能区分逗号和分号', '能识别完整句边界', '能使用冒号引出解释'], ['英文标点参与句法组织，不只是停顿。'], ['comma splice', 'because 从句单独成句']),
      t('fragments-runons', '残缺句与流水句', '识别 fragment、run-on sentence 和 comma splice。', ['能判断句子是否有主谓', '能修复流水句', '能把从句接入主句'], ['完整句必须有独立主谓结构。'], ['中文语感导致句子边界模糊']),
      t('sentence-combining', '合并句子', '用并列、从句、非谓语和标点把短句合成自然长句。', ['能选择合并方式', '能保持逻辑关系', '能避免过度堆叠'], ['合并句子的核心是逻辑关系，不是越长越好。'], ['滥用 which/that', '多个从句无层级']),
      t('cohesion-transitions', '衔接与过渡', '掌握 however, therefore, moreover, for example 等连接副词。', ['能区分连接副词和连词', '能使用标点配合连接副词', '能表达转折、因果、递进、举例'], ['连接副词连接意义，不等同于并列连词。'], ['两个完整句只用 however 逗号连接']),
      t('common-errors', '高频语法易错点综合', '集中训练中式英语、搭配、冠词、介词和时态混用。', ['能识别中式英语常见结构', '能归类错误原因', '能用语法规则修正'], ['综合改错要先判断错误类型，再修改形式。'], ['凭语感乱改', '只看单词不看句子结构']),
      t('exam-grammar-review', '考试语法综合复习', '面向选择题、完形、阅读长难句和写作改错的综合训练。', ['能综合判断词法、句法、时态和从句', '能解释选项为什么错', '能把知识迁移到阅读写作'], ['考试题通常测试多个语法点交叉。'], ['只记答案不复盘原因'])
    ]
  },
  {
    id: 'reading-long-sentences',
    title: '11 阅读长难句分析',
    description: '把词法、句法、从句和非谓语综合应用到阅读理解。',
    level: '综合',
    topics: [
      t('long-sentence-core', '长难句主干提取', '先找主谓宾/主系表，再处理修饰和插入。', ['能找到主句主干', '能剥离介词短语和从句', '能识别并列主干'], ['长句理解的第一步是找谓语动词和主干。'], ['被插入语和定语从句干扰']),
      t('nested-clauses', '多层嵌套从句', '理解从句中再套从句的层级关系。', ['能标记从句边界', '能判断每层从句功能', '能逐层翻译'], ['嵌套从句要按层级解析，不能线性硬翻。'], ['that/which 多次出现时关系混乱']),
      t('insertions-parentheses', '插入语与同位解释', '识别逗号、破折号、括号中的补充信息。', ['能判断插入语可暂时跳过', '能识别同位解释', '能恢复主干'], ['插入语通常不影响主干语法。'], ['把插入语当主句谓语']),
      t('logical-connectors', '逻辑连接与篇章关系', '掌握转折、因果、递进、让步、条件等篇章信号。', ['能识别逻辑连接词', '能判断句间关系', '能服务阅读题定位'], ['阅读理解常考逻辑关系，不只考词义。'], ['however/therefore 关系误判'])
    ]
  },
  {
    id: 'usage-style',
    title: '12 用法、语域与综合输出',
    description: '从会做题走向会理解、会表达、会写作。',
    level: '综合',
    topics: [
      t('formal-informal-register', '正式与非正式表达', '理解口语、书面语、学术表达中的语法选择。', ['能区分正式/非正式结构', '能避免口语化写作错误', '能理解缩写和省略的语域'], ['同一意思在不同语境下可能需要不同语法结构。'], ['考试写作中过度口语化']),
      t('collocation-grammar', '搭配中的语法', '掌握 depend on, be interested in, have difficulty doing 等搭配结构。', ['能识别动词/形容词/名词搭配', '能记忆搭配后接介词或动名词', '能避免逐词翻译'], ['很多语法选择来自固定搭配。'], ['difficulty to do', 'discuss about']),
      t('grammar-in-writing', '写作中的语法选择', '把时态、从句、非谓语和连接结构用于段落表达。', ['能根据写作目的选择时态', '能用从句和非谓语压缩信息', '能保持句式多样但清晰'], ['写作语法的目标是清楚、准确、自然。'], ['为了高级而堆复杂句']),
      t('grammar-review-map', '语法知识地图复盘', '按词法、句法、时态、从句、非谓语、写作重新梳理全体系。', ['能把知识点归类', '能发现薄弱模块', '能制定复习路径'], ['语法学习最终要形成知识网络，而不是孤立规则。'], ['只按章节顺序背，不会跨模块联系'])
    ]
  }
];

const examplesByGroup = {
  foundation: [
    ['The young teacher explained the rule clearly.', '那位年轻老师清楚地解释了这条规则。', 'The young teacher 是主语，explained 是谓语动词，the rule 是宾语，clearly 是方式状语。'],
    ['Does she like English?', '她喜欢英语吗？', '一般疑问句把助动词 does 放到主语前，实义动词 like 恢复原形。']
  ],
  'noun-system': [
    ['I bought a book, and the book is about grammar.', '我买了一本书，那本书是关于语法的。', '第一次提到用 a book，再次提到用 the book。'],
    ['She gave me some advice.', '她给了我一些建议。', 'advice 是不可数名词，不能说 advices。']
  ],
  'verb-basics': [
    ['She enjoys reading novels.', '她喜欢读小说。', 'enjoy 是及物动词，后面常接动名词 reading 作宾语。'],
    ['The soup tastes delicious.', '这汤尝起来很美味。', 'tastes 是系动词，后面接形容词 delicious 作表语。']
  ],
  'tense-aspect': [
    ['I study English every day.', '我每天学习英语。', 'every day 表示习惯，用一般现在时。'],
    ['She has lived here for five years.', '她已经在这里住了五年。', 'for five years 表示从过去持续到现在，用现在完成时。']
  ],
  'modality-voice-mood': [
    ['You should review the lesson.', '你应该复习这一课。', 'should 表示建议，后面接动词原形 review。'],
    ['The letter was written yesterday.', '这封信是昨天写的。', 'letter 是动作承受者，用 was written 表达被动。']
  ],
  'modifier-system': [
    ['She speaks English fluently.', '她英语说得很流利。', 'fluently 是副词，修饰 speaks。'],
    ['The book on the desk is mine.', '桌上的那本书是我的。', 'on the desk 是介词短语，修饰 The book。']
  ],
  'clause-system': [
    ['I know that he is honest.', '我知道他很诚实。', 'that he is honest 是宾语从句，作 know 的宾语。'],
    ['The book that I bought is useful.', '我买的那本书很有用。', 'that I bought 是定语从句，修饰 The book。']
  ],
  nonfinite: [
    ['I want to improve my grammar.', '我想提高语法。', 'want 是谓语，to improve 是不定式作宾语。'],
    ['Learning grammar takes time.', '学习语法需要时间。', 'Learning grammar 是动名词短语作主语。']
  ],
  'syntax-advanced': [
    ['She likes reading, writing, and speaking English.', '她喜欢读英语、写英语和说英语。', 'reading、writing、speaking 保持平行结构。'],
    ['Never have I seen such a beautiful place.', '我从未见过这么美的地方。', '否定词 Never 置于句首，引起部分倒装。']
  ],
  'writing-grammar': [
    ['Because I was tired, I went home early.', '因为我累了，所以我早早回家了。', 'Because 从句不能单独成句，后面需要主句。'],
    ['I like grammar; it helps me write clearly.', '我喜欢语法；它帮助我写得更清楚。', '两个完整句子关系紧密时，可以用分号连接。']
  ],
  'reading-long-sentences': [
    ['The book that you recommended last week has helped me a lot.', '你上周推荐的那本书帮了我很多。', '主干是 The book has helped me，that you recommended last week 是定语从句。'],
    ['Although the sentence looks long, its main structure is simple.', '虽然这个句子看起来很长，但它的主干结构很简单。', 'Although 引导让步状语从句，主句是 its main structure is simple。']
  ],
  'usage-style': [
    ['I am writing to ask for more information.', '我写信是想询问更多信息。', '正式写作中常用 I am writing to... 表达目的。'],
    ['She is good at solving grammar problems.', '她擅长解决语法问题。', 'be good at 后接名词或动名词 solving。']
  ]
};

const sectionIntro = {
  foundation: '学习英语语法不要先背术语，而要先判断它在句子中承担什么功能：表达身份、动作、关系、数量，还是补充时间、地点、原因等信息。',
  'noun-system': '名词系统的核心是构造名词短语。名词短语经常充当主语、宾语、表语或介词宾语。',
  'verb-basics': '动词决定句子骨架。先掌握动词类型、助动词、动词形式，才能真正理解时态、语态和非谓语。',
  'tense-aspect': '时态系统应按“时间 × 状态/体”学习：现在、过去、将来、过去将来，与一般、进行、完成、完成进行组合。',
  'modality-voice-mood': '这一组语法表达说话人的态度、动作承受关系，以及真实或非真实的条件和假设。',
  'modifier-system': '修饰系统让句子在性质、程度、方式、地点、时间和逻辑关系上更准确。',
  'clause-system': '从句可以充当名词、形容词或副词的功能，是阅读长难句和写作升级的核心。',
  nonfinite: '一个简单句通常只有一个谓语动词。当需要再表达一个动作时，常用 to do、doing 或 done。',
  'syntax-advanced': '并列、平行、倒装、强调、省略和一致规则能让句子更清晰、更自然，也常出现在考试长难句中。',
  'writing-grammar': '写作语法关注句子边界、标点、衔接和真实输出，目标是把选择题能力迁移到写作。',
  'reading-long-sentences': '长难句学习把词法、时态、从句、非谓语和逻辑连接综合起来，服务阅读理解。',
  'usage-style': '语法最终要服务真实表达。语域、搭配和写作选择决定句子是否自然、准确、得体。'
};

const flatTopicTuples = groups.flatMap(group => group.topics.map(topic => ({ group, topic })));

function listText(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join(' ');
}

function topicToLesson(group, topic) {
  const currentIndex = flatTopicTuples.findIndex(item => item.topic.id === topic.id);
  const nextId = flatTopicTuples[currentIndex + 1]?.topic.id || null;
  const examples = topic.examples || examplesByGroup[group.id] || examplesByGroup.foundation;

  return {
    id: topic.id,
    level: group.level,
    track: group.title,
    categoryId: group.id,
    categoryTitle: group.title,
    categoryDescription: group.description,
    title: topic.title,
    summary: topic.summary,
    mustKnow: topic.mustKnow,
    mustUnderstand: topic.mustUnderstand,
    commonTraps: topic.commonTraps,
    nextId,
    sections: [
      {
        heading: `1. 核心定位：${topic.title}`,
        body: `${topic.summary} ${sectionIntro[group.id] || sectionIntro.foundation}`,
        examples: examples.map(([en, zh, note]) => ({ en, zh, note }))
      },
      {
        heading: '2. 必须掌握',
        body: listText(topic.mustKnow),
        examples: [
          { en: examples[0][0], zh: examples[0][1], note: `观察这个例句时，先确认它对应的结构或功能：${topic.mustKnow[0]}` },
          { en: examples[1][0], zh: examples[1][1], note: `练习时不要只翻译中文，要回到「${topic.title}」的形式和语境。` }
        ]
      },
      {
        heading: '3. 必须理解',
        body: listText(topic.mustUnderstand),
        examples: [
          { en: examples[0][0], zh: examples[0][1], note: topic.mustUnderstand[0] },
          { en: examples[1][0], zh: examples[1][1], note: `理解层面的目标是能解释为什么这里需要「${topic.title}」，而不是只选出答案。` }
        ]
      },
      {
        heading: '4. 高频易错点',
        body: listText(topic.commonTraps),
        examples: [
          { en: examples[0][0], zh: examples[0][1], note: `做题时重点排查：${topic.commonTraps[0]}` },
          { en: examples[1][0], zh: examples[1][1], note: '错题复习时，要把错误归类到结构、意义、词序、搭配或语境判断中。' }
        ]
      },
      {
        heading: '5. 练习建议',
        body: `开始练习「${topic.title}」前，先用 10 秒判断：它属于哪个模块、考察形式是什么、句子主干在哪里、选项差异对应哪个语法意义。练习系统会优先抽取未做题；全部完成后会优先抽取错题。`,
        examples: [
          { en: examples[0][0], zh: examples[0][1], note: '先找主干，再看标志词、搭配和语义关系。' },
          { en: examples[1][0], zh: examples[1][1], note: '答案解析应能说明中文意思、结构原因和其他选项为什么不合适。' }
        ]
      }
    ]
  };
}

export const grammarGroups = groups.map(group => ({
  id: group.id,
  title: group.title,
  description: group.description,
  level: group.level,
  topics: group.topics.map(topic => topicToLesson(group, topic))
}));

export const grammarCatalog = grammarGroups.flatMap(group => group.topics);
