import Link from "next/link";
import { unstable_getServerSession } from "next-auth";

import { UploadProject } from "./components";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Sidebar() {
  const session = await unstable_getServerSession(authOptions);

  const headers = session
    ? { cache: "no-store", headers: { Authorization: session.user.token } }
    : { cache: "no-store" };

  const res = await fetch(`${process.env.BACKEND_URL}project/getall`, headers);
  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

  return (
    <div className='w-full h-fit md:max-w-xs md:sticky md:top-3 flex flex-col gap-3'>
      <div className='flex flex-row gap-2'>
        <h1 className='title text-2xl'>项目管理</h1>
        <UploadProject />
      </div>
      <div className='flex flex-col gap-2'>
        {data.data.map((item, index) => (
          <Link
            className='text-gray-700 hover:text-theme hover:border-theme w-fit'
            href={{
              pathname: `/project/${item.title}`,
              query: {
                id: item.id,
                state: item.state,
                members: item.members,
                detail: item.details,
                cycles: item.cycles,
                ddl: new Date(item.ddl).toISOString().split("T")[0],
                stl: new Date(item.stl).toISOString().split("T")[0],
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
