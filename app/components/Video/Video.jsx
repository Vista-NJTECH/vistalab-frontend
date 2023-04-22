export default function Video() {
  return (
    <section className='w-full bg-slate-100 frame flex flex-col items-center justify-center gap-10'>
      <h1 className='title text-3xl'>我们的宣传视频</h1>
      <video
        controls
        autoPlay={false}
        preload='metadata'
        poster='/poster.png'
        controlslist='nodownload noremoteplayback'
        className='w-full max-w-4xl aspect-video shadow-xl rounded-md'
      >
        <source src='/video.mp4' type='video/mp4' />
        <p>Your browser doesn't support HTML video.</p>
      </video>
    </section>
  );
}
