import Link from "next/link";
import { FaMinus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

function BtnGroupRolesTable({ href }) {
    const handleDelete = async () => {

        const apiUrl = `/api/roles/${href}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(),
            });

            const data = await response.json();
            console.log('Delete Role Done:', data);

        } catch (error) {
            console.log('Error Role Error:', error);
        }

    };
    return (
        <div className="flex space-x-2">
            <Link href={`/users/edit-role/${href}`}>
                <button
                    className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                    <IoSettings />
                </button>
            </Link>
            <form>
                <button
                    type="submit"
                    onClick={handleDelete}
                    className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                    <FaMinus />
                </button>
            </form>
        </div>
    )
}

export default BtnGroupRolesTable
