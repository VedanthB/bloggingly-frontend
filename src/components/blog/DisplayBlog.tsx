import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createComment, getComments } from "../../features";
import { IBlog, IComment, IUser } from "../../utils/TypeScript";
import Comments from "../comments";
import CommentInput from "../comments/CommentInput";
import Pagination from "../global/Pagination/Pagination";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comments } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [showComments, setShowComments] = useState<IComment[]>([]);

  let location = useLocation();

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      content: body,
      user: auth.user,
      replyCM: [],
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);

    dispatch(createComment({ data: data, token: auth.access_token }));
  };

  useEffect(() => {
    setShowComments(comments?.data);
  }, [comments.data]);

  const fetchComments = useCallback(
    async (id: string, num = 1) => {
      setLoading(true);
      await dispatch(getComments({ id: id, num: num }));
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (!blog._id) return;

    const num: number = Number(location.search.slice(6)) || 1;

    fetchComments(blog._id, num);
  }, [blog._id, fetchComments, location.search]);

  const handlePagination = (num: number) => {
    if (!blog._id) return;
    fetchComments(blog._id, num);
  };

  return (
    <div className="w-full h-full mt-10 p-10 rounded bg-white">
      <div className="p-10">
        <div className="w-full mb-10">
          <h2 className="text-5xl text-gray-800 font-semibold mb-8   overflow-hidden whitespace-nowrap text-ellipsis">
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
          className="w-full overflow-hidden whitespace-nowrap text-ellipsis"
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        ></div>
      </div>

      <hr className="my-1" />
      <h3 className="text-xl mb-10 text-center">Comments</h3>

      {auth.user ? (
        <CommentInput callback={handleComment} />
      ) : (
        <h5 className="text-center">
          Please{" "}
          <Link
            className=" text-blue-500 hover:underline cursor-pointer"
            to={`/login?blog/${blog._id}`}
          >
            login
          </Link>{" "}
          to comment.
        </h5>
      )}

      {loading
        ? "Loading..."
        : showComments?.map((comment, index) => (
            <Comments key={index} comment={comment} />
          ))}

      {comments.total > 1 && (
        <div className="w-full flex justify-start items-center mt-10">
          <Pagination total={comments.total} callback={handlePagination} />
        </div>
      )}
    </div>
  );
};

export default DisplayBlog;
