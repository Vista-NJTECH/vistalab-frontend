import Image from "next/image";
import Link from "next/link";

import { Edit } from "./components";

export default async function Page() {
  const res = await fetch(`http://124.223.196.177:8181/study/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const lessons = data.data;
  const prefix = data.prefix;
  return (
    <div className='w-full flex flex-col gap-5'>
      <Link href='/study' className='btn px-2 py-1 w-fit text-xl'>
        所有课程
      </Link>
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
