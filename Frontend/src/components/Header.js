import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, ChevronDown, Menu } from 'lucide-react';
import { toast } from "react-hot-toast";
import logo from "../assest/logo_a.jpeg";
import { ShopContext } from "../Context/ShopContext";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition duration-300">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition duration-300">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition duration-300">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700 hover:text-green-600 transition duration-300">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {uniqueItem()}
              </span>
            </Link>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition duration-300"
              >
                {userDetails && userDetails.image ? (
                  <img src={userDetails.image} alt={userDetails.firstName} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <User className="h-6 w-6" />
                )}
                <ChevronDown className="h-4 w-4" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {isAdmin && (
                    <Link to="/newproduct" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      New Product
                    </Link>
                  )}
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout ({userDetails?.firstName})
                    </button>
                  ) : (
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
            <button
              className="md:hidden text-gray-700 hover:text-green-600 transition duration-300"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {showMobileMenu && (
          <nav className="md:hidden py-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-green-600 transition duration-300">Home</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-green-600 transition duration-300">About</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-green-600 transition duration-300">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

