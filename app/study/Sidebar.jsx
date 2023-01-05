import Link from "next/link";

import { Upload } from "./components";
import { sidebarData } from "./config";

async function StudyCard({ category }) {
  const res = await fetch(`http://124.223.196.177:8181/study/getcategory?class=${category.path}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const categories = data.data.map((item) => item.coursename);
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='w-fit text-xl font-semibold text-gray-400'>{category.title}</h1>
      <div className='flex flex-col gap-1'>
        {categories.map((item, index) => (
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
  return (
    <div className='md:w-64 h-fit md:sticky md:top-3 flex flex-col gap-4'>
      <Upload />
      <div className='flex flex-col gap-6'>
        {sidebarData.map((item, index) => (
          <StudyCard category={item} key={index} />
        ))}
      </div>
    </div>
  );
}
