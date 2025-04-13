import { FaEye, FaRegNewspaper } from "react-icons/fa";

function MainCategoryesPage() {
    return (
        <div className="overflow-x-auto rounded-lg mt-4 ">
            <table className="w-full  text-sm text-left rounded-lg text-title-secondary dark:text-gray-400">
                <thead className="text-xs text-secondary uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4">
                            Managment & Leadership
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-2">

                                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                                    <FaEye />
                                </button>
                                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                                    <FaRegNewspaper />
                                </button>

                            </div>
                        </td>
                    </tr>

                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4">
                            Managment & Leadership
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-2">

                                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                                    <FaEye />
                                </button>
                                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                                    <FaRegNewspaper />
                                </button>

                            </div>
                        </td>
                    </tr>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4">
                            Managment & Leadership
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-2">

                                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                                    <FaEye />
                                </button>
                                <button className="p-2 bg-primary text-light text-xl rounded-md cursor-pointer hover:bg-title-thirdly hover:text-primary">
                                    <FaRegNewspaper />
                                </button>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MainCategoryesPage
