import { BsFillPlusCircleFill } from "react-icons/bs";

import ScheduleCard from "./SchedultCard";

export default async function Sidebar() {
  const res = await fetch(`http://124.223.196.177:8181/schedule/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='w-fit flex flex-row items-center justify-start gap-1 group cursor-pointer'>
        <h1 className='title text-2xl'>所有日程</h1>
        <div className='duration-300 hidden group-hover:block group-hover:text-slate-800/50'>
          <BsFillPlusCircleFill />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {data.data.map((item, index) => (
          <ScheduleCard key={index} schedule={item} />
        ))}
      </div>
    </div>
  );
}
