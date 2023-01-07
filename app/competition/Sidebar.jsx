import Link from "next/link";

export default async function Sidebar() {
  const res = await fetch(`${process.env.BACKEND_URL}competition/getall`, { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const competitions = data.data.map((item) => item.name);

  return (
    <div className='w-full max-w-xs flex flex-col gap-3'>
      <h1 className='title text-3xl'>竞赛信息</h1>
      <div className='flex flex-col gap-1'>
        {competitions.map((item, index) => (
          <Link className='text-gray-700 hover:text-theme w-fit' href={`/competition/${item}`} key={index}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
