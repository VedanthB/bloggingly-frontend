import React from "react";
import { Link } from "react-router-dom";
import { IBlog } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  return (
    <div className="w-full h-full mt-10 p-10 rounded bg-white">
      <div className="p-10">
        <div className="w-full mb-10">
          <h2 className="text-5xl text-gray-800 font-semibold mb-8">
            {blog.title}
          </h2>

          <div className="w-full flex justify-between items-center ">
            {typeof blog.user !== "string" && (
              <Link
                to={`/profile/${blog.user._id}`}
                className="italic hover:text-blue-500"
              >
                @{blog.user.name}
              </Link>
            )}

            <div className="text-gray-500">
              {new Date(blog.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <img
          src={blog.thumbnail as string}
          className="w-full h-80 mb-20"
          alt="thumbnail"
          style={{ objectFit: "cover" }}
        />

        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
      </div>
    </div>
  );
};

export default DisplayBlog;
