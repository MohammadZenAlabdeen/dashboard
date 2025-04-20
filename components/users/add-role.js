'use client'
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import Spinner from "../main-spinner/spinner";
import SaveBtn from "@/components/all-btn/main-btn/save-btn";
import { useRouter } from 'next/navigation'

function AddRolePage() {
    const router = useRouter()

    const notify = (message) => toast(message);

    const [permissions, setPermissions] = useState(null)

    const [newRole, setNewRole] = useState(
        {
            role: '',
            permissions: []
        }
    );

    useEffect(() => {
        async function fetchPermission() {
            const res = await fetch('/api/permissions')
            const data = await res.json()
            setPermissions(data)
        }
        fetchPermission()
    }, [])

    console.log(permissions);
    if (!permissions) return <Spinner />
    console.log(permissions)


    const handleSubmit = async (e) => {
        e.preventDefault();

        let form = e.target;
        let formData = new FormData(form);
        let formDataObj = Object.fromEntries(formData.entries())

        setNewRole(formDataObj);

        const apiUrl = `/api/roles`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRole),
            });

            const data = await response.json();
            console.log('Create Role Done:', data);
            if (response.ok) {
                return router.push('/users')
            }

            notify(data.message)
        } catch (error) {
            console.log('Error Create Role:', error);
        }


    }
    console.log(newRole.permissions)


    const addSinglePermission = (e) => {

        let permissionCheck = e.target.checked;

        if (permissionCheck == true) {
            if (!newRole.permissions.includes(e.target.value)) { newRole.permissions.push(e.target.value) }
            if (newRole.permissions.includes(e.target.value)) { null }
        } else {
            if (!newRole.permissions.includes(e.target.value)) { null }
            else (newRole.permissions = newRole.permissions.filter(item => item !== e.target.value))
        }


        console.log(newRole)
    }
    console.log(newRole)
    return (
        <div className="container mx-auto ">
            <div className="py-4">
                <h1 className="text-3xl font-bold text-title-black">Add Role</h1>
            </div>

            <form className="mx-auto" onSubmit={handleSubmit}>

                <div className="mb-5 p-5 rounded-lg bg-light w-full ">
                    <label htmlFor="role" className="block mb-2 text-sm  font-medium text-title-black dark:text-white">Role Name</label>
                    <input
                        type="text"
                        name='role'
                        onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                        id="role"
                        className="bg-light w-full sm:w-2/3 md:w-1/3 border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Role" required />
                </div>

                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5 rounded-lg p-5 mb-4 bg-light">
                    {
                        permissions.permissions.map(
                            permission =>
                                <div key={permission._id}>
                                    <div className="flex items-center ps-4 border border-secondary rounded-lg  dark:border-gray-700">
                                        <input
                                            id={permission._id}
                                            type="checkbox"
                                            value={permission._id}
                                            onChange={addSinglePermission}
                                            name='permission'
                                            className="w-4 h-4 text-light bg-primary border-title-thirdly rounded-sm   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="roleCheck4" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{permission.name}</label>
                                    </div>
                                </div>
                        )
                    }

                </div>
                <SaveBtn />
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddRolePage
