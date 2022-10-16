import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { NotFound } from "../components";

const Category = () => {
  const [name, setName] = useState("");

  const { auth, categories } = useAppSelector((state) => state);

  if (auth?.user?.role !== "admin") return <NotFound />;

  return (
    <div className="min-h-[95vh] flex  justify-center">
      <div className="max-w-md  w-full mt-20">
        <form className="flex items-center gap-6 border border-gray-200 p-6 rounded bg-white">
          <div className="relative z-0 mb-2 w-full group ">
            <input
              type="email"
              name="name"
              id="category_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="category_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Category Name
            </label>
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            Create
          </button>
        </form>

        <div className=""></div>
      </div>
    </div>
  );
};

export default Category;