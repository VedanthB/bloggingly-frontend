import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { CardVertical } from "../components";

const Home = () => {
  const {
    blogsState: { blogs },
  } = useAppSelector((state) => state);

  return (
    <div className="w-full min-h-screen ">
      <div className="m-auto max-w-7xl ">
        {Array.isArray(blogs) &&
          blogs?.map((blog) => (
            <div key={blog._id} className="pt-10">
              {blog.count > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <Link
                      className="uppercase text-gray-900  cursor-pointer text-xl hover:text-blue-500"
                      to={`/blogs/${blog.name.toLowerCase()}`}
                    >
                      #{blog.name} <small>({blog.count})</small>
                    </Link>

                    {blog.count > 4 && (
                      <Link
                        to={`/blogs/${blog.name}`}
                        className="inline-flex justify-center items-center p-5 text-base font-medium text-gray-500 bg-gray-50 rounded-lg hover:text-blue-600 hover:bg-gray-200"
                      >
                        <span className="w-full">Read more </span>
                        <svg
                          aria-hidden="true"
                          className="ml-3 w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    )}
                  </div>

                  <hr className="my-4" />

                  <div className="w-full grid grid-cols-4 gap-6">
                    {blog.blogs.map((blog) => (
                      <CardVertical key={blog._id} blog={blog} />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
