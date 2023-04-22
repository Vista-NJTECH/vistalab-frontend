import { getServerSession } from "next-auth/next";

import CycleCard from "./CycleCard";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { DeleteProject } from "../components";

export default async function Page({ params: { projectid }, searchParams }) {
  const session = await getServerSession(authOptions);
  const project = { title: decodeURIComponent(projectid), ...searchParams };

  const headers = session
    ? { cache: "no-store", headers: { Authorization: session.user.token } }
    : { cache: "no-store" };

  const res = await fetch(`${process.env.BACKEND_URL}project/getproject?id=${project.id}`, headers);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  return (
    <div className='w-full flex flex-col gap-7'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-2'>
          <h1 className='title text-2xl'>{project.title}</h1>
          <DeleteProject project={project} />
        </div>
        <div className='flex flex-col gap-1 bg-gray-200 rounded-md p-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
            <div className='flex flex-row'>
              <span>项目成员：</span>
              <span>{project.members}</span>
            </div>
            <div className='flex flex-row'>
              <span>项目状态：</span>
              <span>{project.state == 1 ? "进行中" : "已停止"}</span>
            </div>
            <div className='flex flex-row'>
              <span>开始时间：</span>
              <span>{project.stl}</span>
            </div>
            <div className='flex flex-row'>
              <span>截止时间：</span>
              <span>{project.ddl}</span>
            </div>
          </div>
          <div>
            <span className='whitespace-nowrap'>项目简介：</span>
            {project.detail}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className='title text-xl'>项目周期(共{Number(project.cycles)}个周期)</h1>
        <div className='flex flex-col gap-7'>
          {Array.from(Array(Number(project.cycles) > data.data.length ? data.data.length : Number(project.cycles))).map(
            (item, index) => (
              <CycleCard
                key={index}
                project_id={project.id}
                index={index + 1}
                cycle={data.data.find((item) => item.cycle === index + 1)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
