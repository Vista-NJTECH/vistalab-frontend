import { FcElectronics, FcOrgUnit, FcMindMap } from "react-icons/fc";

export const stacksData = [
  {
    title: "电控方向",
    href: "/",
    icon: <FcElectronics />,
    intro:
      "电控方向主要研究电子及其控制技术，主要包括单片机的学习，熟练掌握主流单片机的开发使用，同时也会涉及通信协议，底层驱动和物联网的开发等等。",
  },
  {
    title: "算法方向",
    href: "/",
    icon: <FcMindMap />,
    intro:
      "算法方向主要是学习借助计算机编程语言，使用基于数学或者其他学科的知识，构建出解决数学或者实际问题的算法方案等等。",
  },
  {
    title: "视觉方向",
    href: "/",
    icon: <FcOrgUnit />,
    intro: "视觉方向主要是学习借助计算机视觉，包括主流的视觉算法以及AI，从图像中抽离获取信息以及对图像的处理识别等等。",
  },
];

export const awardsData = {
  2022: [
    "2022年(第15届)中国大学生计算机设计大赛人工智能挑战赛直报赛区选拔赛(省级)一等奖.",
    "2022年(第15届)中国大学生计算机设计大赛一等奖.",
    "2022年第十七届全国大学生智能车竞赛航天智慧物流组南区赛三等奖.",
    "第六届强网杯全国网络安全挑战赛“强网先锋”.",
  ],
  2021: [
    "2021年第十六届全国大学生智能车竞赛航天智慧物流组北区赛二等奖.",
    "2021年(第14届)中国大学生计算机设计大赛三等奖.",
    "2021年全国大学生电子设计竞赛江苏省一等奖.",
  ],
};

function importImagesCache(r) {
  return r.keys().map(r);
}

export default function importAllImages() {
  const imagesCache = importImagesCache(require.context("./images/certificates", false, /\.(png|jpe?g|svg|webp)$/));
  return Object.entries(imagesCache).map((module) => module[1].default);
}

import activity01 from "./images/activities/activity01.jpg";
import activity02 from "./images/activities/activity02.jpg";
import activity03 from "./images/activities/activity03.jpg";
import activity04 from "./images/activities/activity04.jpg";

export const activitiesData = [
  {
    title: "我们的第一堂电控课",
    date: "2022/12/01",
    intro: "由张毅杰同学主讲的电控课，开启大家极客的生涯！",
    href: "/",
    src: activity04,
  },
  {
    title: "我们的第一堂算法课",
    date: "2022/11/09",
    intro: "由南京工业大学算法队何海嘉同学主讲的的传统算法，旨在提高同学们的编程思维与能力。",
    href: "/",
    src: activity03,
  },
  {
    title: "为比赛作准备",
    date: "2022/3/21",
    intro: "蔡建文在调试车辆，焊接车上的电子元器件。",
    href: "/",
    src: activity02,
  },
  {
    title: "王正阳的第一辆循迹小车",
    date: "2021/12/18",
    intro: "王正阳手捧起他制作的第一辆循迹小车。",
    href: "/",
    src: activity01,
  },
];
