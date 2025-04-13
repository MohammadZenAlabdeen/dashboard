import { FaSync } from "react-icons/fa";

function EditUserPage() {

  return (
    <div className="container mx-auto ">
                    <div className="py-4">
                        <h1 className="text-3xl font-bold text-title-black">Edit User</h1>
                    </div>
                    <form className="mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 rounded-lg p-6 mb-4 bg-light">
                            <div className="mb-5 ">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Name</label>
                                <input type="text" id="name" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required />
                            </div>
                            <div className="mb-5 ">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Email</label>
                                <input type="email" id="email" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required />
                            </div>
                            <div className="mb-5 ">
                                <label htmlFor="pssword" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Password</label>
                                <input type="pssword" id="pssword" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                            </div>
                            <div className="mb-5 ">
                                <label htmlFor="Cpssword" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Confirm Password</label>
                                <input type="pssword" id="Cpssword" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                            </div>

                            <div className="mb-5 ">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Phone</label>
                                <input type="number" id="phone" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required />
                            </div>

                            <div>
                                <label htmlFor="Role" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Role</label>
                                <select id="Role" defaultValue="Choose Role" className="bg-light font-bold border border-secondary text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option className="font-extralight text-title-secondary">Choose Role</option>
                                    <option className="font-bold" value="coursesman">CoursesMan</option>
                                    <option className="font-bold" value="op">op</option>
                                    <option className="font-bold" value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" className=" bg-primary text-light py-2.5 px-15 text-md font-bold rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-title-black">
                            <FaSync />
                            <p>Update</p>
                        </button>
                    </form>
                </div>
  )
}

export default EditUserPage
