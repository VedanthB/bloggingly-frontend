import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteBlog } from "../../features";
import { IBlog } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
}

const CardHorizontal: React.FC<IProps> = ({ blog }) => {
  const { slug } = useParams();

  const { auth } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (!auth?.user || !auth?.access_token) return;

    if (slug !== auth.user._id)
      return dispatch({
        type: "ALERT",
        payload: { errors: "Invalid Authentication." },
      });

    if (window.confirm("Do you want to delete this post?")) {
      dispatch(deleteBlog({ blog: blog, token: auth?.access_token }));
    }
  };

  return (
    <div className="flex items-center bg-white rounded-lg border shadow-md w-[36rem] hover:bg-gray-100">
      <Link className="w-[40%]" to={`/blog/${blog._id}`}>
        <img
          className="object-fill overflow-hidden h-40 rounded-t-lg w-full rounded-none rounded-l-lg"
          src={blog.thumbnail as string}
          alt="thumbnail"
        />
      </Link>

      <div className="flex w-[60%]  flex-col justify-between p-4 overflow-hidden text-ellipsis  leading-normal">
        <Link
          to={`/blog/${blog._id}`}
          className="mb-2 w-full text-2xl font-bold tracking-tight text-ellipsis overflow-hidden whitespace-nowrap text-gray-900"
        >
          {blog.title}
        </Link>
        <p className="mb-3 w-full font-normal text-ellipsis overflow-hidden whitespace-nowrap  text-gray-700 ">
          {blog.description}
        </p>
        <div className="flex w-full justify-between mt-8 ">
          <div className="flex items-center gap-4">
            <Link to={`/update_blog/${blog._id}`}>
              <FiEdit2 className="cursor-pointer" />
            </Link>
            <AiOutlineDelete
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete()}
            />
          </div>

          <small className="text-gray-400">
            {new Date(blog.createdAt).toLocaleString()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default CardHorizontal;
