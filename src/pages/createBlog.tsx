import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  CreateBlogForm,
  NotFound,
  PreviewBlog,
  Quill,
  Tabs,
} from "../components";
import { createBlog, setAlertError, updateBlog } from "../features";
import { getAPI } from "../utils/FetchData";

import { IBlog, IUser } from "../utils/TypeScript";
import { shallowEqual, validCreateBlog } from "../utils/ValidRegister";

interface IProps {
  id?: string;
}

const CreateBlog: React.FC<IProps> = ({ id }) => {
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

  const navigate = useNavigate();

  const [text, setText] = useState("");

  const [tab, setTab] = useState("Edit");

  const { auth } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const [oldData, setOldData] = useState<IBlog>(initState);

  useEffect(() => {
    if (!id) return;

    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        setBody(res.data.content);
        setOldData(res.data);
      })
      .catch((err) => console.log(err));

    const initData = {
      user: "",
      title: "",
      content: "",
      description: "",
      thumbnail: "",
      category: "",
      createdAt: new Date().toISOString(),
    };

    return () => {
      setBlog(initData);
      setBody("");
      setOldData(initData);
    };
  }, [id]);

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

    if (id) {
      if ((blog.user as IUser)._id !== auth.user?._id)
        return dispatch(setAlertError({ error: "Invalid Authentication." }));

      const result = shallowEqual(oldData, newData);

      if (result)
        return dispatch(setAlertError({ error: "The data did not change." }));

      dispatch(updateBlog({ blog: newData, token: auth.access_token }));
      navigate(`/blog/${id}`);
    } else {
      dispatch(
        createBlog({ blog: newData, token: auth.access_token, navigate })
      );
    }
  };

  if (!auth.access_token) return <NotFound />;

  return (
    <div className="my-4 min-h-[100vh]">
      <div className="w-full max-w-5xl m-auto">
        {!id && <Tabs tab={tab} setTab={setTab} />}

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
                  {id ? "Update Post" : "Create Post"}
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
            !id && <PreviewBlog ref={divRef} body={body} blog={blog} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
