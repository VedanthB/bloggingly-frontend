import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import NavLinkDropdown from "./NavLinkDropdown";

const NavLinks = () => {
  const { auth } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  return (
    <ul className="flex p-2 items-center rounded-lg border-gray-100 space-x-8 mt-0 text-sm font-medium border-0 bg-white">
      <li>
        <NavLink
          to={auth.access_token ? "home" : "login"}
          className={({ isActive }) =>
            isActive
              ? "block py-2 pr-4 pl-3  text-blue-700 rounded bg-transparent"
              : "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 "
          }
        >
          {auth.access_token ? "Home" : "Login"}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={auth?.access_token ? "createBlog" : "register"}
          className={({ isActive }) =>
            isActive
              ? "block py-2 pr-4 pl-3  text-blue-700 rounded bg-transparent"
              : "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 "
          }
        >
          {auth?.access_token ? "Create Blog" : "Register"}
        </NavLink>
      </li>

      {auth.user?.role === "admin" && (
        <li>
          <NavLink
            to="/category"
            className={({ isActive }) =>
              isActive
                ? "block py-2 pr-4 pl-3  text-blue-700 rounded bg-transparent"
                : "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 "
            }
          >
            Category
          </NavLink>
        </li>
      )}

      <li>{auth?.user && <NavLinkDropdown />}</li>
    </ul>
  );
};

export default NavLinks;
