import type { Choice } from "./story";

export interface CalibrationQuestion {
  id: string;
  dimension: "EI" | "SN" | "TF" | "JP";
  leftChoice: Choice;
  rightChoice: Choice;
}

export const calibrationQuestions: CalibrationQuestion[] = [
  // EI x2
  {
    id: "c-ei-1",
    dimension: "EI",
    leftChoice: {
      label: "聚会后精力充沛",
      description: "和朋友待了一晚上，回家时感觉充了电",
      value: "E",
      nextStorySnippet: "",
    },
    rightChoice: {
      label: "聚会后需要独处恢复",
      description: "社交很开心，但回家后需要安静一会儿",
      value: "I",
      nextStorySnippet: "",
    },
  },
  {
    id: "c-ei-2",
    dimension: "EI",
    leftChoice: {
      label: "边说边想",
      description: "通过和别人讨论来理清思路",
      value: "E",
      nextStorySnippet: "",
    },
    rightChoice: {
      label: "想好了再说",
      description: "习惯先在脑子里想清楚，再开口表达",
      value: "I",
      nextStorySnippet: "",
    },
  },
  // SN x2
  {
    id: "c-sn-1",
    dimension: "SN",
    leftChoice: {
      label: "关注正在发生的事",
      description: "比起未来的可能性，更在意眼前的现实",
      value: "S",
      nextStorySnippet: "",
    },
    rightChoice: {
      label: "关注未来的可能",
      description: "比起当下的细节，更喜欢思考以后会怎样",
      value: "N",
      nextStorySnippet: "",
    },
  },
  {
    id: "c-sn-2",
    dimension: "SN",
    leftChoice: {
      label: "先看说明书",
      description: "拿到新东西先看使用说明，按步骤来",
      value: "S",
      nextStorySnippet: "",
    },
    rightChoice: {
      label: "先自己摸索",
      description: "拿到新东西先自己试试，凭感觉上手",
      value: "N",
      nextStorySnippet: "",
    },
  },
  // TF x2
  {
    id: "c-tf-1",
    dimension: "TF",
    leftChoice: {
      label: "直说问题",
      description: "朋友问你意见，你会如实指出不足之处",
      value: "T",
      nextStorySnippet: "",
    },
    rightChoice: {
      label: "照顾感受",
      description: "朋友问你意见，你会先肯定再委婉建议",
      value: "F",
      nextStorySnippet: "",
    },
  },
  {
    id: "c-tf-2",
    dimension: "TF",
    leftChoice: {
      label: "规则面前人人平等",
      description: "即使是好朋友，违反规则也不应该例外",
      value: "T",
      nextStorySnippet: "",
    },
    rightChoice: {
      label: "特殊情况特殊对待",
      description: "规则重要，但人的处境更值得体谅",
      value: "F",
      nextStorySnippet: "",
    },
  },
  // JP x2
  {
    id: "c-jp-1",
    dimension: "JP",
    leftChoice: {
      label: "提前做好计划",
      description: "出门旅行前会做详细攻略",
      value: "J",
      nextStorySnippet: "",
    },
    rightChoice: {
      label: "到了再说",
      description: "旅行更喜欢随性而走，惊喜更有趣",
      value: "P",
      nextStorySnippet: "",
    },
  },
  {
    id: "c-jp-2",
    dimension: "JP",
    leftChoice: {
      label: "尽早完成任务",
      description: "有任务会尽快做完，不拖到最后",
      value: "J",
      nextStorySnippet: "",
    },
    rightChoice: {
      label: "截止日期前灵感爆发",
      description: "临近deadline反而更高效，压力是动力",
      value: "P",
      nextStorySnippet: "",
    },
  },
];
