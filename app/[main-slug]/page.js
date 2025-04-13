'use client'
import MainUsersPage from "@/components/users/main-users";
import MainCategoryesPage from "@/components/categoryes/main-categoryes";

import { notFound, usePathname } from "next/navigation";





function MainDashBoardPage() {
  const path = usePathname();

  if(!path.startsWith('/categoryes') && !path.startsWith('/users')){
    notFound();
  }
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

export default MainDashBoardPage