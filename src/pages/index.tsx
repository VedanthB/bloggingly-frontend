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
        {blogs.map((blog) => (
          <div key={blog._id} className="pt-20">
            {blog.count > 0 && (
              <>
                <h3>
                  <Link
                    className="uppercase text-gray-800  cursor-pointer text-xl hover:text-blue-500"
                    to={`/blogs/${blog.name.toLowerCase()}`}
                  >
                    {blog.name} <small>({blog.count})</small>
                  </Link>
                </h3>

                <hr className="my-6" />

                <div className="w-full grid grid-cols-4 gap-6">
                  {blog.blogs.map((blog) => (
                    <CardVertical key={blog._id} blog={blog} />
                  ))}
                </div>
              </>
            )}

            {blog.count > 4 && (
              <Link
                className="text-end d-block mt-2 mb-3"
                to={`/blogs/${blog.name}`}
              >
                Read more &gt;&gt;
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
