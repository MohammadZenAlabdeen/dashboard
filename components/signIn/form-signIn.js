'use client'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function SignInForm() {

    const notify = (message) => toast(message);

    const [User, setUser] = useState(
        {
            email: '',
            password: ''
        }
    );


    const handleSubmit = async (e) => {

        e.preventDefault();

        const apiUrl = '/api/login';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(User),
            });


            const data = await response.json();
            console.log('Sign In Done', data);
            notify(data.message);

        } catch (error) {
            console.log('Error Log In:', error)
        }
    };


    return (
        <form className="w-full px-2" onSubmit={handleSubmit}>
            <div className="mb-6">
                <h2 className="text-primary min-w-sm text-4xl font-bold mb-2">Sign In</h2>
                <p className="text-secondary">Enter your name or email and password to sign in!</p>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Email</label>
                <input type="email" id="email" name="email" value={User.email} onChange={(e) => setUser({ ...User, email: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name or Email" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Password</label>
                <input type="password" id="password" name="password" value={User.password} onChange={(e) => setUser({ ...User, password: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
            </div>
            <button type="submit" className=" flex-1 inline-flex items-center justify-center cursor-pointer p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-title-black rounded-lg group bg-gradient-to-br to-primary from-secondary group-hover:from-secondary group-hover:to-primary hover:text-light dark:text-white">
                <span className="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-light dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Sign In
                </span>
            </button>
            <ToastContainer autoClose={3000} />
        </form>

    )
}

export default SignInForm
