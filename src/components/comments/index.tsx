import React, { useState } from "react";
import { IComment } from "../../utils/TypeScript";
import CommentAvatar from "./CommentAvatar";
import CommentList from "./CommentList";
import ReplyAvatar from "./ReplyAvatar";

interface IProps {
  comment: IComment;
}

const Comments: React.FC<IProps> = ({ comment }) => {
  const [showReply, setShowReply] = useState<IComment[]>([]);

  return (
    <div
      className="my-4 flex"
      style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "initial" : "none",
      }}
    >
      <CommentAvatar user={comment.user} />

      <CommentList
        comment={comment}
        showReply={showReply}
        setShowReply={setShowReply}
      >
        {showReply.map((comment, index) => (
          <div
            className="mt-10"
            key={index}
            style={{
              opacity: comment._id ? 1 : 0.5,
              pointerEvents: comment._id ? "initial" : "none",
            }}
          >
            <ReplyAvatar user={comment.user} reply_user={comment.reply_user} />

            <CommentList
              comment={comment}
              showReply={showReply}
              setShowReply={setShowReply}
            />
          </div>
        ))}
      </CommentList>
    </div>
  );
};

export default Comments;
