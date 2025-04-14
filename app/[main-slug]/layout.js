import NavBar from "@/components/main-navbar/nav-bar";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/main-sidebar/app-sidebar";


export default function DashBoardLayout({ children }) {



  return (


    <>




      <SidebarProvider>
        <AppSidebar />


        <div className="w-full">
          <NavBar />
          <main className="w-full px-6">
            {children}
          </main>
        </div>

      </SidebarProvider>



    </>

  );
}