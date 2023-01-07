import Image from "next/image";
import { MdOutlineDateRange } from "react-icons/md";

import { Upload, Delete, Update } from "./components";
import { activitiesData } from "./config";
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
          <div className='flex flex-row gap-2'>
            <h1 className='text-2xl title'>{activity.title}</h1>
            <div className='flex flex-row gap-1'>
              <Update activity={activity} />
              <Delete activity={activity} />
            </div>
          </div>
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
            className='rounded-t-mdobject-cover object-center'
          />
        </div>
        <div className='p-4'>
          <div className='flex flex-row gap-2'>
            <h1 className='text-2xl title'>{activity.title}</h1>
            <div className='flex flex-row gap-1'>
              <Update activity={activity} />
              <Delete activity={activity} />
            </div>
          </div>
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

export default async function Page() {
  const res = await fetch(`${process.env.BACKEND_URL}activity/getactivity`, { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const activitiesData = await res.json();
  const prefix = activitiesData.prefix;

  return (
    <div className='frame flex flex-col items-center justify-center gap-5 md:gap-10'>
      <div className='w-full flex flex-row items-center justify-between'>
        <h1 className='title text-3xl'>最近的动态</h1>
        <Upload />
      </div>
      <div className='flex flex-col items-center justify-center gap-10'>
        {activitiesData.data.map((item, index) => (
          <ActivityCard key={index} prefix={prefix} activity={item} isOdd={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
}
