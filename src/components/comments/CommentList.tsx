import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IComment } from "../../utils/TypeScript";
import CommentInput from "./CommentInput";

interface IProps {
  children?: React.ReactNode;
  comment: IComment;
  showReply: IComment[];
  setShowReply: (showReply: IComment[]) => void;
}

const CommentList: React.FC<IProps> = ({
  children,
  comment,
  showReply,
  setShowReply,
}) => {
  const [onReply, setOnReply] = useState(false);
  const { auth } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment._id,
      createdAt: new Date().toISOString(),
    };
    console.log(data);
    setShowReply([...showReply, data]);
    setOnReply(false);
  };

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
          <small
            onClick={() => setOnReply(!onReply)}
            className="cursor-pointer  text-blue-500 hover:underline "
          >
            {onReply ? "Cancel" : "Reply"}
          </small>

          <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      </div>

      {onReply && (
        <div className="mt-10 p-4 ml-6">
          <CommentInput callback={handleReply} />
        </div>
      )}

      {children}
    </div>
  );
};

export default CommentList;
