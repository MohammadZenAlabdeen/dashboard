'use client'
import EditUserPage from "@/components/users/edit-user";
import { useParams, usePathname } from "next/navigation"

 function SubUserPage() {

    const path = usePathname();
    const params = useParams();
 
   

    return (
        <> 
        {
            (path.startsWith('/users/edit-user')) &&
            <EditUserPage userId = {params.SubSlug}/>

        }

                     
        </>
    )
}

export default SubUserPage
