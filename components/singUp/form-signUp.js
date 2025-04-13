import SecondaryIntroBtn from "../all-btn/intro-btn/secondary-intro-btn"

function SignUpForm() {
    return (
        <form className="w-full px-2">
            <div className="mb-6 ">

                <h2 className="text-light bg-primary inline text-center px-3 pb-2 rounded min-w-sm text-4xl font-bold ">Sign Up</h2>

                <p className="text-secondary mt-3">Enter your name or email and password to sign up!</p>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Email</label>
                <input type="email" id="email" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your Email" required />
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Name</label>
                <input type="name" id="name" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your Name" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Password</label>
                <input type="password" id="password" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
            </div>
            <div className="mb-5">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Confirm confirmPassword</label>
                <input type="confirmPassword" id="confirmPassword" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
            </div>
            <SecondaryIntroBtn href='/'>
                Sign Up
            </SecondaryIntroBtn>
        </form>
    )
}

export default SignUpForm
