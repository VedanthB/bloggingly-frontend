import React from "react";
import { IBlog } from "../../utils/TypeScript";
import "react-quill/dist/quill.snow.css";

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  body: string;
  blog: IBlog;
}

const PreviewBlog: React.FC<IProps> = ({ ref, body, blog }) => {
  return (
    <div className="p-10">
      <div className="w-full mb-10">
        <h2 className="text-5xl text-gray-800 font-semibold mb-8">
          {blog.title ? blog.title : "Please enter your title..."}
        </h2>
        <div className="w-full text-right text-gray-500">
          {new Date(blog.createdAt).toLocaleString()}
        </div>
      </div>

      {blog.thumbnail && (
        <>
          <img
            src={URL.createObjectURL(blog.thumbnail as Blob)}
            className="w-full h-80 mb-20"
            alt="thumbnail"
            style={{ objectFit: "cover" }}
          />
        </>
      )}
      <div
        ref={ref}
        dangerouslySetInnerHTML={{
          __html:
            body.length > 0 ? body : "Start typing to see your content....",
        }}
      />
    </div>
  );
};

export default PreviewBlog;
