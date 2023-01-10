import Link from "next/link";
import {Upload} from "./components"
export default async function Sidebar() {
  const res = await fetch(`${process.env.BACKEND_URL}project/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const projects = data.data.map((item) => item.title);

  return (
    <div className='w-72 h-fit md:sticky md:top-3 flex flex-col gap-3'>
      <Link href='/project' className='title text-2xl'>
        项目管理
        <Upload />
      </Link>
      <div className='flex flex-col gap-2 border'>
        {projects.map((item, index) => (
          <Link className='text-gray-700 hover:text-theme w-fit' href={`/project/${item}`} key={index}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
