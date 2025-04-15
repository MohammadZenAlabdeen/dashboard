import Link from "next/link";

import { FaUserCheck, FaUserGear, FaUserMinus } from "react-icons/fa6";

function BtnGroupUserTable({ href }) {


    

        const handleRemove =() => {
            
            fetch('/api/users/67febcc0b1f8dadbc542b22f', // /api/users/{ href }
                { method: 'DELETE' }
            )
                .then(() => this.setState(
                    { status: 'Delete successful' }
                ));
        }
    


    return (
        <div className="flex space-x-2">

            <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                <FaUserCheck />

            </button>
            <Link href={`/users/edit-user/${href}`}>
                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                    <FaUserGear />

                </button>
            </Link>
            <button
                onClick={handleRemove}
                className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                <FaUserMinus />

            </button>

        </div>
    )
}

export default BtnGroupUserTable
