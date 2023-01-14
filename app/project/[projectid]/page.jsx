import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../../../pages/api/auth/[...nextauth]";

function CycleCard({ cycle }) {
  const data = Object.values(cycle)[0];

  return (
    <div className='flex flex-col gap-1 w-full overflow-x-auto'>
      <h2 className='text-md'>第{Object.keys(cycle)[0]}周</h2>
      <table className='w-full text-left border-collapse'>
        <thead>
          <tr className='bg-theme text-white whitespace-nowrap rounded-md'>
            <th className='p-2'>项目成员</th>
            <th className='p-2'>本周期工作</th>
            <th className='p-2'>下周期计划</th>
            <th className='p-2'>备注与意见</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 1 && "#f2f2f2" }}>
              <td className='p-2'>{item.name}</td>
              <td className='p-2'>{item.current_work}</td>
              <td className='p-2'>{item.future_plan}</td>
              <td className='p-2'>{item.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function Page({ params: { projectid }, searchParams }) {
  const session = await unstable_getServerSession(authOptions);
  const project = { title: decodeURIComponent(projectid), ...searchParams };

  const res = await fetch(`${process.env.BACKEND_URL}project//getproject?id=${project.id}`, {
    cache: "no-store",
    headers: { Authorization: session ? session.user.token : null },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  return (
    <div className='w-full flex flex-col gap-7'>
      <div className='flex flex-col gap-3'>
        <h1 className='title text-2xl'>{project.title}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-1 bg-gray-200 rounded-md p-2'>
          <div className='flex flex-row'>
            <span>创建时间：</span>
            <span>{project.created_time}</span>
          </div>
          <div className='flex flex-row'>
            <span>截止时间：</span>
            <span>{project.ddl}</span>
          </div>
          <div className='flex flex-row'>
            <span>项目介绍：</span>
            <span>{project.detail}</span>
          </div>
          <div className='flex flex-row'>
            <span>项目成员：</span>
            <span>{project.members}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <h1 className='title text-xl'>项目周期</h1>
        <div className='flex flex-col gap-5'>
          {data.data.map((item, index) => (
            <CycleCard key={index} cycle={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
