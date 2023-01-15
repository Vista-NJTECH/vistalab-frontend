import { AiFillHome, AiFillAccountBook, AiFillSchedule, AiFillFlag } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { RiChatSmile3Fill } from "react-icons/ri";
import { RiGroupFill } from "react-icons/ri";
import { BsChatLeftTextFill } from "react-icons/bs";

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
    title: "项目管理",
    href: "/project",
    icon: <FaListAlt />,
  },
  {
    title: "竞赛信息",
    href: "/competition",
    icon: <AiFillFlag />,
  },
  {
    title: "日程安排",
    href: "/schedule",
    icon: <AiFillSchedule />,
  },
  {
    title: "发票报销",
    href: "/invoice",
    icon: <AiFillAccountBook />,
  },
  {
    title: "成员信息",
    href: "/members",
    icon: <RiGroupFill />,
  },
  {
    title: "反馈中心",
    href: "/feedback",
    icon: <BsChatLeftTextFill />,
  },
];
