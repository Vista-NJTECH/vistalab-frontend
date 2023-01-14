"use client";

import { useState } from "react";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

import { UploadCycle } from "../components";

export default function CycleCard({ project_id, index, cycle }) {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <div className='flex flex-col gap-1'>
      <div className='w-full flex flex-row justify-between'>
        <h2 className='text-md'>
          第{index}个周期({cycle ? cycle.cycle_time : null})
        </h2>
        <div className='flex flex-row items-center gap-2'>
          <UploadCycle project_id={project_id} cycle_id={index} />
          <button onClick={() => setIsDropdown(!isDropdown)}>
            {isDropdown ? <BsChevronCompactUp size={20} /> : <BsChevronCompactDown size={20} />}
          </button>
        </div>
      </div>
      <div className='w-full overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-theme text-white whitespace-nowrap rounded-md'>
              <th className='p-2'>项目成员</th>
              <th className='p-2 w-1/3'>本周期工作</th>
              <th className='p-2 w-1/3'>下周期计划</th>
              <th className='p-2'>备注与意见</th>
            </tr>
          </thead>
          {cycle && isDropdown && (
            <tbody>
              {cycle.data.map((item, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 1 && "#f2f2f2" }}>
                  <td className='p-2'>{item.name}</td>
                  <td className='p-2'>{item.current_work}</td>
                  <td className='p-2'>{item.future_plan}</td>
                  <td className='p-2'>{item.remark}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
