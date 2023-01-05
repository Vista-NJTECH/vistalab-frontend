import Link from "next/link";

import { sidebarData } from "../config";
import { CourseCard } from "../components";

export default async function Page({ params: { studyid1 } }) {
  const decode_studyid1 = decodeURIComponent(studyid1);
  const res = await fetch(`http://124.223.196.177:8181/study/getall?class=${decode_studyid1}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const lessons = data.data;
  const prefix = data.prefix;
  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='flex flex-row items-center justify-start gap-2'>
        <Link href='/study' className='title text-xl text-theme hover:underline'>
          所有课程
        </Link>
        <h1>/</h1>
        <Link href={`/study/${decode_studyid1}`} className='title text-xl text-theme hover:underline'>
          {sidebarData.find((item) => item.path === decode_studyid1).title}
        </Link>
      </div>
      <div className='grid gap-5 grid-cols-1 md:grid-cols-3'>
        {lessons.map((item, index) => (
          <CourseCard key={index} prefix={prefix} course={item} />
        ))}
      </div>
    </div>
  );
}
