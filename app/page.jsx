import { Header, Awards, Stacks } from "./components";

export default function Page() {
  return (
    <div className='flex flex-col gap-40'>
      <Header />
      <Awards />
      <Stacks />
    </div>
  );
}
