"use client";

import Link from "next/link";
import Image from "next/image";
import { MdOutlineDateRange } from "react-icons/md";

import useWindowSize from "../../lib/useWindowSize";
import useTimeAgo from "../../lib/useTimeAgo";

export default function ActivityCard({ item, isOdd }) {
  const windowSize = useWindowSize();
  const timeAgo = useTimeAgo(item.date);
  return (
    <>
      {windowSize.width > 768 ? (
        <div className='w-full flex flex-col md:flex-row items-center justify-between rounded-md shadow-lg bg-slate-100'>
          {isOdd && (
            <div className='max-w-[450px] cursor-pointer'>
              <Image
                src={item.src}
                alt='activity'
                placeholder='blur'
                className='rounded-l-md hover:scale-105 duration-300'
              />
            </div>
          )}
          <div className='p-4'>
            <Link href={item.href} className='text-2xl title hover:text-theme duration-300'>
              {item.title}
            </Link>
            <span className='flex flex-row items-center gap-2 text-slate-500 mb-3'>
              <div className='flex flex-row items-center'>
                <MdOutlineDateRange />
                <p>{item.date}</p>
              </div>
              <p>{timeAgo}</p>
            </span>
            <p>{item.intro}</p>
          </div>
          {!isOdd && (
            <div className='max-w-[450px]'>
              <Image
                src={item.src}
                alt='activity'
                placeholder='blur'
                className='rounded-r-md hover:scale-105 duration-300 cursor-pointer'
              />
            </div>
          )}
        </div>
      ) : (
        <div className='w-full flex flex-col md:flex-row items-center justify-between rounded-md shadow-lg bg-slate-100'>
          <div className='max-w-[450px] cursor-pointer'>
            <Image
              src={item.src}
              alt='activity'
              placeholder='blur'
              className='rounded-t-md hover:scale-105 duration-300'
            />
          </div>
          <div className='p-4'>
            <Link href={item.href} className='text-2xl title hover:text-theme duration-300'>
              {item.title}
            </Link>
            <span className='flex flex-row items-center gap-1 text-slate-500 mb-3'>
              <MdOutlineDateRange />
              <p>{item.date}</p>
              <p>{timeAgo}</p>
            </span>
            <p>{item.intro}</p>
          </div>
        </div>
      )}
    </>
  );
}
