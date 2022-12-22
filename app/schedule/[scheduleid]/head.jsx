export default function Head({ params: { scheduleid } }) {
  return (
    <>
      <title>{"日程安排 | " + decodeURIComponent(scheduleid)}</title>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <meta name='description' content='远景实验室主页' />
      <link rel='icon' href='/favicon.png' />
    </>
  );
}
