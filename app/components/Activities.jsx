import Link from "next/link";
import Image from "next/image";
import { MdOutlineDateRange } from "react-icons/md";

import useTimeAgo from "../../lib/useTimeAgo";

function ActivityCard({ prefix, activity, isOdd }) {
  const timeAgo = useTimeAgo(activity.date);
  return (
    <>
      <div className='w-full hidden md:flex flex-row items-center justify-between rounded-md shadow-lg bg-slate-100'>
        {isOdd && (
          <div className='max-w-[450px]'>
            <Image
              src={prefix + activity.img.path}
              width={activity.img.width}
              height={activity.img.height}
              blurDataURL={activity.img.base64}
              alt='activity'
              placeholder='blur'
              className='rounded-l-md object-cover object-center'
            />
          </div>
        )}
        <div className='p-4 max-w-md'>
          <div className='text-2xl title'>{activity.title}</div>
          <span className='flex flex-row items-center gap-2 text-slate-500 mb-3'>
            <div className='flex flex-row items-center'>
              <MdOutlineDateRange />
              <p>{activity.date}</p>
            </div>
            <p>{timeAgo}</p>
          </span>
          <p>{activity.detail}</p>
        </div>
        {!isOdd && (
          <div className='max-w-[450px]'>
            <Image
              src={prefix + activity.img.path}
              width={activity.img.width}
              height={activity.img.height}
              blurDataURL={activity.img.base64}
              alt='activity'
              placeholder='blur'
              className='rounded-r-md object-cover object-center'
            />
          </div>
        )}
      </div>
      <div className='w-full md:hidden flex flex-col items-start justify-between rounded-md shadow-lg bg-slate-100'>
        <div className='max-w-[450px]'>
          <Image
            src={prefix + activity.img.path}
            width={activity.img.width}
            height={activity.img.height}
            blurDataURL={activity.img.base64}
            alt='activity'
            placeholder='blur'
            className='rounded-t-md object-cover object-center'
          />
        </div>
        <div className='p-4'>
          <div className='text-2xl title'>{activity.title}</div>
          <span className='flex flex-row items-center gap-1 text-slate-500 mb-3'>
            <MdOutlineDateRange />
            <p>{activity.date}</p>
            <p>{timeAgo}</p>
          </span>
          <p>{activity.detail}</p>
        </div>
      </div>
    </>
  );
}

export default async function Activities() {
  const res = await fetch(`${process.env.BACKEND_URL}activity/getactivity?count=3`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const activitiesData = await res.json();
  const prefix = activitiesData.prefix;

  return (
    <div className='frame flex flex-col items-center justify-center gap-5 md:gap-16 py-10 md:py-40'>
      <h1 className='title text-3xl'>我们最近的动态</h1>
      <div className='flex flex-col items-center justify-center gap-10'>
        {activitiesData.data.map((item, index) => (
          <ActivityCard key={index} prefix={prefix} activity={item} isOdd={index % 2 === 0} />
        ))}
      </div>
      <Link href='/activity' className='btn p-3'>
        查看更多动态...
      </Link>
    </div>
  );
}
