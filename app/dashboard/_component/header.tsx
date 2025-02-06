"use client"; 
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-100 text-yellow-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link href="/admin" className="text-xl font-bold">
          Admin Portal
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <nav
          className={`lg:flex lg:items-center lg:space-x-6 ${isMenuOpen ? "block" : "hidden"} absolute lg:static top-16 left-0 w-full lg:w-auto bg-slate-100 lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none z-50`}
        >
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
            <li>
              <Link
                href="/dashboard"
                className="hover:text-yellow-800 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/users"
                className="hover:text-yellow-800 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/orders"
                className="hover:text-yellow-800 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
            </li>
          </ul>
        </nav>

        {/* Welcome Message */}
        <div className="hidden lg:flex items-center space-x-4">
          <span>Welcome, Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;