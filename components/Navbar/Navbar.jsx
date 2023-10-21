import NormalNavbar from "./Normal/NormalNavbar";
import MobileNavbar from "./Mobile/MobileNavbar";

export default function Navbar() {
  return (
    <div className='z-10 frame py-3 shadow-md flex flex-row w-full items-center justify-between relative bg-cover bg-right-top'>
      <NormalNavbar />
      <MobileNavbar />
    </div>
  );
}
