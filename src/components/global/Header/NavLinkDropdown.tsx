import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { logout } from "../../../features";
import { useOnClickOutside } from "../../../hooks";

const NavLinkDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    auth: { user },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const navLinkDropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClicks = (event: MouseEvent) => {
    if (
      isDropdownOpen &&
      navLinkDropdownRef.current &&
      !navLinkDropdownRef.current.contains(event.target as any)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useOnClickOutside(navLinkDropdownRef, handleOutsideClicks);

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

      <div
        ref={navLinkDropdownRef}
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
            <Link
              to={`/profile/${user?._id}`}
              className="block py-2 px-4 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Profile
            </Link>
          </li>
        </ul>
        <div className="py-1">
          <ul>
            <li
              onClick={() => {
                dispatch(logout());
                setIsDropdownOpen(false);
              }}
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavLinkDropdown;
