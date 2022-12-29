import Image from "next/image";

import { sidebarData } from "../config";

export default async function Page({
  params: {
    studyid: [studyid1, studyid2],
  },
}) {
  const decode_studyid1 = decodeURIComponent(studyid1);
  const decode_studyid2 = decodeURIComponent(studyid2);
  const lessons = sidebarData[decode_studyid1][decode_studyid2];
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-start gap-2'>
        <h1 className='title text-2xl'>{decode_studyid1}</h1>
        <h1>|</h1>
        <h1 className='title text-xl'>{decode_studyid2}</h1>
      </div>
      <div className='grid gap-5 grid-cols-2'>
        {lessons.map((item, index) => (
          <div key={index} className='flex flex-col items-center justify-start gap-2'>
            <h1 className='title text-xl font-bold'>{item.title}</h1>
            <a href={item.href} target='_blank'>
              <Image
                src={item.src}
                className='rounded-md hover:scale-105 duration-300 shadow-md border-2 border-slate-200 aspect-4/3'
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
  Object.keys(sidebarData).forEach((item1) =>
    Object.keys(sidebarData[item1]).forEach((item2) => data.push({ studyid: [item1, item2] }))
  );
  return data;
}
