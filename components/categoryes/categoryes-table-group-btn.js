'use client'
import Link from "next/link";
import { FaGear, FaMinus } from "react-icons/fa6";

function CategoryesTableGroupBtn({ href }) {

    const handleDelete = async () => {

        const apiUrl = `/api/categories/${href}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(),
            });

            const data = await response.json();
            console.log('Delete Category Done:', data);

        } catch (error) {
            console.log('Error Delete Category:', error);
        }
    };

    return (
        <div className="flex space-x-2">
            <Link href={`categoryes/edit-category/${href}`}>
                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                    <FaGear />
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

export default CategoryesTableGroupBtn
