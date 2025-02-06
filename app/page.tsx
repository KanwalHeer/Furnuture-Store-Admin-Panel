import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <h1 className="text-center font-extrabold text-3xl sm:text-4xl md:text-6xl m-8 sm:m-10 lg:m-14">
        Welcome to Funiro Store!
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
        {/* Login Button */}
        <button className="text-white hover:text-white px-12 py-3 bg-yellow-600 hover:bg-yellow-700 text-lg font-bold rounded-lg shadow-lg">
          <Link href={'/auth/sign-in'}>Login</Link>
        </button>
      </div>
      
      {/* Images */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-8 lg:mt-12">
        <div className="flex justify-center items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Image src={'/b1.png'} alt="image" width={500} height={400} className="w-full h-auto" />
        </div>
        <div className="flex justify-center items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Image src={'/b5.png'} alt="image" width={500} height={400} className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}
