import { FaEdit } from "react-icons/fa";

import { scheduleData, taskImportanceColor } from "../config";
import useTimeLeft from "../../../lib/useTimeLeft";

export default async function Page({ params: { scheduleid } }) {
  const decoded_scheduleid = decodeURIComponent(scheduleid);
  const schedule = scheduleData.find((item) => item.title === decoded_scheduleid);
  return (
    <div className='sticky top-0 left-0 w-full flex flex-col items-start justify-start gap-3'>
      <div className='flex flex-row items-center justify-start gap-2 group cursor-pointer'>
        <span
          className='p-1 rounded-full text-white'
          style={{ backgroundColor: taskImportanceColor[schedule.importance].color }}
        >
          {taskImportanceColor[schedule.importance].icon}
        </span>
        <h1 className='title text-2xl'>{decoded_scheduleid}</h1>
        <div className='duration-300 hidden group-hover:block group-hover:text-slate-800/50'>
          <FaEdit />
        </div>
      </div>
      <div className='w-full flex flex-col gap-3 text-slate-800 bg-[#FFF6BD] p-2 rounded-xl'>
        <div className='flex flex-row'>
          <span>Level: </span>
          <span>{schedule.importance}</span>
        </div>
        <div className='flex flex-row'>
          <span>剩余时间:</span>
          <span>{useTimeLeft(schedule.date)}</span>
        </div>
        <div className='flex flex-row'>
          <span>截止日期:</span>
          <span>{schedule.date}</span>
        </div>
        <div className='flex flex-row'>
          <span>负责人: </span>
          <span>{schedule.host}</span>
        </div>
        <div className='flex flex-row'>
          <span>参与人员：</span>
          <span className='flex flex-row gap-1'>
            {schedule.persons.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </span>
        </div>
        <div className='flex flex-row'>
          <span className='whitespace-nowrap'>详细内容：</span>
          <span>{schedule.detail}</span>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return scheduleData.map((item) => ({
    scheduleid: item.title,
  }));
}
