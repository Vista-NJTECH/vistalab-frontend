import Sidebar from "./Sidebar";

export default function ScheduleLayout({ children }) {
  return (
    <div className='w-full flex-1 frame flex flex-col md:flex-row gap-10'>
      <Sidebar />
      {children}
    </div>
  );
}
