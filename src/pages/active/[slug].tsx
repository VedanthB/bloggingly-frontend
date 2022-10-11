import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { postAPI } from "../../utils/FetchData";
import { showErrMsg, showSuccessMsg } from "../../components";

const Active = () => {
  const { slug } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (slug) {
      console.log("i run ");
      postAPI("active", { active_token: slug })
        .then((res) => setSuccess(res.data.msg))
        .catch((err) => setErr(err.response.data.msg));
    }
  }, [slug]);

  console.log(slug);

  return (
    <div className="flex items-center justify-center min-h-[98vh] ">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
};

export default Active;
