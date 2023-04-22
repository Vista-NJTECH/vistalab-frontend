import Link from "next/link";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Members() {
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <div className='w-full flex flex-col items-center justify-center gap-3'>
        <h1 className='title text-2xl'>登录后才能查看</h1>
        <Link href={{ pathname: "/login", query: { callbackUrl: "/members" } }} className='btn py-2 px-4'>
          Login
        </Link>
      </div>
    );

  const res = await fetch(`${process.env.BACKEND_URL}member/getall`);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  return (
    <div className='frame w-full flex flex-col items-start justify-center gap-2'>
      <div className='flex flex-row items-center justify-between'>
        <h1 className='title text-2xl'>成员信息</h1>
      </div>
      <div className='w-full overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr>
              <th className='p-2 bg-green-600 text-white'>ID</th>
              <th className='p-2 bg-green-600 text-white'>Name</th>
              <th className='p-2 bg-green-600 text-white'>Colleage</th>
              <th className='p-2 bg-green-600 text-white'>Specialty</th>
              <th className='p-2 bg-green-600 text-white'>Phonenum</th>
              <th className='p-2 bg-green-600 text-white'>Research</th>
              <th className='p-2 bg-green-600 text-white'>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 1 && "#f2f2f2" }}>
                <td className='p-2'>{item.id}</td>
                <td className='p-2'>{item.name}</td>
                <td className='p-2'>{item.colleage}</td>
                <td className='p-2'>{item.specialty}</td>
                <td className='p-2'>{item.phonenum}</td>
                <td className='p-2'>{item.research}</td>
                <td className='p-2'>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
