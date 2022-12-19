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
    "Lorem ipsum dolor sit amet, consectetur adipisicdcsing elit.",
    "Lorem ipsum dolor sis adipisci ipsum fugit aradcaiam repudiandae?",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elisat. Tempore, officia.",
    "Lorem ipsum dolor sit aaDSmet, consectetur adipisicing elit.",
    "Lores adipisci ipsum SDA xasfdsa repudiandae?",
  ],
  2021: [
    "Lorem ipsum dolor sit amet, conscxcectetur adipisicing elt.",
    "Lores adipisci ipsum fugit cx rexzcpudiandae?",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, officia.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "Lores adipisci ipsum fugit xasfdsa repudiandae?",
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
    title: "Good and nice day for joining manga!",
    date: "2022/10/30",
    intro: "Lorem adipisci ipsum fugit xasfdsa repudiandae?",
    href: "/",
    src: activity04,
  },
  {
    title: "Nice team work! Everyone is happy!",
    date: "2022/10/28",
    intro: "Lorem adipisci ipsum fugit xasfdsa repudiandae?",
    href: "/",
    src: activity03,
  },
  {
    title: "Another good day for learning and teaching!",
    date: "2022/11/22",
    intro: "Lorem adipisci ipsum fugit xasfdsa repudiandae?",
    href: "/",
    src: activity02,
  },
  {
    title: "WE DID IT! Waiting another year!",
    date: "2022/12/20",
    intro: "Lorem adipisci ipsum fugit xasfdsa repudiandae?",
    href: "/",
    src: activity01,
  },
];
