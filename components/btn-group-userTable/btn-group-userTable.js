'use client'
import Link from "next/link";
import { FaUserGear, FaUserMinus } from "react-icons/fa6";

function BtnGroupUserTable({ href }) {

    const handleDelete = async () => {

        const apiUrl = `/api/users/${href}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(),
            });

            const data = await response.json();
            console.log('Delete User Done:', data);

        } catch (error) {
            console.log('Error User Error:', error);
        }
    };



    return (
        <div className="flex space-x-2">
            <Link href={`/users/edit-user/${href}`}>
                <button
                    className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                    <FaUserGear />
                </button>
            </Link>
            <form>
                <button
                    type="submit"
                    onClick={handleDelete}
                    className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                    <FaUserMinus />
                </button>
            </form>

        </div>
    )
}

export default BtnGroupUserTable
