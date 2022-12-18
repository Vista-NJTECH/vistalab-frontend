import Link from "next/link";

import { activitiesData } from "./config";
import ActivityCard from "./ActivityCard";

export default function Activities() {
  return (
    <div className='px-5 md:px-48 py-10 flex flex-col items-center justify-center gap-5 md:gap-16'>
      <h1 className='text-3xl font-bold text-slate-700'>最近的动态</h1>
      <div className='flex flex-col items-center justify-center gap-10'>
        {activitiesData.map((item, index) => (
          <ActivityCard key={index} item={item} isOdd={index % 2 === 0} />
        ))}
      </div>
      <Link
        href='/'
        className='text-white bg-theme-dark duration-500 font-bold p-3 rounded-md text-center hover:shadow-xl'
      >
        查看更多动态...
      </Link>
    </div>
  );
}
