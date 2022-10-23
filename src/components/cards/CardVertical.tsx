import React from "react";
import { Link } from "react-router-dom";
import { IBlog } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
}

const CardVertical: React.FC<IProps> = ({ blog }) => {
  return (
    <div className="w-[20rem] bg-white  rounded-lg border border-gray-200 shadow-md">
      <Link className="cursor-pointer" to={`/blog/${blog._id}`}>
        <img
          className="rounded-t-lg overflow-hidden object-cover h-48 w-full"
          src={blog.thumbnail as string}
          alt=""
        />
      </Link>
      <div className="p-5 ">
        <Link className="cursor-pointer" to={`/blog/${blog._id}`}>
          <h5 className="mb-2 text-2xl overflow-hidden whitespace-nowrap text-ellipsis font-bold tracking-tight text-gray-900 ">
            {blog.title}
          </h5>
        </Link>

        <div className="mb-4">
          {typeof blog.user !== "string" && (
            <Link
              className="text-blue-500 text-md italic"
              to={`/profile/${blog.user._id}`}
            >
              @:{blog.user.name}
            </Link>
          )}
        </div>

        <p className="mb-4 font-normal text-gray-500 h-10 overflow-hidden whitespace-nowrap text-ellipsis ">
          {blog.description}
        </p>

        <Link
          to={`/blog/${blog._id}`}
          className="cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          Read more
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CardVertical;
