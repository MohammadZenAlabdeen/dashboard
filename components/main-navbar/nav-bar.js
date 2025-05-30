import { CgProfile } from "react-icons/cg";
import { SidebarTrigger } from "../ui/sidebar";
import LogOutBtn from "../all-btn/log-out-btn";

function NavBar({ name, role }) {

    return (
        <div className=" w-full relative top-0 right-0 flex justify-between items-center py-2 px-3   border-b-secondary bg-light">
            <div>
                <SidebarTrigger className='bg-primary ' />
            </div>
            <div className="flex items-center space-x-3 border-1 border-dashed border-title-thirdly p-2 bg-light rounded-full">
                <div className="text-title-secondary text-4xl">
                    <CgProfile />
                </div>
                <div>
                    <div className="flex flex-col justify-center items-center -space-y-2">
                        <div className="text-black text-md font-bold">
                            {name}
                        </div>
                        <div className="text-title-secondary text-md">
                            {role}
                        </div>
                    </div>
                </div>
                <LogOutBtn />
            </div>
        </div>
    )
}

export default NavBar

