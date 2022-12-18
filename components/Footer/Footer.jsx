export default function Footer() {
  return (
    <footer className='md:mt-40 w-full py-10 bg-slate-200 flex gap-3 items-center justify-center bg-secondary-bg shadow-xl text-gray-600'>
      <span>&copy; Copyright {new Date().getFullYear()}</span>
      <a href='/' target='_blank' className='underline'>
        远景实验室
      </a>
    </footer>
  );
}
