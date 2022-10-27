import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAPI } from "../../../utils/FetchData";
import { IBlog } from "../../../utils/TypeScript";
import SearchCard from "./SearchCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const { pathname } = useLocation();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([]);

      try {
        const res = await getAPI(`search/blogs?title=${search}`);
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    setSearch("");
    setBlogs([]);
  }, [pathname]);

  return (
    <div className="flex items-center w-[40rem]">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          id="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Search"
        />
      </div>
      {search.length >= 2 && (
        <div className="absolute top-16 px-4 py-6  w-100 rounded w-[40rem] bg-white shadow-sm border overflow-hidden z-10">
          {blogs.length ? (
            blogs.map((blog) => <SearchCard key={blog._id} blog={blog} />)
          ) : (
            <h3 className="text-center">No Blogs</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
