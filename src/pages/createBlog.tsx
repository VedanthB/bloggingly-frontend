import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  CreateBlogForm,
  NotFound,
  PreviewBlog,
  Quill,
  Tabs,
} from "../components";
import { createBlog, setAlertError } from "../features";

import { IBlog } from "../utils/TypeScript";
import { validCreateBlog } from "../utils/ValidRegister";

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

  const [body, setBody] = useState("");

  const divRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState("");

  const [tab, setTab] = useState("Edit");

  const { auth } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText as string;

    setText(text);
  }, [body]);

  const handleSubmit = async () => {
    if (!auth.access_token) return;

    const check = validCreateBlog({ ...blog, content: body });

    if (check.errLength !== 0) {
      return dispatch(setAlertError({ error: check.errMsg }));
    }

    let newData = { ...blog, content: body };

    dispatch(createBlog({ blog: newData, token: auth.access_token }));
  };

  if (!auth.access_token) return <NotFound />;

  console.log(body);

  return (
    <div className="my-4 min-h-[100vh]">
      <div className="w-full max-w-5xl m-auto">
        <Tabs tab={tab} setTab={setTab} />

        <div className="w-full h-full mt-10 p-10 rounded bg-white">
          {tab === "Edit" ? (
            <>
              <CreateBlogForm blog={blog} setBlog={setBlog} />

              <Quill body={body} setBody={setBody} />

              <div className="flex items-center justify-between mt-6 w-56">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Blog
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <PreviewBlog ref={divRef} body={body} blog={blog} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
