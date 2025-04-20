function NotFoundPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center font-mono space-y-5 px-5 text-center text-light bg-gradient-to-br from-title-black via-primary to-primary">
      <div className="bg-light py-3 px-5 font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <h1 className="text-primary">404</h1>
      </div>
      <div>
        <h1 className="text-4xl md:text-6xl">PAGE NOT FOUND!</h1>
      </div>
      <div>
        <h1 className="text-1xl md:text-2xl">check that you typed the address correctly, go back to previous
          page or try using our site serch to find somthing specific.</h1>
      </div>
    </div>
  )
}

export default NotFoundPage
