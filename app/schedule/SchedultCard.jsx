"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

import { taskImportance } from "./config";
import useTimeLeft from "../../lib/useTimeLeft";
import DetailCard from "./DetailCard";

export default function ScheduleCard({ schedule }) {
  const timeLeft = useTimeLeft(schedule.date);
  const [isDropdown, setIsDropdown] = useState(false);
  return (
    <div
      className={`flex flex-col gap-4 rounded-md p-3 shadow-md`}
      style={{
        border: `solid 2px ${taskImportance[schedule.level].color}`,
        backgroundColor: `${taskImportance[schedule.level].color}40`,
      }}
    >
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-3'>
          <span
            className='p-1 rounded-full text-white items-center'
            style={{ backgroundColor: taskImportance[schedule.level].color }}
          >
            {taskImportance[schedule.level].icon}
          </span>
          <span className='flex flex-row items-center gap-1'>
            <h1 className='text-xl font-bold'>{schedule.title}</h1>
            {isDropdown && (
              <button className='text-gray-600 hover:text-gray-800'>
                <FaEdit size={17} />
              </button>
            )}
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
      {isDropdown && <DetailCard schedule={schedule} />}
    </div>
  );
}
