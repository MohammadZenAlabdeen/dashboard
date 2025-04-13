import SaveBtn from "@/components/all-btn/main-btn/save-btn";

function AddRolePage() {
  return (
    <div className="container mx-auto ">
                    <div className="py-4">
                        <h1 className="text-3xl font-bold text-title-black">Add Role</h1>
                    </div>

                    <form className="mx-auto">

                        <div className="mb-5 p-5 rounded-lg bg-light w-full ">
                            <label htmlFor="role" className="block mb-2 text-sm  font-medium text-title-black dark:text-white">Role Name</label>
                            <input type="role" id="role" className="bg-light w-full sm:w-2/3 md:w-1/3 border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Role" required />
                        </div>

                        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5 rounded-lg p-5 mb-4 bg-light">
                            <div>
                                <div className="flex items-center ps-4 border border-secondary rounded-lg  dark:border-gray-700">
                                    <input id="roleCheck" type="checkbox" value="" name="roleCheck" className="w-4 h-4 text-light bg-primary border-title-thirdly rounded-sm   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="roleCheck" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center ps-4 border border-secondary rounded-lg  dark:border-gray-700">
                                    <input id="roleCheck1" type="checkbox" value="" name="roleCheck1" className="w-4 h-4 text-light bg-primary border-title-thirdly rounded-sm   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="roleCheck1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center ps-4 border border-secondary rounded-lg  dark:border-gray-700">
                                    <input id="roleCheck2" type="checkbox" value="" name="roleCheck2" className="w-4 h-4 text-light bg-primary border-title-thirdly rounded-sm   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="roleCheck2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center ps-4 border border-secondary rounded-lg  dark:border-gray-700">
                                    <input id="roleCheck3" type="checkbox" value="" name="roleCheck3" className="w-4 h-4 text-light bg-primary border-title-thirdly rounded-sm   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="roleCheck3" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center ps-4 border border-secondary rounded-lg  dark:border-gray-700">
                                    <input id="roleCheck4" type="checkbox" value="" name="roleCheck4" className="w-4 h-4 text-light bg-primary border-title-thirdly rounded-sm   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="roleCheck4" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                                </div>
                            </div>
                        </div>

                        <SaveBtn />
                    </form>
                </div>
  )
}

export default AddRolePage
