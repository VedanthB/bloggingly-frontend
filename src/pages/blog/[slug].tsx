import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IBlog } from "../../utils/TypeScript";
import { getAPI } from "../../utils/FetchData";
import DisplayBlog from "../../components/blog/DisplayBlog";
import { showErrMsg } from "../../components";
import { useAppSelector } from "../../app/hooks";

const DetailBlog = () => {
  const id = useParams().slug;

  const {
    socketState: { socket },
  } = useAppSelector((state) => state);

  const [blog, setBlog] = useState<IBlog>();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        setLoading(false);
      });

    return () => setBlog(undefined);
  }, [id]);

  // Join Room
  useEffect(() => {
    if (!id || !socket) return;
    socket.emit("joinRoom", id);

    return () => {
      socket.emit("outRoom", id);
    };
  }, [socket, id]);

  return (
    <div className="my-4 min-h-[100vh]">
      <div className="w-full max-w-5xl m-auto">
        {error && showErrMsg(error)}

        {blog && <DisplayBlog blog={blog} />}
      </div>
    </div>
  );
};

export default DetailBlog;
