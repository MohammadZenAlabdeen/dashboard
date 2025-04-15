'use client'
import MainUsersPage from "@/components/users/main-users";
import MainCategoryesPage from "@/components/categoryes/main-categoryes";

import { notFound, usePathname } from "next/navigation";



function MainPage() {

    const path = usePathname();

    
    return (
        <div >
            { /* ----Categoryes---- */
                (path == '/categoryes') &&
                <MainCategoryesPage />
            }
            { /* ----Users---- */

                (path == '/users') &&
                <MainUsersPage />
            }

        </div>
    )
}

export default MainPage
