import Link from "next/link";

import { sidebarData } from "./config";

async function StudyCard({ category }) {
  const res = await fetch(`http://124.223.196.177:8181/study/getcategory?class=${category.path}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const categories = data.data.map((item) => item.coursename);
  return (
    <div className='flex flex-col gap-1 p-2 shadow-md text-gray-400 border-2 border-slate-200 rounded-md'>
      <h1 className='text-xl font-semibold'>{category.title}</h1>
      <div className='flex flex-col gap-1'>
        {categories.map((item, index) => (
          <Link key={index} href={"/study/" + category.path + "/" + item} className='text-slate-800 hover:text-theme'>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function Sidebar() {
  return (
    <div className='w-full max-w-md md:max-w-xs flex flex-col gap-4'>
      <Link href='/study' className='title text-2xl hover:text-theme'>
        所有课程
      </Link>
      <div className='flex flex-col gap-6'>
        {sidebarData.map((item, index) => (
          <StudyCard category={item} key={index} />
        ))}
      </div>
    </div>
  );
}
