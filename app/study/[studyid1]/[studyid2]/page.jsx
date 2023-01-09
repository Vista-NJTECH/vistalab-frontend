import Link from "next/link";

import { sidebarData } from "../../config";
import { CourseCard, Upload } from "../../components";

export default async function Page({ params: { studyid1, studyid2 } }) {
  const decode_studyid1 = decodeURIComponent(studyid1);
  const decode_studyid2 = decodeURIComponent(studyid2);
  const res = await fetch(
    `${process.env.BACKEND_URL}study/getall?class=${decode_studyid1}&subclass=${decode_studyid2}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const lessons = data.data;
  const prefix = data.prefix;

  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center justify-start gap-1'>
          <Link href='/study' className='title text-xl text-theme hover:underline'>
            所有课程
          </Link>
          <h1>/</h1>
          <Link href={`/study/${decode_studyid1}`} className='title text-xl text-theme hover:underline'>
            {sidebarData.find((item) => item.path === decode_studyid1).title}
          </Link>
          <h1>/</h1>
          <Link
            href={`/study/${decode_studyid1}/${decode_studyid2}`}
            className='title text-xl text-theme hover:underline'
          >
            {decode_studyid2}
          </Link>
        </div>
        <Upload />
      </div>
      <div className='grid gap-5 grid-cols-1 md:grid-cols-3'>
        {lessons.map((item, index) => (
          <CourseCard key={index} prefix={prefix} course={item} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const data = [];
  const fetchCategories = async (category) => {
    const res = await fetch(`${process.env.BACKEND_URL}study/getcategory?class=${category}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    const categories = data.data.map((item) => item.coursename);
    return categories;
  };
  for (const item1 of sidebarData) {
    const categories = await fetchCategories(item1.path);
    categories.forEach((item2) => data.push({ studyid1: item1.path, studyid2: item2 }));
  }
  return data;
}
