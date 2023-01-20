import { AiFillHome, AiFillAccountBook, AiFillSchedule, AiFillFlag } from "react-icons/ai";
import { FaListAlt, FaFlagCheckered } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { RiChatSmile3Fill, RiComputerFill, RiRobotLine } from "react-icons/ri";
import { RiGroupFill } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";

export const navbarData = [
  {
    title: "首页",
    href: "/",
    subNav:[],
    icon: <AiFillHome />,
  },
  {
    title: "最近动态",
    href: "/activity",
    subNav: [],
    icon: <RiChatSmile3Fill />,
  },
  {
    title: "我要学习",
    href: "/study",
    subNav:[],
    icon: <MdSchool />,
  },
  {
    title: "项目管理",
    href: "/project",
    subNav:[],
    icon: <FaListAlt />,
  },
  {
    title: "日程安排",
    href: "/schedule",
    subNav:[],
    icon: <AiFillSchedule />,
  },
  {
    title: "发票报销",
    href: "/invoice",
    subNav:[],
    icon: <AiFillAccountBook />,
  },
  {
    title: "信息中心",
    href: "/",
    subNav:[
      {
        title: '实验室智慧化信息',
        href: '/information',
        icon: <RiRobotLine />
      },
      {
        title: '物资信息',
        href: '/',
        icon: <BsBoxSeam />
      },
      {
        title: '成员信息',
        href: '/members',
        icon: <RiGroupFill />
      },
      {
        title: '竞赛信息',
        href: '/competition',
        icon: <FaFlagCheckered />
      },
   ],
    icon: <RiComputerFill />,
  },
];