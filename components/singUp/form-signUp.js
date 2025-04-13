'use client'
import { useState } from 'react';
import SecondaryIntroBtn from '../all-btn/intro-btn/secondary-intro-btn';
import { ToastContainer, toast } from 'react-toastify';
import { data } from 'autoprefixer';

function SignUpForm() {
    //  const notifySuccess = () => toast.success(`Sign up Completed ${newUser.name}`);
    // const notifyFail = () => toast.error('Sorry,Sign Up Failed!');
    // notifySuccess();
    // notifyFail();

    const [newUser, setNewUser] = useState(
        {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    );


    const handleSubmit = (e) => {

        e.preventDefault();

        const apiUrl = 'http://localhost:3000/api/register';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newUser,

        })
            
            .then((data) => {
                console.log('Sign Up Done', data)

            })
            .catch((error) => {
                console.log('Error Sign Up:', error)
            }
            );
    }


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
            <SecondaryIntroBtn >
                Sign Up
            </SecondaryIntroBtn>
            <ToastContainer autoClose={3000} />
        </form>
    )
}

export default SignUpForm
