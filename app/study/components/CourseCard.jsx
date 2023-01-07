import Image from "next/image";
import Link from "next/link";

import Update from "./Update";

export default function CourseCard({ prefix, course }) {
  return (
    <div className='flex flex-col items-center justify-between gap-2'>
      <div className='w-full flex flex-col items-start justify-between gap-2'>
        <div className='flex flex-row items-center w-full gap-1 title text-xl'>
          <h1>{course.title}</h1>
          <Update />
        </div>
        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row gap-2'>
            <Link
              href={`/study/${course.classification}`}
              className='bg-purple-500 hover:bg-purple-700 duration-500 text-white text-xs font-semibold p-1 rounded-md'
            >
              {course.classification}
            </Link>
            <Link
              href={`/study/${course.classification}/${course.coursename}`}
              className='bg-indigo-500 hover:bg-indigo-700 duration-500 text-white text-xs font-semibold p-1 rounded-md'
            >
              {course.coursename}
            </Link>
          </div>
          {course.tags && (
            <div className='flex flex-row gap-1'>
              {course.tags.split(",").map((item, index) => (
                <div key={index} className='flex flex-row items-center'>
                  <h1 className='text-theme font-bold'>#</h1>
                  <h1>{item}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <a href={course.link} target='_blank'>
        <Image
          alt={course.title}
          width={course.width}
          height={course.height}
          src={prefix + course.path}
          blurDataURL={course.base64}
          placeholder='blur'
          className='rounded-md shadow-md border-2 border-blue-300 hover:shadow-xl duration-500 aspect-4/3 object-cover object-left-top'
        />
      </a>
    </div>
  );
}
