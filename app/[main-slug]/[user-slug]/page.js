'use client'
import AddRolePage from "@/components/users/add-role";
import AddUserPage from "@/components/users/add-user";
import EditUserPage from "@/components/users/edit-user";

import { notFound, usePathname } from "next/navigation";




export default function EditUser() {

    const path = usePathname()




    return (
        <>
            {
                (path == '/users/add-user') &&
                <AddUserPage />
            }
            {
                (path == '/users/username') &&
                <EditUserPage />
            }
            {
                (path == '/users/add-role') &&
                <AddRolePage />
            }

        </>
    )
}
