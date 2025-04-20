function SecondaryIntroBtn({ children }) {
    return (
        <button type="button" className=" flex-1 inline-flex items-center justify-center cursor-pointer p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-title-black rounded-lg group bg-gradient-to-br to-primary from-secondary group-hover:from-secondary group-hover:to-primary hover:text-light dark:text-white">
            <span className="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-light dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                {children}
            </span>
        </button>
    )
}

export default SecondaryIntroBtn
