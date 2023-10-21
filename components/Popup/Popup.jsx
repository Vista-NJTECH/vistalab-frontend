export default function Popup({ title, cancelFun, confirmFun }) {
  return (
    <div className='frame fixed top-0 left-0 w-screen h-screen bg-black/20 flex items-center justify-center'>
      <div className='bg-white max-w-sm p-5 rounded-xl flex flex-col items-center justify-center gap-5'>
        <h1 className='title text-2xl'>{title}</h1>
        <div className='flex flex-row gap-5'>
          <button onClick={() => cancelFun()} className='btn px-2 py-1'>
            取消
          </button>
          <button onClick={() => confirmFun()} className='btn px-2 py-1'>
            确认
          </button>
        </div>
      </div>
    </div>
  );
}
