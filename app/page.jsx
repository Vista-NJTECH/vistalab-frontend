import Header from "./Header";
import Stacks from "./Stacks";
import Awards from "./Awards";

export default function Page() {
  return (
    <div className='flex flex-col gap-40'>
      <Header />
      <Awards />
      <Stacks />
    </div>
  );
}
