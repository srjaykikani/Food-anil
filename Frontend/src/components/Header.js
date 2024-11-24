import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, ChevronDown } from 'lucide-react';
import { toast } from "react-hot-toast";
import logo from "../assest/logo_a.jpeg";
import { ShopContext } from "../Context/ShopContext";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const { uniqueItem, userDetails } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
    setShowMenu(false);
    toast.success("Logged out successfully");
  };

  const isAdmin = userDetails?.email === process.env.REACT_APP_ADMIN_EMAIL;
  const isLoggedIn = !!localStorage.getItem("auth-token");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-16 w-20" />
        </Link>

        <div className="flex items-center space-x-4 md:space-x-6">
          <nav className="hidden space-x-4 md:flex md:space-x-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {uniqueItem()}
            </span>
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-1 rounded-full bg-gray-100 p-1 text-gray-700 hover:bg-gray-200"
            >
              {userDetails && userDetails.image ? (
                <img
                  src={userDetails.image}
                  alt={userDetails.firstName}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 rounded-full bg-gray-300 p-1" />
              )}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {isAdmin && (
                  <Link
                    to="/newproduct"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    New Product
                  </Link>
                )}
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout ({userDetails?.firstName})
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                )}
                <div className="md:hidden">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Home
                  </Link>
                  <Link
                    to="/menu"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Menu
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}