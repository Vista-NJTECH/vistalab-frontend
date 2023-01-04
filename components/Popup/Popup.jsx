export default function Popup({ before, after }) {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/20 flex items-center justify-center'>
      {after.isProcessing ? (
        <div className='w-full max-w-xs flex flex-col items-center justify-center gap-4 bg-white p-5 rounded-md'>
          <h1 className='title text-3xl'>{after.message}</h1>
          {after.message !== "Processing..." && (
            <button onClick={() => after.confirmFun()} className='btn py-3 px-5'>
              确认
            </button>
          )}
        </div>
      ) : (
        <div className='bg-white p-5 rounded-xl flex flex-col items-center justify-center gap-5'>
          <h1 className='title text-2xl'>{before.title}</h1>
          <div className='flex flex-row gap-5'>
            {before.cancelFun && (
              <button onClick={() => before.cancelFun()} className='btn px-2 py-1'>
                取消
              </button>
            )}
            {before.confirmFun && (
              <button onClick={() => before.confirmFun()} className='btn px-2 py-1'>
                确认
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
