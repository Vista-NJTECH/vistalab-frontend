import Image from "next/image";

import Edit from "./Edit";

export default function CourseCard({ prefix, course }) {
  return (
    <div className='flex flex-col items-center justify-between gap-2'>
      <Edit course={course} />
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
