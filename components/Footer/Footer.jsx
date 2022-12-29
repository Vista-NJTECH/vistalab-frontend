import { footerLinks } from "./config";

export default function Footer() {
  return (
    <footer className='w-full py-7 bg-slate-200 flex flex-col gap-3 items-center justify-center bg-secondary-bg text-gray-600'>
      <span>&copy; Copyright {new Date().getFullYear()}</span>
      <div className='flex flex-row gap-2 items-center justify-center'>
        {footerLinks.map((item, index) => (
          <a key={index} href={item.href} target='_blank' className='underline'>
            {item.title}
          </a>
        ))}
      </div>
    </footer>
  );
}
