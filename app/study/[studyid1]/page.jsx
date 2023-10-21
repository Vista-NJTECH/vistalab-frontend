import Link from "next/link";

import { Upload, CourseBody } from "../components";

export default async function Page({ params: { studyid1 } }) {
  const decode_studyid1 = decodeURIComponent(studyid1);

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
        </div>
        <Upload />
      </div>
      <CourseBody url={`&class=${decode_studyid1}`} />
    </div>
  );
}
