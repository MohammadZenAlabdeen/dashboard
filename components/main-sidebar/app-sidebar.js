'use client'
import { BookOpen, Calendar, ChartBarStacked, Cog, Gauge, GraduationCap, Map, Microscope, User, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Categoryes",
    url: "/categoryes",
    icon: ChartBarStacked,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: GraduationCap,
  },
  {
    title: "Venues",
    url: "/venues",
    icon: Map,
  },
  {
    title: "Timings",
    url: "/timings",
    icon: Calendar,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Users",
    url: "/users",
    icon: User,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: BookOpen,
  },
  {
    title: "SEO",
    url: "/seo",
    icon: Microscope,
  },
  {
    title: "Settings",
    url: "/Settings",
    icon: Cog,
  },
]

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarContent className='bg-light'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-2xl text-primary'>BSC</SidebarGroupLabel>
          <SidebarGroupContent className='h-full'>
            <SidebarMenu className=' space-y-1'>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={`${(path.startsWith(item.url)) ? ' bg-primary' : ''} hover:bg-primary py-7 `} >
                      <div className={`${(path.startsWith(item.url)) ? 'text-light' : 'text-secondary'}  flex items-center space-x-2 text-lg font-md  font-semibold`}><item.icon /><p>{item.title}</p></div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
