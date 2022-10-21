import React from "react";
import { IComment } from "../../utils/TypeScript";
import CommentAvatar from "./CommentAvatar";
import CommentList from "./CommentList";

interface IProps {
  comment: IComment;
}

const Comments: React.FC<IProps> = ({ comment }) => {
  return (
    <div className="my-3 d-flex">
      <CommentAvatar user={comment.user} />

      <CommentList comment={comment} />
    </div>
  );
};

export default Comments;
