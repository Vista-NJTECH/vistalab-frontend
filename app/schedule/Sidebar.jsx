import Link from "next/link";
import { BsFillPlusCircleFill } from "react-icons/bs";

import { scheduleData, taskImportanceColor } from "./config";
import useTimeLeft from "../../lib/useTimeLeft";

function ScheduleCard({ item }) {
  const timeLeft = useTimeLeft(item.date);
  return (
    <Link
      href={"/schedule/" + item.title}
      className='flex flex-col gap-3 rounded-xl p-4 border-2 border-slate-100 text-slate-700 font-bold shadow-md hover:bg-slate-100 duration-300'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <span
            className='p-1 rounded-full text-white'
            style={{ backgroundColor: taskImportanceColor[item.importance].color }}
          >
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
      <div className='flex flex-row items-center justify-start gap-1 group cursor-pointer'>
        <h1 className='title text-2xl'>所有日程</h1>
        <div className='duration-300 hidden group-hover:block group-hover:text-slate-800/50'>
          <BsFillPlusCircleFill />
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
