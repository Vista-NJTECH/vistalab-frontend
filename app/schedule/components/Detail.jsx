import useTimeLeft from "../../../lib/useTimeLeft";
import { taskImportance } from "../config";

export default function Detail({ isDropdown, schedule }) {
  return (
    <div className='w-full flex flex-col gap-1' style={{ transition: "opacity 0.5s ease-in-out" }}>
      <div className='flex flex-row'>
        <span>Level：</span>
        <span>{taskImportance[schedule.level].title}</span>
      </div>
      <div className='flex flex-row'>
        <span>负责人：</span>
        <span>{schedule.host}</span>
      </div>
      <div className='flex flex-row'>
        <span>参与人员：</span>
        <span>{schedule.persons}</span>
      </div>
      <div className='flex flex-row'>
        <span>剩余时间：</span>
        <span>{useTimeLeft(schedule.date)}</span>
      </div>
      <div className='flex flex-row'>
        <span>截止日期：</span>
        <span>{schedule.date}</span>
      </div>
      <div className='flex flex-row'>
        <span className='whitespace-nowrap'>详细内容：</span>
        <span>{schedule.detail}</span>
      </div>
    </div>
  );
}
