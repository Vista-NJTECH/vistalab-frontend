import { AiFillHome, AiFillAccountBook, AiFillSchedule } from "react-icons/ai";
import { FaUserAlt, FaFlagCheckered } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { RiChatSmile3Fill } from "react-icons/ri";

export const navbarData = [
  {
    title: "首页",
    href: "/",
    icon: <AiFillHome />,
  },
  {
    title: "最近动态",
    href: "/activity",
    icon: <RiChatSmile3Fill />,
  },
  {
    title: "我要学习",
    href: "/study",
    icon: <MdSchool />,
  },
  {
    title: "日程安排",
    href: "/schedule",
    icon: <AiFillSchedule />,
  },
  {
    title: "竞赛信息",
    href: "/competition",
    icon: <FaFlagCheckered />,
  },
  // {
  //   title: "成员信息",
  //   href: "/members",
  //   icon: <FaUserAlt />,
  // },
  {
    title: "发票报销",
    href: "/invoice",
    icon: <AiFillAccountBook />,
  },
];
