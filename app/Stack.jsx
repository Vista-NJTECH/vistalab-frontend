import Link from "next/link";
import { stackData } from "./config";

function StackCard({ item }) {
  return (
    <div className='flex flex-col items-center justify-between gap-4 py-4 px-7 border-2 border-slate-300 rounded-xl'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <span className='text-9xl'>{item.icon}</span>
        <span className='text-2xl font-bold text-slate-700'>{item.title}</span>
        <span>{item.intro}</span>
      </div>
      <Link
        href={item.href}
        className='text-white bg-theme-dark duration-500 font-bold py-3 rounded-md w-full text-center hover:shadow-xl'
      >
        了解更多
      </Link>
    </div>
  );
}

export default function Stack() {
  return (
    <div className='flex flex-col items-center justify-center gap-20 px-48 py-28 bg-slate-100'>
      <h1 className='text-3xl font-bold text-slate-700'>我们的方向</h1>
      <div className='grid grid-cols-3 gap-5'>
        {stackData.map((item) => (
          <StackCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
