import Link from "next/link";

import { sidebarData } from "./config";

async function fetchCategory(category) {
  const res = await fetch(`${process.env.BACKEND_URL}study/getcategory?class=${category.path}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const categories = data.data.map((item) => item.coursename);
  return { title: category.title, path: category.path, data: categories };
}

async function CategoryCard({ category }) {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='w-fit text-xl font-semibold text-gray-400'>{category.title}</h1>
      <div className='flex flex-col gap-1'>
        {category.data.map((item, index) => (
          <Link
            key={index}
            href={"/study/" + category.path + "/" + item}
            className='w-fit text-slate-800 pl-3 hover:text-theme'
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function Sidebar() {
  const data = await Promise.all(sidebarData.map((item) => fetchCategory(item)));
  return (
    <div className='md:w-64 h-fit md:sticky md:top-3 flex flex-col gap-4'>
      <h1 className='title text-2xl'>所有课程</h1>
      <div className='flex flex-col gap-4'>
        {data.map((item, index) => (
          <CategoryCard category={item} key={index} />
        ))}
      </div>
    </div>
  );
}
