"use client";

import { useState } from "react";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

import { taskImportance } from "../config";
import useTimeLeft from "../../../lib/useTimeLeft";
import Detail from "./Detail";
import Delete from "./Delete";
import Update from "./Update";

export default function Schedule({ schedule }) {
  const timeLeft = useTimeLeft(schedule.date);
  const isScheduleValid = timeLeft === 0 || schedule.state !== 1;

  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <div
      className={`flex flex-col gap-4 rounded-md p-3 shadow-md`}
      style={{
        border: `solid 2px ${isScheduleValid ? "#808080" : taskImportance[schedule.level].color}`,
        backgroundColor: isScheduleValid ? "#80808040" : `${taskImportance[schedule.level].color}40`,
      }}
    >
      <div className='w-full flex flex-col md:flex-row items-start justify-between gap-1'>
        <div className='flex flex-row items-center gap-3'>
          <span
            className='p-1 rounded-full text-white items-center'
            style={{
              backgroundColor: isScheduleValid ? "#808080" : taskImportance[schedule.level].color,
            }}
          >
            {taskImportance[schedule.level].icon}
          </span>
          <span className='flex flex-row items-center gap-1'>
            <h1 className='text-xl font-bold'>{schedule.title}</h1>
            <Update schedule={schedule} />
            <Delete schedule={schedule} />
          </span>
        </div>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div className='flex flex-row gap-1'>
            <span>{timeLeft}</span>
            <span>{taskImportance[schedule.level].title}</span>
          </div>
          <button onClick={() => setIsDropdown((preState) => (preState = !preState))}>
            {isDropdown ? <BsChevronCompactUp size={20} /> : <BsChevronCompactDown size={20} />}
          </button>
        </div>
      </div>
      {isDropdown && <Detail schedule={schedule} />}
    </div>
  );
}
