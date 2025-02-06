"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';  
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname(); 
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  
  if (!session) {
    return <div className="grid place-items-center h-screen">Loading...</div>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/auth/sign-in"; 
    if (typeof window !== "undefined") {
      localStorage.removeItem("chechoutRoute");
    }
  };

  // Sidebar menu items
  const menuItems = [
    { href: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { href: '/dashboard/orders', icon: '📦', label: 'Orders' },
    { href: '/dashboard/products', icon: '🛍️', label: 'Products' },
    { href: '/dashboard/users', icon: '👥', label: 'Customers' },
    { href: '/dashboard/analytics', icon: '📊', label: 'Analytics' },
  ];

  return (
    <div>
      {/* Menu Toggle Icon for Mobile */}
      <button
        className="lg:hidden p-2 fixed top-4 left-4 z-50 bg-yellow-800 text-white mt-8 rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="text-2xl text-white">☰</span> 
      </button>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative left-0 top-0 h-full w-64 p-6  text-white transform transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0 bg-yellow-600' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Close Icon for Sidebar on Mobile */}
        <button
          className="absolute top-4 right-4 text-3xl text-white lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✖️
        </button>

        {/* Logo or Brand Name */}
        <div className="mt-12 md:mt-4 lg:mt-4">
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-sm mt-4 mb-6 text-yellow-100">E-commerce Management</p>
        </div>

        {/* Menu Items */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg hover:bg-yellow-400 transition-colors 
                    ${pathname === item.href ? 'bg-yellow-400' : ''}`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-8 border-t border-yellow-400 pt-4">
          <button
            className="w-full flex items-center p-2 rounded-lg hover:bg-yellow-400 transition-colors"
            onClick={handleLogout}
          >
            <span className="text-xl mr-3 text-black">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;