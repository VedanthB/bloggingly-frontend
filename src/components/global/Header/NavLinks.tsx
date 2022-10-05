import React from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <Link
          to="home"
          className="block text-base py-2 pr-4 pl-3  text-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="createBlog"
          className="block text-base  py-2 pr-4 pl-3 text-gray-700 rounded hover:text-gray-900 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Create Blog
        </Link>
      </li>

      <li>
        <Link
          to="profile"
          className="block text-base py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Hi, Vedanth!
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
