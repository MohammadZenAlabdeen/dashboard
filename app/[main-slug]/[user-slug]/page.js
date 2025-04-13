'use client'
import AddRolePage from "@/components/users/add-role";
import EditUserPage from "@/components/users/edit-user";

import { notFound, usePathname } from "next/navigation";




export default function EditUser() {

    const path = usePathname()

    if (!path.endsWith('/users/username') && !path.startsWith('/users/add-role')) {
        notFound();
    }



    return (
        <>
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
