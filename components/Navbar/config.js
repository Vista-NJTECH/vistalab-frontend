import { AiFillHome, AiFillAccountBook, AiFillSchedule } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

export const navbarData = [
  {
    title: "首页",
    href: "/",
    icon: <AiFillHome />,
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
    title: "成员信息",
    href: "/members",
    icon: <FaUserAlt />,
  },
  {
    title: "发票报销",
    href: "/invoice",
    icon: <AiFillAccountBook />,
  },
];
