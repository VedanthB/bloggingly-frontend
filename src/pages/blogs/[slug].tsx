import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CardVertical, NotFound, Pagination } from "../../components";
import { getBlogsByCategoryId } from "../../features";
import { IBlog } from "../../utils/TypeScript";

const BlogsByCategory = () => {
  const {
    category: { categories },
    blogsState: { blogsByCategory },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const { slug } = useParams();

  let location = useLocation();

  const [categoryId, setCategoryId] = useState("");

  const [blogs, setBlogs] = useState<IBlog[]>();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const category = categories?.find((item) => item.name === slug);

    if (category) setCategoryId(category._id);
  }, [slug, categories]);

  useEffect(() => {
    if (!categoryId) return;

    if (blogsByCategory.every((item) => item.id !== categoryId)) {
      dispatch(
        getBlogsByCategoryId({ id: categoryId, search: location.search })
      );
    } else {
      const data = blogsByCategory.find((item) => item.id === categoryId);

      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);
    }
  }, [categoryId, blogsByCategory, dispatch, location.search]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;

    dispatch(getBlogsByCategoryId({ id: categoryId, search: search }));
  };

  if (!blogs) return <NotFound />;

  return (
    <div className="w-full  mt-10 min-h-[70vh]">
      <div className="w-full grid grid-cols-4 gap-6 m-auto max-w-7xl">
        {blogs.map((blog) => (
          <CardVertical key={blog._id} blog={blog} />
        ))}
      </div>
      <div className="m-auto max-w-7xl mt-10">
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </div>
  );
};

export default BlogsByCategory;
