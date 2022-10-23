import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getBlogsByUserId } from "../../features";
import { IBlog } from "../../utils/TypeScript";
import CardHorizontal from "../cards/CardHorizontal";
import Pagination from "../global/Pagination/Pagination";

const UserBlogs = () => {
  const {
    blogsState: { userBlogs },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const user_id = useParams().slug;

  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);

  let location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id) return;

    if (userBlogs.every((item) => item.id !== user_id)) {
      dispatch(getBlogsByUserId({ id: user_id, search: location.search }));
    } else {
      const data = userBlogs.find((item) => item.id === user_id);
      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);
      if (data.search) navigate(data.search);
    }
  }, [user_id, userBlogs, dispatch, location.search, navigate]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;

    dispatch(getBlogsByUserId({ id: user_id as string, search: search }));
  };

  if (blogs?.length === 0 && total < 1)
    return <h3 className="text-center">No Blogs</h3>;

  return (
    <div>
      <div className="flex flex-col gap-8">
        {blogs?.map((blog) => (
          <CardHorizontal key={blog._id} blog={blog} />
        ))}
      </div>

      <div className="w-full flex justify-center items-center mt-10">
        <Pagination total={total} callback={handlePagination} />
      </div>
    </div>
  );
};

export default UserBlogs;
