import Link from "next/link";
import { FaUserMinus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

function RolesTable() {
    return (
        <div>
            <table className="  text-sm text-left w-full text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-title-secondary  border-b-1 border-title-black uppercase bg-light shadow-2xl dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Users
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>

                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>

                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>

                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>

                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>
                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>

                    <tr className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                        <td className="px-6 py-4 ">
                            <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">role</p>
                        </td>

                        <td className="px-6 py-4">
                            Omar
                        </td>

                        <td className="px-6 py-4">
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
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default RolesTable
