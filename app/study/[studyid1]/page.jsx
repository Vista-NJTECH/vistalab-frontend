import Link from "next/link";

import { sidebarData } from "../config";
import { Upload, CourseBody } from "../components";

export default async function Page({ params: { studyid1 } }) {
  const decode_studyid1 = decodeURIComponent(studyid1);

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
        </div>
        <Upload />
      </div>
      <CourseBody url={`&class=${decode_studyid1}`} />
    </div>
  );
}
