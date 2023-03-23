import FeedbackForm from "../components/Head/FeedbackForm";

export default function ScheduleLayout({ children }) {
  return (
    <div className='frame w-full flex flex-col gap-10'>
      {children}
      <div className='flex flex-col gap-2'>
        <h1 className='title text-2xl'>我要反馈</h1>
        <FeedbackForm />
      </div>
    </div>
  );
}
