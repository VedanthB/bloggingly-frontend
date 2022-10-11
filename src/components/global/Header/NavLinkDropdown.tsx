import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { logout } from "../../../features";

const NavLinkDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    auth: { user },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="mr-2 w-8 h-8 rounded-full"
          src={user?.avatar}
          alt="user"
        />
        {user?.name}
        <svg
          className="w-4 h-4 mx-1.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      {/* // <!-- Dropdown menu --> */}
      <div
        id="dropdownAvatarName"
        className={` ${
          isDropdownOpen ? "block" : "hidden"
        }  z-10 w-44 bg-white rounded divide-y divide-gray-100 border border-gray-100 shadow top-14 right-4 absolute`}
      >
        <div className="py-3 px-4 text-sm text-gray-900 ">
          <div className="font-medium ">{user?.name}</div>
          <div className="truncate">{user?.email}</div>
        </div>
        <ul className="py-1 text-sm text-gray-700 ">
          <li>
            <Link to="profile" className="block py-2 px-4 hover:bg-gray-100">
              Profile
            </Link>
          </li>
        </ul>
        <div className="py-1">
          <li
            onClick={() => dispatch(logout())}
            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </li>
        </div>
      </div>
    </div>
  );
};

export default NavLinkDropdown;
