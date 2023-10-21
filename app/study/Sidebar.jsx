"use client";

import Link from "next/link";
import { useStudyStateContext } from "./components";

function CategoryCard({ category }) {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='w-fit text-xl font-semibold text-gray-400'>{category.title}</h1>
      <div className='flex flex-col gap-1'>
        {category.data.map((item, index) => (
          <Link
            key={index}
            href={"/study/" + category.title + "/" + item}
            className='text-gray-700 hover:text-theme hover:border-theme w-fit'
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { sidebarData } = useStudyStateContext();

  return (
    <div className='md:w-64 h-fit md:sticky md:top-3 flex flex-col gap-4'>
      <h1 className='title text-2xl'>所有课程</h1>
      <div className='flex flex-col gap-4'>
        {sidebarData.data.map((item, index) => (
          <CategoryCard category={item} key={index} />
        ))}
      </div>
    </div>
  );
}
