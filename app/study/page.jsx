import Link from "next/link";

import { CourseBody, Upload } from "./components";

export default function Page() {
  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='w-full flex flex-row items-center justify-between'>
        <Link href='/study' className='title text-xl text-theme hover:underline'>
          All
        </Link>
        <Upload />
      </div>
      <CourseBody url={""} />
    </div>
  );
}
