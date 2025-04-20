import NavBar from "@/components/main-navbar/nav-bar";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/main-sidebar/app-sidebar";
import { cookies } from "next/headers";
import ValidateToken from "@/utils/validate_token";


export default async function DashBoardLayout({ children }) {

  const token = (await cookies()).get("jwtToken");
  const payload = await ValidateToken(token.value);

  if (payload == null) {
    console.log("Payload Error");
  }
  else {
    console.log(payload)
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar role={payload.role} />
        <div className="w-full">
          <NavBar name={payload.name} role={payload.role} />
          <main className="w-full px-6" role={payload.role}>
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}