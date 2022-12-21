import { FcElectronics, FcOrgUnit, FcMindMap } from "react-icons/fc";

export const stacksData = [
  {
    title: "电控方向",
    href: "/",
    icon: <FcElectronics />,
    intro:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque voluptatem excepturi rerum, dolorem provident dignissimos.",
  },
  {
    title: "算法方向",
    href: "/",
    icon: <FcMindMap />,
    intro:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque voluptatem excepturi rerum, dolorem provident dignissimos adipisci ipsum fugit aperiam repudiandae?",
  },
  {
    title: "视觉方向",
    href: "/",
    icon: <FcOrgUnit />,
    intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
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

import activity01 from "./images/activities/activity01.jpeg";
import activity02 from "./images/activities/activity02.jpeg";
import activity03 from "./images/activities/activity03.jpeg";
import activity04 from "./images/activities/activity04.jpeg";

export const activitiesData = [
  {
    title: "我们的第一堂电控课！",
    date: "2022/12/01",
    intro: "由张毅杰同学主讲的电控课，开启大家极客的生涯！",
    href: "/",
    src: activity04,
  },
  {
    title: "我们的第一堂算法课！",
    date: "2022/11/09",
    intro: "由南京工业大学算法队何海嘉同学主讲的的传统算法，旨在提高同学们的编程思维与能力。",
    href: "/",
    src: activity03,
  },
  {
    title: "为比赛作准备！",
    date: "2022/3/21",
    intro: "蔡建文在焊接车辆的部件。",
    href: "/",
    src: activity02,
  },
  {
    title: "WE DID IT! Waiting another year!",
    date: "2021/12/18",
    intro: "王正阳手捧起他制作的第一辆循迹小车。",
    href: "/",
    src: activity01,
  },
];
