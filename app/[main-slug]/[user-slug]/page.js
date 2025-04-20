'use client'
import AddCategoryesPage from "@/components/categoryes/add-categoryes-page";
import AddRolePage from "@/components/users/add-role";
import AddUserPage from "@/components/users/add-user";
import { notFound, usePathname, href } from "next/navigation";

export default function EditUser() {

    const path = usePathname()

    return (
        <>
            {
                (path == '/users/add-user') &&
                <AddUserPage />
            }
            {
                (path === ('/users/edit-user')) &&
                notFound()
            }
            {
                (path == '/users/add-role') &&
                <AddRolePage />
            }
            {
                (path == '/categoryes/add-categoryes') &&
                <AddCategoryesPage />
            }
        </>
    )
}
