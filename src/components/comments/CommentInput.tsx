import React, { useState, useRef, useEffect } from "react";
import { IComment } from "../../utils/TypeScript";
import LiteQuill from "../editor/LiteQuill";

interface IProps {
  callback: (body: string) => void;
  edit?: IComment;
  setEdit?: (edit?: IComment) => void;
}

const CommentInput: React.FC<IProps> = ({ callback, edit, setEdit }) => {
  const [body, setBody] = useState("");
  const divRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    const div = divRef.current;
    const text = div?.innerText as string;

    if (!text.trim()) {
      if (setEdit) return setEdit(undefined);
      return;
    }

    callback(body);

    setBody("");
  };

  useEffect(() => {
    if (edit) setBody(edit.content);
  }, [edit]);

  return (
    <div>
      <LiteQuill body={body} setBody={setBody} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <div className="w-full flex justify-end items-center">
        <button
          onClick={handleSubmit}
          type="button"
          className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        >
          {edit ? "Update" : "Send"}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
