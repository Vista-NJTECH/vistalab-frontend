import Link from "next/link";

import { sidebarData } from "./config";

export default function Sidebar() {
  return (
    <div className='w-full max-w-xs flex flex-col gap-4'>
      <h1 className='title text-2xl'>所有课程</h1>
      <div className='flex flex-col gap-6'>
        {Object.keys(sidebarData).map((item1, index1) => (
          <div
            key={index1}
            className='flex flex-col gap-1 p-2 shadow-md text-gray-400 border-2 border-slate-200 rounded-md'
          >
            <h1 className='text-xl font-semibold'>{item1}</h1>
            <div className='flex flex-col gap-1'>
              {Object.keys(sidebarData[item1]).map((item2, index2) => (
                <Link key={index2} href={"/study/" + item1 + "/" + item2} className='text-slate-800 hover:text-theme'>
                  {item2}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
