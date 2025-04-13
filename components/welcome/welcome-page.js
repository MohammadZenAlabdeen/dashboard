import { Link } from "lucide-react";
import PrimaryIntroButton from "../all-btn/intro-btn/primary-intro-btn";
import SecondaryIntroBtn from "../all-btn/intro-btn/secondary-intro-btn";

function WelcomePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="flex flex-col mx-auto text-center ">
        <div>
          <h1 className="mb-4 text-4xl sm:text-6xl font-extrabold text-black dark:text-white md:text-7xl lg:text-8xl">
            WELCOME TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary from-secondary">
              BSC
            </span><br />
            CENTER</h1>

          <p className=" text-3xl sm:5xl  sm:px-3 font-extralight max-w-2xl mb-5 text-title-secondary lg:text-xl dark:text-gray-400">
            based on
            <span className="text-transparent mx-1 font-light  bg-clip-text  bg-gradient-to-r to-primary from-secondary">
              high expertise
            </span>
            , excellent performance and
            <span className="text-transparent mx-1 font-light bg-clip-text bg-gradient-to-r to-primary from-secondary">
              strong
            </span>

            capabilities
            <br /> to  make  you the best version of
            <span className="text-transparent mx-1 font-light bg-clip-text bg-gradient-to-r to-primary from-secondary">
              yourself.
            </span>

          </p>
        </div>

        <div className="w-full flex justify-center items-center text-center">


          <SecondaryIntroBtn href="/sign-up" >
            
              Register Now
            
          </SecondaryIntroBtn>



          <PrimaryIntroButton href="/sign-in">
            
              Sign In
            
          </PrimaryIntroButton>


        </div>
      </div>

    </div>
  )
}

export default WelcomePage
