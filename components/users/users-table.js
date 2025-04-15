'use client'


import { useState, useEffect } from 'react'
import Spinner from "../main-spinner/spinner";
import BtnGroupUserTable from "../btn-group-userTable/btn-group-userTable";

function UsersTable() {


    const [users, setUsers] = useState(null)

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('/api/users')
            const data = await res.json()
            setUsers(data)
        }
        fetchUsers()
    }, [])

    console.log(users);
    if (!users) return <Spinner />
    console.log(users.users)

    

    return (

        <table className="  text-sm text-left w-full text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-title-secondary  border-b-1 border-title-black uppercase bg-light shadow-2xl dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody >

                {
                    (users.users).map(user =>
                        (<tr key={user._id} className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly">

                            <td className="px-6 py-4">
                                {user.name}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>

                            <td className="px-6 py-4 ">
                                <p className="text-dark bg-title-thirdly inline py-1 px-2 rounded ">
                                    {user.role.name}
                                </p>
                            </td>
                            <td className="px-6 py-4">
                                <BtnGroupUserTable href={user._id}/>
                            </td>
                        </tr>)
                    )
                }

            </tbody>

        </table>


    )
}

export default UsersTable
