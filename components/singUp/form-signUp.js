'use client'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


function SignUpForm() {
    
    const notify = (message) => toast(message);
    

    const [newUser, setNewUser] = useState(
        {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = '/api/register';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();
            console.log('Sign Up Done', data);

            notify(data.message);

        } catch (error) {
            console.log('Error Sign Up:', error);
        }
    };


    return (
        <form className="w-full px-2 " onSubmit={handleSubmit}>
            <div className="mb-6 ">

                <h2 className="text-light bg-primary inline text-center px-3 pb-2 rounded min-w-sm text-4xl font-bold ">Sign Up</h2>

                <p className="text-secondary mt-3">Enter your name or email and password to sign up!</p>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Email</label>
                <input type="email" id="email" name="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your Email" required />
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Name</label>
                <input type="text" id="name" name="name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your Name" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Password</label>
                <input type="password" id="password" name="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
            </div>
            <div className="mb-5">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Confirm confirmPassword</label>
                <input type="password" id="confirmPassword" value={newUser.confirmPassword} onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })} className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
            </div>
            <button type="submit" className=" flex-1 inline-flex items-center justify-center cursor-pointer p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-title-black rounded-lg group bg-gradient-to-br to-primary from-secondary group-hover:from-secondary group-hover:to-primary hover:text-light dark:text-white">
                <span className="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-light dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Sign Up
                </span>
            </button>
            <ToastContainer autoClose={3000} />
        </form>
    )
}

export default SignUpForm
