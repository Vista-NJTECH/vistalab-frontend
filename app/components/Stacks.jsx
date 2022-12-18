import Link from "next/link";
import { stacksData } from "./config";

function StacksCard({ item }) {
  return (
    <div className='flex flex-col items-center justify-between gap-4 py-4 px-7 border-2 border-slate-300 rounded-xl'>
      <div className='flex flex-col items-center justify-center gap-4'>
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

export default function Stacks() {
  return (
    <div className='bg-slate-100 flex flex-col items-center justify-center gap-5 lg:gap-20 px-10 md:px-48 py-14 md:py-20'>
      <h1 className='text-3xl font-bold text-slate-700'>我们的研究方向</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {stacksData.map((item, index) => (
          <StacksCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
