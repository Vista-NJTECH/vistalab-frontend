import { Schedule, Head } from "./components";

export default async function Page() {
  const res = await fetch(`http://124.223.196.177:8181/schedule/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return (
    <div className='frame w-full flex flex-col gap-4'>
      <Head />
      <div className='flex flex-col gap-4'>
        {data.data.map((item, index) => (
          <Schedule key={index} schedule={item} />
        ))}
      </div>
    </div>
  );
}
