import { FaRegSquarePlus } from "react-icons/fa6";
import Link from "next/link";

function AddBtn({ children, href }) {
    return (
        <Link href={href}>
            <button type="button" className=" bg-primary text-light  py-2.5 px-5 sm:px-15 sm:text-lg font-bold rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-title-black">
                <FaRegSquarePlus />
                <p>{children}</p>
            </button>
        </Link>
    )
}

export default AddBtn
