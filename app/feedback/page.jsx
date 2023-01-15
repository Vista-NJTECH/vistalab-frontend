import DailyFeedbacks from "./DailyFeedbacks";

export default async function Page() {
  const res = await fetch(`${process.env.BACKEND_URL}feedback/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='title text-2xl'>所有反馈</h1>
      <div className='flex flex-col gap-5'>
        {data.data.map((item, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <h1>
              {item.date}(共{item.data.length}条反馈)
            </h1>
            <DailyFeedbacks dailyFeedbacks={item.data} />
          </div>
        ))}
      </div>
    </div>
  );
}
