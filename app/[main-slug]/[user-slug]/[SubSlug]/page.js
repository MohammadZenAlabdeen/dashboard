'use client'
import EditCatygoryPage from "@/components/categoryes/edit-category-page";
import EditRolePage from "@/components/users/edit-role";
import EditUserPage from "@/components/users/edit-user";
import { useParams, usePathname } from "next/navigation"

function SubUserPage() {

    const path = usePathname();
    const params = useParams();

    return (
        <>
            {
                (path.startsWith('/users/edit-user')) &&
                <EditUserPage userId={params.SubSlug} />
            }
            {
                (path.startsWith('/users/edit-role')) &&
                <EditRolePage roleId={params.SubSlug} />
            }
            {
                (path.startsWith('/categoryes/edit-category')) &&
                <EditCatygoryPage userId={params.SubSlug} />
            }
        </>
    )
}

export default SubUserPage
