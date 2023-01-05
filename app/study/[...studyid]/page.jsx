import Image from "next/image";

import { sidebarData } from "../config";
import { Edit } from "../components";

export default async function Page({
  params: {
    studyid: [studyid1, studyid2],
  },
}) {
  const decode_studyid1 = decodeURIComponent(studyid1);
  const decode_studyid2 = decodeURIComponent(studyid2);
  const res = await fetch(
    `http://124.223.196.177:8181/study/getall?class=${decode_studyid1}&subclass=${decode_studyid2}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const lessons = data.data;
  const prefix = data.prefix;
  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='flex flex-row items-center justify-start gap-2'>
        <h1 className='title text-xl bg-theme text-white px-2 py-1 rounded-md'>
          {sidebarData.find((item) => item.path === decode_studyid1).title}
        </h1>
        <h1>|</h1>
        <h1 className='title text-xl'>{decode_studyid2}</h1>
      </div>
      <div className='grid gap-7 grid-cols-1 md:grid-cols-2'>
        {lessons.map((item, index) => (
          <div key={index} className='flex flex-col items-center justify-between gap-2'>
            <Edit item={item} />
            <a href={item.link} target='_blank'>
              <Image
                alt={item.title}
                width={item.width}
                height={item.height}
                src={prefix + item.path}
                blurDataURL={item.base64}
                placeholder='blur'
                className='rounded-md shadow-md hover:shadow-xl duration-500 aspect-4/3 object-cover object-left-top'
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
    const res = await fetch(`http://124.223.196.177:8181/study/getcategory?class=${category}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    const categories = data.data.map((item) => item.coursename);
    return categories;
  };
  for (const item1 of sidebarData) {
    const categories = await fetchCategories(item1.path);
    categories.forEach((item2) => data.push({ studyid: [item1.path, item2] }));
  }
  return data;
}
