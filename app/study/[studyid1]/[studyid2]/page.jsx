import Link from "next/link";

import { CourseBody, Upload } from "../../components";

export default async function Page({ params: { studyid1, studyid2 } }) {
  const decode_studyid1 = decodeURIComponent(studyid1);
  const decode_studyid2 = decodeURIComponent(studyid2);

  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center justify-start gap-1'>
          <Link href='/study' className='title text-xl text-theme hover:underline'>
            All
          </Link>
          <h1>/</h1>
          <Link href={`/study/${decode_studyid1}`} className='title text-xl text-theme hover:underline'>
            {decode_studyid1}
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
      <CourseBody url={`&class=${decode_studyid1}&subclass=${decode_studyid2}`} />
    </div>
  );
}

export async function generateStaticParams() {
  const data = [];

  const res = await fetch(`${process.env.BACKEND_URL}study/getcategory`);
  if (!res.ok) throw new Error("Failed to fetch data");
  const resJson = await res.json();

  for (const item1 of resJson.data) {
    item1.data.forEach((item2) => data.push({ studyid1: item1.title, studyid2: item2 }));
  }
  return data;
}
