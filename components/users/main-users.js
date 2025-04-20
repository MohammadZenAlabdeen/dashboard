import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsersTable from "@/components/users/users-table";
import UsersTabs from "@/components/users/users-tabs";
import RolesTable from "@/components/users/roles-table";

function MainUsersPage() {

    return (
        <div className="container mx-auto">

            <Tabs defaultValue="users" className=" shadow-xl rounded-lg mb-4 flex flex-col items-center">

                <div className="py-4 self-start">
                    <TabsContent value="users"> <h1 className="text-3xl font-bold text-title-black">Manage Users</h1></TabsContent>
                    <TabsContent value="roles"> <h1 className="text-3xl font-bold text-title-black">Manage Roles</h1></TabsContent>
                </div>

                <UsersTabs />
                <TabsContent value="users" className="overflow-auto w-full rounded-lg">
                    <UsersTable />
                </TabsContent>
                <TabsContent value="roles" className=" overflow-auto w-full rounded-lg">
                    <RolesTable />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default MainUsersPage
