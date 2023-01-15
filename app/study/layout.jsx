import Sidebar from "./Sidebar";
import { StudyContextProvider } from "./components";

export default function ScheduleLayout({ children }) {
  return (
    <div className='w-full frame flex flex-col md:flex-row gap-7'>
      <StudyContextProvider>
        <Sidebar />
        {children}
      </StudyContextProvider>
    </div>
  );
}
