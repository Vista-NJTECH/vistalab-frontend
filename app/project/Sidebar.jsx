import Link from "next/link";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Sidebar() {
  const session = await unstable_getServerSession(authOptions);

  const res = await fetch(`${process.env.BACKEND_URL}project/getall`, {
    cache: "no-store",
    headers: { Authorization: session ? session.user.token : null },
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

  return (
    <div className='w-full h-fit md:max-w-xs md:sticky md:top-3 flex flex-col gap-3'>
      <h1 className='title text-2xl'>项目管理</h1>
      <div className='flex flex-col gap-2'>
        {data.data.map((item, index) => (
          <Link
            className='text-gray-700 hover:text-theme hover:border-theme w-fit border-b border-black'
            href={{
              pathname: `/project/${item.title}`,
              query: {
                id: item.id,
                members: item.members,
                ddl: item.ddl,
                detail: item.details,
                created_time: new Date(item.created_time).toISOString().split("T")[0],
              },
            }}
            key={index}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
