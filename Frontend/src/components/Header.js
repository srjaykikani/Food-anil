import React, { useState, useContext } from "react";
import logo from "../assest/logo_a.jpeg";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

import { FaUser } from "react-icons/fa";

import toast from "react-hot-toast";
import { ShopContext } from "../Context/ShopContext";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handlelogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");

    setShowMenu((preve) => !preve);
    toast("logout successfully");
  };

  const { uniqueItem, userDetails } = useContext(ShopContext);


  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-16">
            <img src={logo} alt="" className="h-full w-20" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>

            <Link to={"about"}>about</Link>
            <Link to={"contact"}>contact</Link>
          </nav>

          <div className="text-2xl text-slate-600 relative">
            <Link to={"/cart"}>
              <FaCartShopping />
            </Link>
            <div className="absolute -top-2 -right-2 text-white bg-red-600 h-4 w-4 rounded-full text-sm text-center flex justify-center items-center">
              {uniqueItem()}
            </div>
          </div>

          <div className=" text-slate-600">
            <div
              className="text-3xl cursor-pointer h-10 w-10 rounded-full overflow-hidden drop-shadow "
              onClick={handleShowMenu}
            >
              {userDetails && userDetails.image ? (
                <img src={userDetails.image} alt="" className="w-full h-full" />
              ) : (
                <FaUser />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userDetails.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New Product
                  </Link>
                )}
                {localStorage.getItem("auth-token") ? (
                  <p
                    className="cursor-pointer px-2 bg-red-500 text-white"
                    onClick={handlelogout}
                  >
                    LogOut ({userDetails.firstName})
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}

                <nav className=" text-base md:text-lg flex flex-col md:hidden mt:1">
                  <Link
                    to={""}
                    className="whitespace-nowrap cursor-pointer px-2 py-1"
                  >
                    Home
                  </Link>
                  <Link
                    to={"menu"}
                    className="whitespace-nowrap cursor-pointer px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link
                    to={"about"}
                    className="whitespace-nowrap cursor-pointer px-2 py-1"
                  >
                    about
                  </Link>
                  <Link
                    to={"contact"}
                    className="whitespace-nowrap cursor-pointer px-2 py-1"
                  >
                    contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
