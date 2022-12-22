import { AiFillHome, AiFillAccountBook, AiFillFlag, AiFillSchedule } from "react-icons/ai";
import { FaUserAlt, FaElementor } from "react-icons/fa";

export const navbarData = [
  {
    title: "首页",
    href: "/",
    icon: <AiFillHome />,
  },
  {
    title: "主要成员",
    href: "/",
    icon: <FaUserAlt />,
  },
  {
    title: "物品管理",
    href: "/",
    icon: <FaElementor />,
  },
  {
    title: "竞赛管理",
    href: "/",
    icon: <AiFillFlag />,
  },
  {
    title: "日程安排",
    href: "/schedule",
    icon: <AiFillSchedule />,
  },
  {
    title: "发票报销",
    href: "/",
    icon: <AiFillAccountBook />,
  },
];
