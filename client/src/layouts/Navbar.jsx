import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isLoggedin } = useSelector((state) => state.user);

    

  return (
    <>
      <nav className="bg-gray-900 text-white shadow-md hidden md:block max-h-30 w-full ">
        <div className="container mx-auto  py-4 flex items-center justify-around">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className="text-4xl font-bold hover:text-gray-400 hidden md:block  "
            >
              OKroy
            </NavLink>
            <NavLink
              to="/"
              className="text-4xl font-bold hover:text-gray-400 block md:hidden"
            >
              <FaShopify />
            </NavLink>
          </div>

          {/* Search Box */}
          <div className="flex-1 mx-4 max-w-md">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-md text-black"
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 flex items-center justify-center">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className=" hover:text-gray-400 flex items-center gap-2 flex-col"
          >
            <FaShoppingCart className="text-2xl" />
            <div className="text-xl">Cart</div>
          </NavLink>

          {/* Account Section */}
          <div className="flex items-center space-x-4">
            {isLoggedin ? (
              <div className="relative">
                <div
                  className="flex items-center space-x-2 cursor-pointer flex-col"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaUserCircle className="text-2xl" />
                  <div className="text-xl">John </div>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-6 ring-2  w-48 bg-slate-700 text-white rounded-md shadow-lg py-2">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100 hover:text-black"
                    >
                      My Orders
                    </NavLink>
                    <button
                      className="block px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-black"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" className="text-lg hover:text-gray-400">
                  Login/Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      <nav className="bg-gray-900 text-white shadow-md h-[70px]  md:hidden max-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-around ">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className="text-4xl font-bold hover:text-gray-400 hidden md:block  "
            >
              Bazaarify
            </NavLink>
            <NavLink
              to="/"
              className="text-4xl font-bold hover:text-gray-400 block md:hidden"
            >
              <FaShopify />
            </NavLink>
          </div>

          {/* Search Box */}
          <div className="flex-1 mx-4 max-w-md">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-md text-black"
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 flex items-center justify-center">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <nav className="fixed  bottom-0 left-0 z-50 w-full h-[60px] bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-900 md:hidden">
        <div className="flex justify-around h-full max-w-lg mx-auto font-medium ">
          <NavLink to="/home" className="py-3">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <GoHome className="text-white text-4xl" />
            </button>
          </NavLink>
          <NavLink to="/cart" className="py-3">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 border-x border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <MdOutlineShoppingCart className="text-white text-4xl" />
            </button>
          </NavLink>
          <NavLink to="/profile" className="py-3">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600"
            >
              <CgProfile className="text-white text-4xl" />
            </button>
          </NavLink>
        </div>

        {/*
         */}
      </nav>
    </>
  );
};

export default Navbar;
