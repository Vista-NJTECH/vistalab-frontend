import { TbLetterA, TbLetterB, TbLetterC, TbLetterD } from "react-icons/tb";

export const scheduleData = [
  {
    title: "完成网站主页面设计",
    date: "2023-1-10",
    persons: ["张三", "李四"],
    importance: "紧急",
    detail: "1月10号前完成网站主页的设计",
  },
  {
    title: "完成网站成果展示组件设计",
    date: "2023-1-10",
    persons: ["张三", "李四"],
    importance: "紧急",
    detail: "1月10号前完成网站成果展示主页的设计，实现选择不同年份的功能",
  },
  {
    title: "完成网站获得奖项组件设计",
    date: "2023-1-11",
    persons: ["张三", "李四"],
    importance: "重要",
    host: "顾俊玮",
    detail: "1月11号前完成网站动态API设计，包括图片模糊算法的处理",
  },
  {
    title: "完成最近动态的后端API设计",
    date: "2023-1-11",
    persons: ["张三", "李四"],
    importance: "重要",
    detail:
      "1月11号前完成网站获得奖项组件设计，实现自动获取图片，图片动态效果，手动选择图片功能（手动选择不可以使用Timer，影响用户体验）",
  },
  {
    title: "完成网站的页脚设计",
    date: "2023-1-12",
    persons: ["张三", "李四"],
    importance: "正常",
    detail: "1月12号前完成网站页脚设计",
  },
  {
    title: "完成网站的手机端响应设计",
    date: "2023-1-12",
    persons: ["张三", "李四"],
    importance: "正常",
    detail: "1月12号前完成网站的手机端响应设计，手机端的导航栏要有动态效果",
  },
  {
    title: "开学前准备好相关内容",
    date: "2023-2-13",
    persons: ["张三", "李四"],
    importance: "暂缓",
    detail: "2月13号前做好开学前准备好相关内容",
  },
];

export const taskImportanceColor = {
  紧急: {
    color: "#EB455F",
    icon: <TbLetterA />,
  },
  重要: {
    color: "#00AEEE",
    icon: <TbLetterB />,
  },
  正常: {
    color: "#38E54D",
    icon: <TbLetterC />,
  },
  暂缓: {
    color: "#F49D1A",
    icon: <TbLetterD />,
  },
};
