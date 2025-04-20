import { FaArrowRightToBracket } from "react-icons/fa6";

function PrimaryIntroButton({ children }) {
  return (
    <button type="button" className="text-light flex-1 cursor-pointer bg-gradient-to-br from-secondary to-primary hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
      {children}
      <FaArrowRightToBracket className="ms-2 inline" />
    </button>
  )
}

export default PrimaryIntroButton
