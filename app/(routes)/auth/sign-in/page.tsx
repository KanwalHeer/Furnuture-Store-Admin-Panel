'use client'; 
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react"; 
// import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 

  const router = useRouter();
  const { data: session, status } = useSession();  

  // Redirect user when the session is loaded and it's an admin
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email === process.env.NEXT_PUBLIC_USER_ROLE) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid Credentials");
        console.log("login error");
        setLoading(false); 
      } else {
        if (session?.user?.email === process.env.NEXT_PUBLIC_USER_ROLE) {
          // This will be handled by the useEffect hook
        } else {
          setError("Please login with admin credentials");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-teal-300">
    <div className="shadow-2xl p-8 rounded-lg bg-white max-w-md w-full space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Admin Portal</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          required
        />

        <button 
          type="submit"
          className={`bg-yellow-600 text-white font-bold cursor-pointer px-6 py-3 rounded-lg hover:bg-yellow-700 transition duration-300 ${loading && "opacity-50 cursor-not-allowed"}`}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {error && (
          <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md mt-4 text-center">
            {error}
          </div>
        )}

        <div
          className="text-center items-center justify-center flex flex-col gap-4 cursor-pointer"
          onClick={() => signIn('google')} 
        >
          <h1 className="text-lg text-gray-700">Or Sign in with Google</h1>
          <FaGoogle className="text-[#4285F4] text-3xl hover:text-red-700 transition" />
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">Need an account? <span className="underline text-blue-700">Sign Up</span></p>
      </div>
    </div>
  </div>
  );
}
