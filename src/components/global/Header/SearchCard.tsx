import React from "react";
import { Link } from "react-router-dom";

import { IBlog } from "../../../utils/TypeScript";

interface IProps {
  blog: IBlog;
}

const SearchCard: React.FC<IProps> = ({ blog }) => {
  return (
    <div className="flex items-center overflow-hidden rounded-lg border h-28 shadow-md w-full hover:bg-gray-100">
      <Link className="cursor-pointer w-[20%]" to={`/blog/${blog._id}`}>
        <img
          className="object-fill overflow-hidden h-full rounded-t-lg w-full rounded-none rounded-l-lg"
          src={blog.thumbnail as string}
          alt="thumbnail"
        />
      </Link>

      <div className="flex w-[80%] h-full flex-col justify-between p-4 overflow-hidden text-ellipsis  leading-normal">
        <Link
          to={`/blog/${blog._id}`}
          className="cursor-pointer mb-2 w-full text-2xl font-bold tracking-tight text-ellipsis overflow-hidden whitespace-nowrap text-gray-900"
        >
          {blog.title}
        </Link>
        <p className="mb-3 w-full font-normal text-ellipsis overflow-hidden whitespace-nowrap  text-gray-700 ">
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
