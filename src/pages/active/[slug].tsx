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
      postAPI("active", { active_token: slug })
        .then((res) => setSuccess(res.data.msg))
        .catch((err) => setErr(err.response.data.msg));
    }
  }, [slug]);

  return (
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
};

export default Active;
