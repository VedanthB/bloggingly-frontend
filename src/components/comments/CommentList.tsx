import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteComment, replyComment, updateComment } from "../../features";

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

  const [edit, setEdit] = useState<IComment>();

  const handleReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      replyCM: [],
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString(),
    };

    setShowReply([data, ...showReply]);

    dispatch(replyComment({ data: data, token: auth.access_token }));

    setOnReply(false);
  };

  const handleUpdate = (body: string) => {
    if (!auth.user || !auth.access_token || !edit) return;

    if (body === edit.content) return setEdit(undefined);

    const newComment = { ...edit, content: body };
    dispatch(updateComment({ data: newComment, token: auth.access_token }));
    setEdit(undefined);
  };

  const Nav = (comment: IComment) => {
    return (
      <div className="flex items-center gap-4">
        <FiEdit2
          className="text-black cursor-pointer"
          onClick={() => setEdit(comment)}
        />
        <AiOutlineDelete
          className="text-red-500 cursor-pointer"
          onClick={() => handleDelete(comment)}
        />
      </div>
    );
  };

  const handleDelete = (comment: IComment) => {
    if (!auth.user || !auth.access_token) return;
    dispatch(deleteComment({ data: comment, token: auth.access_token }));
  };

  return (
    <div className="w-full">
      <div className="bg-gray-50 border rounded ml-6">
        {edit ? (
          <CommentInput callback={handleUpdate} edit={edit} setEdit={setEdit} />
        ) : (
          <>
            <div
              className="p-8 "
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            />

            <div className="flex justify-between p-4">
              <small className="flex items-center gap-6">
                <div
                  onClick={() => setOnReply(!onReply)}
                  className="cursor-pointer text-blue-500 "
                >
                  {onReply ? "Cancel" : "Reply"}
                </div>

                <div>
                  {comment.blog_user_id === auth.user?._id ? (
                    comment.user._id === auth.user._id ? (
                      Nav(comment)
                    ) : (
                      <AiOutlineDelete
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(comment)}
                      />
                    )
                  ) : (
                    comment.user._id === auth.user?._id && Nav(comment)
                  )}
                </div>
              </small>

              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          </>
        )}
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
