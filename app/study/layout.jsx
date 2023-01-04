import Sidebar from "./Sidebar";

export default function ScheduleLayout({ children }) {
  return (
    <div className='w-full h-full frame flex flex-col md:flex-row gap-10'>
      <Sidebar />
      {children}
    </div>
  );
}
