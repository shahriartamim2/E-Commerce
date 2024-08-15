import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa"; // Import FaSearch for the search icon

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-around">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-4xl font-bold hover:text-gray-400">
            Bazaarify
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
        <NavLink to="/cart" className="text-2xl hover:text-gray-400 flex items-center gap-2" >
          <FaShoppingCart />
          <span>Cart</span>
        </NavLink>


        {/* Account Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <FaUserCircle className="text-2xl" />
            <span>Account</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
              <NavLink
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-700"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </NavLink>
              <NavLink
                to="/login"
                className="block px-4 py-2 hover:bg-gray-700"
                onClick={() => setIsDropdownOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block px-4 py-2 hover:bg-gray-700"
                onClick={() => setIsDropdownOpen(false)}
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
