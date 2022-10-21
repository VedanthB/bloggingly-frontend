import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CardVertical, NotFound } from "../../components";
import { getBlogsByCategoryId } from "../../features";
import { IBlog } from "../../utils/TypeScript";

const BlogsByCategory = () => {
  const {
    category: { categories },
    blogsState: { blogsByCategory },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const { slug } = useParams();

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
      dispatch(getBlogsByCategoryId(categoryId));
    } else {
      const data = blogsByCategory.find((item) => item.id === categoryId);
      if (!data) return;
      setBlogs(data.blogs);
      setTotal(data.total);
    }
  }, [categoryId, blogsByCategory, dispatch]);

  if (!blogs) return <NotFound />;

  return (
    <div className="w-full  mt-10 min-h-[70vh]">
      <div className="w-full grid grid-cols-4 gap-6 m-auto max-w-7xl">
        {blogs.map((blog) => (
          <CardVertical key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsByCategory;
