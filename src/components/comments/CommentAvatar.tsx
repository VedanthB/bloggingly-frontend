import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../utils/TypeScript";

interface IProps {
  user: IUser;
}

const CommentAvatar: React.FC<IProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-start">
      <img className="w-10 h-10 rounded-full" src={user.avatar} alt="avatar" />

      <small className="block text-gray-500 mt-4">
        <Link to={`/profile/${user._id}`}>@{user.name}</Link>
      </small>
    </div>
  );
};

export default CommentAvatar;
