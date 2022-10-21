import React from "react";
import { IComment } from "../../utils/TypeScript";

interface IProps {
  comment: IComment;
}

const CommentList: React.FC<IProps> = ({ comment }) => {
  return (
    <div className="w-full">
      <div className="bg-gray-50 border rounded ml-6">
        <div
          className="p-8 "
          dangerouslySetInnerHTML={{
            __html: comment.content,
          }}
        />

        <div className="flex justify-between p-4">
          <small className="cursor-pointer text-blue-500 hover:underline ">
            Reply
          </small>

          <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
