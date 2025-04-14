import Link from "next/link";
import { FaUserMinus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

function BtnGroupRolesTable() {
    return (
        <div className="flex space-x-2">


            <Link href='/users/username'>
                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                    <IoSettings />
                </button>
            </Link>
            <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                <FaUserMinus />

            </button>

        </div>
    )
}

export default BtnGroupRolesTable
