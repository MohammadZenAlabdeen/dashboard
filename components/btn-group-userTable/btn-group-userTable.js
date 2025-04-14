import Link from "next/link";
import { FaUserCheck, FaUserGear, FaUserMinus } from "react-icons/fa6";

function BtnGroupUserTable() {
    return (
        <div className="flex space-x-2">

            <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                <FaUserCheck />

            </button>
            <Link href='/users/username'>
                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                    <FaUserGear />

                </button>
            </Link>
            <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                <FaUserMinus />

            </button>

        </div>
    )
}

export default BtnGroupUserTable
