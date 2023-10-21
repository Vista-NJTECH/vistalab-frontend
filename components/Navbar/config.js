import { MdSchool } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { FaListAlt, FaFlagCheckered } from "react-icons/fa";
import { RiChatSmile3Fill, RiComputerFill, RiHomeGearFill } from "react-icons/ri";
import { AiFillHome, AiFillAccountBook, AiFillSchedule } from "react-icons/ai";

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
    title: "智慧互联",
    href: "/information",
    icon: <RiHomeGearFill />,
  },
  {
    title: "信息中心",
    icon: <RiComputerFill />,
    subMenu: [
      {
        title: "物资信息",
        href: "/",
        icon: <BsBoxSeam />,
      },
      {
        title: "成员信息",
        href: "/members",
        icon: <HiOutlineUsers />,
      },
      {
        title: "竞赛信息",
        href: "/competition",
        icon: <FaFlagCheckered />,
      },
    ],
  },
];
