export interface Choice {
  label: string;
  description: string;
  value: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  nextStorySnippet: string;
}

export interface Scene {
  id: string;
  chapter: 1 | 2 | 3 | 4;
  dimension: "EI" | "SN" | "TF" | "JP";
  storyText: string;
  leftChoice: Choice;
  rightChoice: Choice;
}

export interface ChapterInfo {
  number: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  dimension: "EI" | "SN" | "TF" | "JP";
}

export const chapters: ChapterInfo[] = [
  {
    number: 1,
    title: "旅程的开始",
    subtitle: "你在陌生的大陆上苏醒，一切从这里开始",
    dimension: "EI",
  },
  {
    number: 2,
    title: "迷雾森林",
    subtitle: "真相藏在迷雾之后，你会如何寻找答案",
    dimension: "SN",
  },
  {
    number: 3,
    title: "王城风云",
    subtitle: "权力与情感交织，你必须做出抉择",
    dimension: "TF",
  },
  {
    number: 4,
    title: "命运之战",
    subtitle: "最终时刻来临，你将如何面对未知",
    dimension: "JP",
  },
];

export const scenes: Scene[] = [
  // ===== 第一章：旅程的开始 (E/I) =====
  {
    id: "1-1",
    chapter: 1,
    dimension: "EI",
    storyText:
      "你在一片星光点点的草原上醒来，身旁只有一个旧背包。远处传来篝火旁的笑声和歌谣，温暖的光芒在夜色中摇曳。你的心跳逐渐加速——这是一个完全陌生的世界。",
    leftChoice: {
      label: "走向篝火",
      description: "那里有人，有温暖，也许能找到答案",
      value: "E",
      nextStorySnippet:
        "你朝着火光走去。围坐的旅人们看到你，露出友善的笑容，为你腾出一个位置。一位老者递来热汤，说道：「又一位被命运召唤的旅人。」",
    },
    rightChoice: {
      label: "独自探索",
      description: "先观察四周环境，弄清楚自己身在何处",
      value: "I",
      nextStorySnippet:
        "你悄悄绕开篝火，独自走向高处的山丘。从那里你看到了整片大陆的轮廓——远方有森林、城池和一座被云雾笼罩的高塔。你在心中默默画出一条路线。",
    },
  },
  {
    id: "1-2",
    chapter: 1,
    dimension: "EI",
    storyText:
      "第二天清晨，你来到一个热闹的边境小镇。集市上商贩吆喝声此起彼伏，冒险者公会的告示板前围满了人。你需要了解这个世界的情况。",
    leftChoice: {
      label: "到酒馆搭话",
      description: "和冒险者们聊聊，消息最灵通的地方一定是酒馆",
      value: "E",
      nextStorySnippet:
        "你推开酒馆的门，很快就和一桌冒险者混熟了。他们告诉你，北方的迷雾森林中藏着一件神器，而王城正在悬赏寻找它。你决定加入他们的讨论。",
    },
    rightChoice: {
      label: "去图书馆查阅",
      description: "与其道听途说，不如找到可靠的文献记录",
      value: "I",
      nextStorySnippet:
        "你找到了小镇角落的旧图书馆。在泛黄的卷轴中，你发现了一幅古老的地图，上面标注着迷雾森林深处的神秘遗迹。这是其他冒险者不知道的秘密。",
    },
  },
  {
    id: "1-3",
    chapter: 1,
    dimension: "EI",
    storyText:
      "你决定前往迷雾森林。在小镇门口，几位冒险者正在组队，他们向你挥手：「一起走吧，路上有个伴总比孤身一人安全！」森林的方向升起了淡淡的雾气。",
    leftChoice: {
      label: "加入队伍",
      description: "人多力量大，一起走能互相照应",
      value: "E",
      nextStorySnippet:
        "你加入了这支五人小队。一路上大家分享着各自的故事和传说，笑声驱散了旅途的疲惫。队长拍着你的肩说：「有你在真好。」你感到了旅途的温暖。",
    },
    rightChoice: {
      label: "独自上路",
      description: "一个人走得更快，也能按自己的节奏行动",
      value: "I",
      nextStorySnippet:
        "你微笑着婉拒了邀请，独自踏上了通往森林的小路。清晨的空气沁人心脾，你享受着这份宁静，脑海中整理着收集到的所有线索。",
    },
  },

  // ===== 第二章：迷雾森林 (S/N) =====
  {
    id: "2-1",
    chapter: 2,
    dimension: "SN",
    storyText:
      "迷雾森林入口处，两条路出现在你面前。左边的路有清晰的脚印和砍过的标记，显然有人走过；右边的路被藤蔓遮蔽，但你隐约感觉到一股奇异的力量从那个方向传来。",
    leftChoice: {
      label: "走有标记的路",
      description: "有人走过的路更安全，跟着标记不会迷路",
      value: "S",
      nextStorySnippet:
        "你沿着标记稳步前行。这条路虽然平凡，但每一步都踏实可靠。你注意到路边有采药人留下的记号，甚至找到了一个隐藏的补给点。",
    },
    rightChoice: {
      label: "跟随直觉",
      description: "那股力量在召唤你，也许那里藏着真正的秘密",
      value: "N",
      nextStorySnippet:
        "你拨开藤蔓，踏入了未知。那股力量越来越强烈，树木开始发出微弱的荧光。你意识到这不是一片普通的森林——它有自己的意识。",
    },
  },
  {
    id: "2-2",
    chapter: 2,
    dimension: "SN",
    storyText:
      "森林深处，你发现了一座古老的石碑。石碑上刻着密密麻麻的文字和符号。旁边的地面上散落着一些发光的碎片，似乎是某件器物的残骸。",
    leftChoice: {
      label: "仔细研究碎片",
      description: "这些实物可能藏着重要的线索，先看看材质和构造",
      value: "S",
      nextStorySnippet:
        "你蹲下来仔细检查每一块碎片。通过拼接和观察纹路，你发现这是一面古老镜子的残片。碎片边缘仍然锋利，工艺精湛到不像是这个时代的产物。",
    },
    rightChoice: {
      label: "解读石碑符号",
      description: "那些符号一定在讲述一个更大的故事",
      value: "N",
      nextStorySnippet:
        "你凝视着石碑上的符号，脑海中突然闪过一个画面——这些符号讲述的是一个关于「灵魂之镜」的预言。据说持镜者能看透一切虚妄，直抵真实的自我。",
    },
  },
  {
    id: "2-3",
    chapter: 2,
    dimension: "SN",
    storyText:
      "前方出现了一片幻象区域——空气中浮现出各种虚幻的景象：金碧辉煌的宫殿、无尽的宝藏、故乡的风景。一只银色的狐狸出现在你面前说：「选择你最想看到的真实。」",
    leftChoice: {
      label: "「我只相信眼前的现实」",
      description: "闭上眼睛，用其他感官感受真实的道路",
      value: "S",
      nextStorySnippet:
        "你闭上眼睛，用手触摸树干、用脚感受地面、用耳朵辨别水声的方向。幻象对你失去了作用。银狐赞许地点头：「脚踏实地者，不会被迷雾吞噬。」",
    },
    rightChoice: {
      label: "「我想看到这片森林的本质」",
      description: "既然有幻象，就说明表面之下藏着更深的真相",
      value: "N",
      nextStorySnippet:
        "幻象纷纷碎裂，你看到了森林的真正面目——这是一座巨大的活体生物，树木是它的血管，迷雾是它的呼吸。银狐微笑：「能看到本质的人，才有资格见到灵魂之镜。」",
    },
  },

  // ===== 第三章：王城风云 (T/F) =====
  {
    id: "3-1",
    chapter: 3,
    dimension: "TF",
    storyText:
      "你带着从森林中获得的线索来到了王城。城中正发生一场争议：国王要征收重税修建城墙抵御北方的魔物，而平民已经苦不堪言。一位大臣请你作为外来者给出公正的意见。",
    leftChoice: {
      label: "支持修建城墙",
      description: "魔物威胁是真实的，长远来看城墙能保护所有人",
      value: "T",
      nextStorySnippet:
        "你条理清晰地分析了魔物入侵的概率和不设防的代价。大臣频频点头，国王下令调整税制——不再均摊，而是按财力分级征收。你的建议既务实又公平。",
    },
    rightChoice: {
      label: "替百姓求情",
      description: "再正确的决策，如果让百姓活不下去，就没有意义",
      value: "F",
      nextStorySnippet:
        "你讲述了路上看到的百姓艰辛生活的故事。你说：「城墙保护的不是城池，是城中的人。如果人心散了，再坚固的城墙也没有意义。」国王沉思良久，决定先赈灾再筑城。",
    },
  },
  {
    id: "3-2",
    chapter: 3,
    dimension: "TF",
    storyText:
      "王城地牢里关着一个年轻人。他偷了贵族的面包去喂养孤儿，按律当处以重刑。你无意中发现了这件事。狱卒认出你是国王的座上客，问你觉得该如何处置。",
    leftChoice: {
      label: "依法处置但争取减刑",
      description: "法律不能因为动机善良就被打破，但可以在量刑上从轻",
      value: "T",
      nextStorySnippet:
        "你向法官提交了一份陈情书，引用了三条可以从轻处罚的律例。年轻人被改判为社区劳动。你相信，维护法律的尊严和同情心并不矛盾。",
    },
    rightChoice: {
      label: "想办法帮他脱罪",
      description: "为了喂养孤儿而受罚，这不公平",
      value: "F",
      nextStorySnippet:
        "你找到了那位贵族，说服他撤回指控——「这些面包的价值，远不如您因为宽容而获得的美名。」贵族最终同意了，还额外捐赠了一笔钱给孤儿院。",
    },
  },
  {
    id: "3-3",
    chapter: 3,
    dimension: "TF",
    storyText:
      "灵魂之镜的最后一块碎片就在王宫的宝库中。国王愿意给你，但条件是你必须留下来担任王城的首席顾问。你的旅伴（如果有的话）或独自旅行的自由，都在等着你。",
    leftChoice: {
      label: "谈判一个折中方案",
      description: "也许可以先完成任务再回来，不必非此即彼",
      value: "T",
      nextStorySnippet:
        "你提出了一个精巧的方案：先借走碎片完成灵魂之镜，之后每年回王城担任三个月的客座顾问。国王被你的逻辑和诚意打动，欣然同意。",
    },
    rightChoice: {
      label: "答应留下",
      description: "这里的人需要你，你不忍心让他们失望",
      value: "F",
      nextStorySnippet:
        "你看着城中那些因为你的帮助而重拾希望的面孔，心中一软。「好，我留下。」国王郑重地将碎片交到你手中：「王城有你，是我们的福气。」",
    },
  },

  // ===== 第四章：命运之战 (J/P) =====
  {
    id: "4-1",
    chapter: 4,
    dimension: "JP",
    storyText:
      "灵魂之镜终于完整了。然而，北方的魔物大军比预想中来得更快。你只有三天时间准备。所有人都在看着你——你会如何安排这最后的时间？",
    leftChoice: {
      label: "制定详细作战计划",
      description: "列出时间线、分配任务、确保每个人知道自己该做什么",
      value: "J",
      nextStorySnippet:
        "你通宵达旦地绘制了作战地图，将守军分成六个小队，每队都有明确的职责和撤退路线。第二天清晨，所有人按照你的计划开始行动，井然有序。",
    },
    rightChoice: {
      label: "先了解敌情再说",
      description: "计划赶不上变化，先派斥候摸清情况，随机应变",
      value: "P",
      nextStorySnippet:
        "你派出多组斥候，自己也亲自去前线观察地形。你发现魔物大军内部并非铁板一块——有几支分队行动迟缓，这是可以利用的弱点。你决定等最后的情报再定方案。",
    },
  },
  {
    id: "4-2",
    chapter: 4,
    dimension: "JP",
    storyText:
      "战斗打响了。你的左翼部队遭遇了意外的强敌，阵线即将崩溃。传令兵急匆匆地跑来：「指挥官，左翼请求增援！但如果调动预备队，中路就会空虚！」",
    leftChoice: {
      label: "执行备用方案B",
      description: "开战前就考虑过这种情况，按预案调动",
      value: "J",
      nextStorySnippet:
        "你冷静地下达命令：「启动B方案，中路后撤两百步形成口袋阵，预备队增援左翼。」因为提前演练过，所有人迅速到位。阵线稳住了。",
    },
    rightChoice: {
      label: "亲自去左翼临场指挥",
      description: "到现场才能判断最佳应对方式",
      value: "P",
      nextStorySnippet:
        "你翻身上马直奔左翼。到了现场你才发现，强敌其实只是魔物的诱饵——真正的威胁从地下涌来。你当机立断改变战术，让士兵们点燃地面的油脂。这是任何预案都想不到的应对。",
    },
  },
  {
    id: "4-3",
    chapter: 4,
    dimension: "JP",
    storyText:
      "战局进入尾声，魔王亲自现身。它提出最后的交易：「将灵魂之镜交给我，我带走大军永不再来。否则，即使你们今日获胜，我明年还会卷土重来。」所有人等着你的决断。",
    leftChoice: {
      label: "拒绝，按计划决战",
      description: "已经准备到这一步了，就贯彻到底",
      value: "J",
      nextStorySnippet:
        "你举起灵魂之镜，镜面射出一道耀眼的光芒：「我们为这一刻准备了一切，不会因为恐惧而放弃。」光芒击穿了魔王的黑暗铠甲。你的坚定信念，就是最强的武器。",
    },
    rightChoice: {
      label: "假装考虑，寻找破绽",
      description: "也许可以在对话中找到更好的解决方式",
      value: "P",
      nextStorySnippet:
        "你故作犹豫，和魔王周旋。在对话中你注意到它的目光不断飘向灵魂之镜——它在害怕。你突然将镜面对准它，镜中映出了魔王的真实形态——一个孤独的、被诅咒的灵魂。真相，比武力更有效。",
    },
  },
];
