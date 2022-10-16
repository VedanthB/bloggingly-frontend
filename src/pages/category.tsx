import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { NotFound } from "../components";
import { createCategory, deleteCategory, updateCategory } from "../features";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";

import { FormSubmit, ICategory } from "../utils/TypeScript";

const Category = () => {
  const [name, setName] = useState("");

  const [edit, setEdit] = useState<ICategory | null>(null);

  const { auth, category } = useAppSelector((state) => state);

  const { categories } = category;

  const dispatch = useAppDispatch();

  if (auth?.user?.role !== "admin") return <NotFound />;

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.access_token || !name) return;

    if (edit) {
      if (edit.name === name) return;

      const data = { ...edit, name };

      dispatch(updateCategory({ data, access_token: auth?.access_token }));
    } else {
      dispatch(createCategory({ name, access_token: auth?.access_token }));
    }
    setName("");
    setEdit(null);
  };

  const handleDelete = (id: string) => {
    if (!auth.access_token) return;

    dispatch(deleteCategory({ id, access_token: auth?.access_token }));
  };

  return (
    <div className="min-h-[95vh] flex  justify-center">
      <div className="max-w-md  w-full mt-20">
        <form
          className="flex items-center gap-6 border border-gray-200 p-6 rounded bg-white"
          onSubmit={handleSubmit}
        >
          {edit && (
            <AiOutlineCloseCircle
              onClick={() => {
                setEdit(null);
                setName("");
              }}
              className="w-10 h-10 cursor-pointer text-red-500"
            />
          )}

          <div className="relative z-0 mb-2 w-full group ">
            <input
              type="text"
              name="name"
              id="category_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label
              htmlFor="category_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Category Name
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            {edit ? "Update" : "Create"}
          </button>
        </form>

        <div className="flex flex-col gap-4 max-h-96 overflow-scroll  mt-6 rounded">
          {categories?.map((category) => (
            <div
              className="flex w-full justify-between p-4 items-center rounded border bg-white border-gray-200 "
              key={category._id}
            >
              <p className="uppercase">{category.name}</p>

              <div className="flex items-center gap-4">
                <FiEdit2
                  className="cursor-pointer"
                  onClick={() => {
                    setEdit(category);
                    setName(category.name);
                  }}
                />
                <AiOutlineDelete
                  onClick={() => handleDelete(category._id)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
