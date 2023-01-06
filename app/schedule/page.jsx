import { Schedule, Head } from "./components";

import useTimeLeft from "../../lib/useTimeLeft";

export default async function Page() {
  const res = await fetch(`${process.env.BACKEND_URL}schedule/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const validData = [];
  const abandonedData = [];
  const expiredData = [];
  data.data.forEach((item) => {
    if (item.state !== 1) abandonedData.push(item);
    else if (useTimeLeft(item.date) === 0) expiredData.push(item);
    else validData.push(item);
  });

  return (
    <div className='frame w-full flex flex-col gap-5'>
      {validData.length !== 0 && (
        <div className='flex flex-col gap-2'>
          <Head />
          {validData.map((item, index) => (
            <Schedule key={index} schedule={item} />
          ))}
        </div>
      )}
      {abandonedData.length !== 0 && (
        <div className='flex flex-col gap-2'>
          <h1 className='title text-2xl'>失效日程</h1>
          <div className='flex flex-col gap-2'>
            {abandonedData.map((item, index) => (
              <Schedule key={index} schedule={item} />
            ))}
          </div>
        </div>
      )}
      {expiredData.length !== 0 && (
        <div className='flex flex-col gap-2'>
          <h1 className='title text-2xl'>过期日程</h1>
          <div className='flex flex-col gap-2'>
            {expiredData.map((item, index) => (
              <Schedule key={index} schedule={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
