import SignInForm from "@/components/signIn/form-signIn"
import SignInText from "@/components/signIn/text-signIn"

function SignInPage() {
    return (
        <>
            <div className="h-screen space-y-5 sm:space-y-0 w-full flex flex-col sm:flex-row">
                <div className="h-3/10 sm:h-screen  sm:px-1 sm:w-1/3 md:w-1/2 flex flex-col justify-center items-center text-center  bg-gradient-to-br from-title-black via-primary to-primary">
                    <SignInText />
                </div>
                <div className=" sm:h-screen  sm:w-2/3 md:w-1/2  flex justify-center items-center">
                    <div className=" max-w-sm mb-5 sm:mb-0">
                        <SignInForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage
