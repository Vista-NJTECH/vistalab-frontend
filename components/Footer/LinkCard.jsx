import Link from "next/link";
import { FaShare } from "react-icons/fa";

export default function LinkCard({ item }) {
  if (item.isLocal)
    return (
      <Link href={item.href} className='flex flex-row gap-1 items-center text-gray-500 hover:text-gray-700'>
        {item.title}
      </Link>
    );

  return (
    <a href={item.href} target='_blank' className='flex flex-row gap-1 items-center text-gray-500 hover:text-gray-700'>
      <h1>{item.title}</h1>
      <FaShare size={10} />
    </a>
  );
}
