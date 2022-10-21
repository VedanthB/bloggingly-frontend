import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CardHorizontal, CreateBlogForm, NotFound } from "../components";

import { IBlog } from "../utils/TypeScript";

const CreateBlog = () => {
  const initState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };

  const [blog, setBlog] = useState<IBlog>(initState);

  const {
    auth,
    category: { categories },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  if (!auth.access_token) return <NotFound />;

  return (
    <div className="my-4 min-h-[100vh]">
      <div className="w-full max-w-5xl m-auto">
        <h5>Create</h5>
        <h5>Preview</h5>

        <CreateBlogForm blog={blog} setBlog={setBlog} />
      </div>
    </div>
  );
};

export default CreateBlog;
