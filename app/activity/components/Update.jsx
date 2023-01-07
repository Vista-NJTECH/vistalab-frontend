import { FaEdit } from "react-icons/fa";

export default function Update({ activity }) {
  return (
    <>
      <button className='text-gray-600 hover:text-gray-800'>
        <FaEdit size={17} />
      </button>
    </>
  );
}
