'use client'
import { BiLogOutCircle } from "react-icons/bi";
import { useRouter } from 'next/navigation'
function LogOutBtn() {
    const router = useRouter();

    const handleLogOut = async () => {

        const apiUrl = '/api/logout';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log('Sign Out Done:', data);
            if (response.ok) {
                return router.push('/sign-in')
            }

        } catch (error) {
            console.log('Error Sign Out:', error);
        }
    };

    return (
        <button
            onClick={handleLogOut}
            className="text-red-600 text-4xl cursor-pointer ">
            <BiLogOutCircle />
        </button>
    )
}

export default LogOutBtn
