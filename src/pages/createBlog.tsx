import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  CreateBlogForm,
  NotFound,
  PreviewBlog,
  Quill,
  Tabs,
} from "../components";
import { setAlertError } from "../features";

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

    // const check = validCreateBlog({ ...blog, content: text });

    // if (check.errLength !== 0) {
    //   return dispatch(setAlertError({ error: check.errMsg }));
    // }

    let newData = { ...blog, content: body };

    // dispatch(createBlog(newData, auth.access_token));
  };

  if (!auth.access_token) return <NotFound />;

  console.log(body);

  return (
    <div className="my-4 min-h-[100vh]">
      <div className="w-full max-w-5xl m-auto">
        <Tabs tab={tab} setTab={setTab} />

        <div className="w-full h-full mt-10 p-4 rounded bg-white">
          {tab === "Edit" ? (
            <>
              <CreateBlogForm blog={blog} setBlog={setBlog} />

              <Quill body={body} setBody={setBody} />
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
