import { Header, Awards, Stacks, Certificates } from "./components";

export default function Page() {
  return (
    <div className='flex flex-col gap-40'>
      <Header />
      <Awards />
      <Certificates />
      <Stacks />
    </div>
  );
}
