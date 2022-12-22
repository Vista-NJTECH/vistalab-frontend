import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { TbLetterA, TbLetterB, TbLetterC, TbLetterD } from "react-icons/tb";

import { scheduleData } from "./config";
import useTimeLeft from "../../lib/useTimeLeft";

const taskImportanceColor = {
  紧急: {
    color: "#EB455F",
    icon: <TbLetterA />,
  },
  重要: {
    color: "#00AEEE",
    icon: <TbLetterB />,
  },
  正常: {
    color: "#38E54D",
    icon: <TbLetterC />,
  },
  暂缓: {
    color: "#F49D1A",
    icon: <TbLetterD />,
  },
};

function ScheduleCard({ item }) {
  const timeLeft = useTimeLeft(item.date);
  return (
    <Link
      href={"/schedule/" + item.title}
      style={{ backgroundColor: taskImportanceColor[item.importance].color }}
      className='flex flex-col gap-3 rounded-xl p-4 text-white font-bold shadow-md hover:scale-105 duration-300'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <span className='p-1 rounded-full bg-white' style={{ color: taskImportanceColor[item.importance].color }}>
            {taskImportanceColor[item.importance].icon}
          </span>
          <span>{item.date}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <span>{timeLeft}</span>
          <span>{item.importance}</span>
        </div>
      </div>
      <div className='text-xl font-bold'>
        <span>{item.title}</span>
      </div>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className='w-full max-w-md flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-start gap-2'>
        <h1 className='title text-2xl'>所有日程</h1>
        <div className='bg-theme text-white p-2 rounded-full cursor-pointer'>
          <FaPlus />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {scheduleData.map((item, index) => (
          <ScheduleCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
