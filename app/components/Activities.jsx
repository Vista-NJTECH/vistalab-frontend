import Link from "next/link";

import { activitiesData } from "./config";
import ActivityCard from "./ActivityCard";

export default function Activities() {
  return (
    <div className='frame flex flex-col items-center justify-center gap-5 md:gap-16'>
      <h1 className='title text-3xl'>我们最近的动态</h1>
      <div className='flex flex-col items-center justify-center gap-10'>
        {activitiesData.map((item, index) => (
          <ActivityCard key={index} item={item} isOdd={index % 2 === 0} />
        ))}
      </div>
      <Link href='/' className='btn p-3'>
        查看更多动态...
      </Link>
    </div>
  );
}
