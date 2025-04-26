'use client'
import { FaSync } from "react-icons/fa";
import { useState, useEffect } from 'react'
import Spinner from "../main-spinner/spinner";
import { useRouter } from 'next/navigation'

function EditUserPage({ userId }) {

    const router = useRouter()

    //Fetch Data
    const [roles, setRoles] = useState(null);
    const [users, setUsers] = useState(null);

    //Update Data
    const [upDateUser, setUpDateUser] = useState(
        {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: ''
        }
    );


    useEffect(() => {
        try {
            async function fetchRoles() {
                const res = await fetch('/api/roles')
                const data = await res.json()
                setRoles(data)
            }
            fetchRoles()

            async function fetchUsers() {
                const res = await fetch(`/api/users/${userId}`)
                const data = await res.json()
                setUsers(data);
            }
            fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }, [upDateUser])

    console.log(users);
    console.log(roles);

    if (!users) return <Spinner />

    const handleSubmit = async (e) => {

        e.preventDefault();

        let form = e.target;
        let formData = new FormData(form);
        let formDataObj = Object.fromEntries(formData.entries())

        if (formDataObj.name == "") {
            formDataObj.name = users.user.name;
        }
        if (formDataObj.email == "") {
            formDataObj.email = users.user.email;
        }

        if (formDataObj.role == '') {
            formDataObj.role = users.user.role._id;
        }



        setUpDateUser(formDataObj); //formDataObj is Object {key:"value"}

        const apiUrl = `/api/users/${userId}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(upDateUser),
            });

            const data = await response.json();
            console.log('Update User Done', data);
            if (response.ok) {
                return router.push('/users')
            }


        } catch (error) {
            console.log('Error Update User:', error);
        }

        console.log(upDateUser)
    };


    return (
        <div className="container mx-auto ">
            <div className="py-4">
                <h1 className="text-3xl font-bold text-title-black">Edit User</h1>
            </div>
            <form className="mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 rounded-lg p-6 mb-4 bg-light">
                    <div className="mb-5 ">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"

                            className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder={users.user.name} />
                    </div>
                    <div className="mb-5 ">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder={users.user.email} />
                    </div>
                    <div className="mb-5 ">
                        <label htmlFor="pssword" className="block mb-2 text-sm font-medium text-title-black dark:text-white">New Password</label>
                        <input type="password"
                            name="password"
                            id="password"
                            className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-  dark:focus:border-blue-500 "
                            placeholder="********" />
                    </div>
                    <div className="mb-5 ">
                        <label htmlFor="Cpssword" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Confirm New Password</label>
                        <input type="password"
                            name="confirmPassword"
                            id="Cpssword"
                            className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder="********" />
                    </div>
                    <div className="mb-5 ">
                        <label htmlFor="Crole" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Role</label>
                        <input type="text"
                            disabled
                            id="Crole"
                            className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder={users.user.role.name} />
                    </div>



                    <div className="mb-5">
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edit Role</label>
                        <select
                            id="role"
                            name='role'
                            className="bg-gray-50  border border-secondary text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            <option
                                key={users.user.role._id}
                                value={users.user.role._id}>
                                -- {users.user.role.name} --
                            </option>
                            {
                                (roles.role).map((role) => (

                                    <option
                                        key={role._id}
                                        value={role._id}>
                                        {role.name}</option>
                                ))

                            }
                        </select>
                    </div>
                </div>

                <button type="submit" className=" bg-primary text-light py-2.5 px-15 text-md font-bold rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-title-black">
                    <FaSync />
                    <p>Update</p>
                </button>

            </form>

        </div>

    )
}

export default EditUserPage
