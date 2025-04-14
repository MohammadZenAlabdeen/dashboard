'use client'
import { BiLogOutCircle } from "react-icons/bi";

function LogOutBtn() {

  async function handleLogOut(){
       await fetch("/api/logout");
    }


    return (
        <button onClick={handleLogOut} className="text-red-600 text-4xl cursor-pointer ">
            <BiLogOutCircle />
        </button>
    )
}

export default LogOutBtn
