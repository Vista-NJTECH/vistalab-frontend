import { Submit } from "../components/Submit";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

function ProjectCard({ project }) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='title text-3xl'>{project.title}</h1>
      <div className='flex flex-col gap-3 p-2 rounded-md'>
        <div className='flex flex-row gap-1'>
          <span className='whitespace-nowrap title'>简介：</span>
          <span className='title'>{project.details}</span>
        </div>
        <div className='flex flex-row gap-1'>
          <span className='whitespace-nowrap title'>成员：</span>
          <span className='title'>{project.mambers}</span>
        </div>
      </div>
    </div>
  );
}

function CycleCard({cycle}) {
  const values = Object.values(cycle)[0]
  return (
    <div>
      <h2 className="text-xl">第{values[0].cycle}周</h2>
      <table className="w-full text-left table-collapse mt-4">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">Member</th>
            <th className="px-4 py-2">本周期工作</th>
            <th className="px-4 py-2">下周期计划</th>
            <th className="px-4 py-2">备注与意见</th>
          </tr>
        </thead>
        <tbody>
          {values.map((item) => (
            <tr key={item.id} className="text-gray-700 hover:bg-gray-100">
              <td className="border px-2 py-1" style={{width:'40px',height:'40px',maxHeight:'40px',overflowY:'auto'}}>{item.name}</td>
              <td className="border px-2 py-1" style={{width:'200px',height:'100px',maxHeight:'100px',overflowY:'auto'}}>{item.current_work}</td>
              <td className="border px-2 py-1" style={{width:'100px',height:'100px',maxHeight:'100px',overflowY:'auto'}}>{item.future_plan}</td>
              <td className="border px-2 py-1" style={{width:'100px',height:'100px',maxHeight:'100px',overflowY:'auto'}}>{item.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function Page({ params: { projectid } }) {
  const session = await unstable_getServerSession(authOptions);
  const res = await fetch(`${process.env.BACKEND_URL}project/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  const decoded_projectid = decodeURIComponent(projectid);
  const project = data.data.find((item) => item.title === decoded_projectid);
  var token
  if(!session){
    token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGFzc3dvcmQiOiIiLCJ1c2VybmFtZSI6ImRvaXJ5IiwibmFtZSI6IiIsImVtYWlsIjoiIiwiYXZhdGFyIjoiIiwibGV2ZWwiOiIiLCJwX2dyb3VwIjoiZG9pcnksY29tbW9uLHN0dWR5YSxhZG1pbiIsImNyZWF0ZWRfdGltZSI6IiIsImlhdCI6MTY3MzMyNDk0NSwiZXhwIjoxNjc0MTg4OTQ1fQ.SPjPcUdvkXkSpbfNE5sNHbl238UQ9XpXbzAPI5-vs24'
  }else{
    token = session.user.token
  }
  
  const resp = await fetch(`${process.env.BACKEND_URL}project//getproject?id=` + project.id,{
    headers: { Authorization: token },
   cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  const datap = (await resp.json()).data;

  return (
    <div className='w-full border rounded-lg'>
      <ProjectCard project={project} />
      {datap.length !== 0 && (
        <div className='flex flex-col gap-2'>
          <div className='w-full flex flex-row items-center justify-between'>
            <h1 className='title text-2xl'>项目周期</h1>
          </div>
          {datap.map((item, index) => (
            <CycleCard key={index} cycle={item} />
          ))}
        </div>
      )}
    </div>
  );
}
