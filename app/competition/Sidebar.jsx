import Link from "next/link";

export default async function Sidebar() {
  const res = await fetch(`${process.env.BACKEND_URL}competition/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const competitions = data.data.map((item) => item.name);

  return (
    <div className='w-full max-w-xs h-fit md:sticky md:top-3 flex flex-col gap-5'>
      <Link href='/competition' className='title text-2xl'>
        竞赛信息
      </Link>
      <div className='flex flex-col gap-3'>
        {competitions.map((item, index) => (
          <Link
            className='text-gray-700 hover:text-theme hover:border-theme w-fit'
            href={`/competition/${item}`}
            key={index}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
