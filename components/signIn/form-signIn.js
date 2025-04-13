import PrimaryIntroButton from "../all-btn/intro-btn/primary-intro-btn"

function SignInForm() {
    return (
        <form className="w-full px-2">
        <div className="mb-6">
            <h2 className="text-primary min-w-sm text-4xl font-bold mb-2">Sign In</h2>
            <p className="text-secondary">Enter your name or email and password to sign in!</p>
        </div>
        <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Email Or Name</label>
            <input type="email" id="email" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name or Email" required />
        </div>
        <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-title-black dark:text-white">Password</label>
            <input type="password" id="password" className="bg-light border border-secondary text-title-black font-bold text-sm rounded-sm  focus:border-light block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
        </div>
        <PrimaryIntroButton href='/categoryes'>
        Sign In
        </PrimaryIntroButton>
    </form>
    )
}

export default SignInForm
