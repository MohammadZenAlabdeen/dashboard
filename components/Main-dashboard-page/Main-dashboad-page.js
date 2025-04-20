'use client'
import MainUsersPage from "@/components/users/main-users";
import MainCategoryesPage from "@/components/categoryes/main-categoryes";
import { usePathname } from "next/navigation";

function MainPage({ role }) {

    const path = usePathname();

    return (
        <div >

            { /* ----Categoryes---- */
                (path == '/categoryes') &&
                <MainCategoryesPage role={role} />
            }
            { /* ----Users---- */
                ((path == '/users')) &&
                <MainUsersPage />
            }

        </div>
    )
}

export default MainPage
