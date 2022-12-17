import { AiFillHome, AiFillAccountBook, AiFillFlag } from "react-icons/ai";
import { FaUserAlt, FaElementor } from "react-icons/fa";

const navbarData = [
  {
    title: "首页",
    href: "/",
    icon: <AiFillHome />,
  },
  {
    title: "人员信息",
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
    title: "发票报销",
    href: "/",
    icon: <AiFillAccountBook />,
  },
];

export default navbarData;
