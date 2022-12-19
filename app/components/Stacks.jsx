import Link from "next/link";
import { stacksData } from "./config";

function StacksCard({ item }) {
  return (
    <div className='flex flex-col items-center justify-between gap-4 py-4 px-7 border-2 border-slate-300 rounded-xl'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <span className='text-9xl'>{item.icon}</span>
        <span className='title text-2xl'>{item.title}</span>
        <span>{item.intro}</span>
      </div>
      <Link href={item.href} className='btn py-3 rounded-md w-full text-center'>
        了解更多
      </Link>
    </div>
  );
}

export default function Stacks() {
  return (
    <div className='frame bg-slate-100 flex flex-col items-center justify-center gap-5 lg:gap-20'>
      <h1 className='title text-3xl'>我们的研究方向</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {stacksData.map((item, index) => (
          <StacksCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
