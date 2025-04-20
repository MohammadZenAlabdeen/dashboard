import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddBtn from "../all-btn/main-btn/add-btn";

function UsersTabs() {

    return (
        <div className=" bg-light w-full flex flex-col rounded-lg justify-between mb-3 sm:flex-row space-y-1 py-1 sm:space-y-0 sm:space-x-2 px-3 sm:py-3">
            <div className="">
                <TabsList className="space-x-3">
                    <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-light px-10 py-2 sm:px-15 bg-secondary  text-title-thirdly rounded-lg cursor-pointer hover:bg-title-black font-bold text-lg">
                        Users
                    </TabsTrigger>
                    <TabsTrigger value="roles" className="data-[state=active]:bg-primary data-[state=active]:text-light px-10 py-2 sm:px-15 bg-secondary text-title-thirdly cursor-pointer rounded-lg hover:bg-title-black font-bold text-lg">
                        Roles
                    </TabsTrigger>
                </TabsList>
            </div>
            <div>
                <TabsContent value="users">
                    <AddBtn href='/users/add-user'>
                        Add User
                    </AddBtn>
                </TabsContent>
                <TabsContent value="roles">
                    <AddBtn href='/users/add-role'>
                        Add Role
                    </AddBtn>
                </TabsContent>
            </div>
        </div>
    )
}

export default UsersTabs
