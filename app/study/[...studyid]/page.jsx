import Image from "next/image";

import { sidebarData } from "../config";

export default async function Page({
  params: {
    studyid: [studyid1, studyid2],
  },
}) {
  const decode_studyid1 = decodeURIComponent(studyid1);
  const decode_studyid2 = decodeURIComponent(studyid2);
  const res = await fetch(
    `http://124.223.196.177:8181/study/getall?class=${decode_studyid1}&subclass=${decode_studyid2}`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const lessons = data.data;
  const prefix = data.prefix;
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-start gap-2'>
        <h1 className='title text-2xl'>{decode_studyid1}</h1>
        <h1>|</h1>
        <h1 className='title text-xl'>{decode_studyid2}</h1>
      </div>
      <div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
        {lessons.map((item, index) => (
          <div key={index} className='flex flex-col items-center justify-start gap-2'>
            <h1 className='title text-xl font-bold'>{item.title}</h1>
            <a href={item.link} target='_blank'>
              <Image
                alt={item.title}
                width={item.width}
                height={item.height}
                src={prefix + item.path}
                placeholder='empty'
                className='rounded-md hover:scale-105 duration-300 shadow-md border-2 border-slate-200 aspect-4/3 object-contain object-center'
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const data = [];
  const fetchCategories = async (category) => {
    const res = await fetch(`http://124.223.196.177:8181/study/getcategory?class=${category}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    const categories = data.data.map((item) => item.coursename);
    return categories;
  };
  sidebarData.forEach(async (item1) => {
    const categories = await fetchCategories(item1.path);
    categories.forEach((item2) => data.push({ studyid: [item1.path, item2] }));
  });
  return data;
}
