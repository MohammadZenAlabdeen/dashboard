'use client'
import Link from "next/link";
import { FaUserMinus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { useState, useEffect } from 'react'


function RolesTable() {

    const [roles, setRoles] = useState(null)

    useEffect(() => {
        async function fetchRoles() {
            const res = await fetch('/api/roles')
            const data = await res.json()
            setRoles(data)
        }
        fetchRoles()
    }, [])

    console.log(roles);
    if (!roles) return <div>Loading...</div>

    return (
        <div>




            <table className="  text-sm text-left w-full text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-title-secondary  border-b-1 border-title-black uppercase bg-light shadow-2xl dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/*<th scope="col" className="px-6 py-3">
                            Id
                        </th>*/}
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

                    {
                        (roles.role).map((role) => (
                            <tr key={role._id} className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                                {/*
                                <td ke className="px-6 py-4 ">
                                    <p className="text-dark wrap-break-word  inline text-sm rounded ">

                                        {role._id}

                                    </p>
                                </td>
                                */}
                                <td ke className="px-6 py-4 ">
                                    <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">

                                        {role.name}

                                    </p>
                                </td>

                                <td className="px-6 py-4">
                                    {(role.users).length} {/*add role users later*/}
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
                        ))
                    }

                </tbody>
            </table>

            {/*items*/}

        </div>
    )
}

export default RolesTable
