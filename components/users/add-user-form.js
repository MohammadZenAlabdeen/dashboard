'use client'
import { useState, useEffect } from 'react'
import SaveBtn from '../all-btn/main-btn/save-btn';
import Spinner from "../main-spinner/spinner";
import { useRouter } from 'next/navigation'

function AddUserForm() {

    const router = useRouter()
    const [newUser, setNewUser] = useState(
        {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',

        }
    );
    const [roles, setRoles] = useState(null)

    useEffect(() => {
        async function fetchRoles() {
            const res = await fetch('/api/roles')
            const data = await res.json()
            setRoles(data)
        }
        fetchRoles()

    }, [])

    if (!roles) return <Spinner />

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = '/api/users';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();
            console.log('Add User Done', data);
            if (response.ok) {
                return router.push('/users')
            }

        } catch (error) {
            console.log('Error Add User:', error);
        }
    };

    return (
        <form className="w-full px-2 " onSubmit={handleSubmit}>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Email</label>
                <input type="email" id="email" name="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your Email" required />
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Name</label>
                <input type="text" id="name" name="name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your Name" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Password</label>
                <input type="password" id="password" name="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
            </div>
            <div className="mb-5">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Confirm confirmPassword</label>
                <input type="password" id="confirmPassword" value={newUser.confirmPassword} onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
            </div>

            <div className="mb-5">
                <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
                <select id="roles" name='roles' onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="bg-gray-50  border border-secondary text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                        (roles.role).map((role) => (
                            <option key={role._id} value={role._id}>{role.name}</option>
                        ))
                    }
                </select>
            </div>
            <SaveBtn />
        </form>
    )
}

export default AddUserForm
