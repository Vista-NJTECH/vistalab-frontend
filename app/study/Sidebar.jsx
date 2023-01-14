import Link from "next/link";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../../pages/api/auth/[...nextauth]";

function CategoryCard({ category }) {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='w-fit text-xl font-semibold text-gray-400'>{category.title}</h1>
      <div className='flex flex-col gap-1'>
        {category.data.map((item, index) => (
          <Link
            key={index}
            href={"/study/" + category.title + "/" + item}
            className='text-gray-700 hover:text-theme hover:border-theme w-fit border-b border-black'
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function Sidebar() {
  const session = await unstable_getServerSession(authOptions);

  const res = await fetch(`${process.env.BACKEND_URL}study/getcategory`, {
    cache: "no-store",
    headers: { Authorization: session ? session.user.token : null },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  return (
    <div className='md:w-64 h-fit md:sticky md:top-3 flex flex-col gap-4'>
      <h1 className='title text-2xl'>所有课程</h1>
      <div className='flex flex-col gap-4'>
        {data.data.map((item, index) => (
          <CategoryCard category={item} key={index} />
        ))}
      </div>
    </div>
  );
}
