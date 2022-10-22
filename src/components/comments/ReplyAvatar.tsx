import React from "react";
import { Link } from "react-router-dom";

import { IUser } from "../../utils/TypeScript";

interface IProps {
  user: IUser;
  reply_user?: IUser;
}
const ReplyAvatar: React.FC<IProps> = ({ user, reply_user }) => {
  return (
    <div className="flex items-center justify-start ml-6 mb-4">
      <img
        className="w-6 h-6 rounded-full mr-2"
        src={user.avatar}
        alt="avatar"
      />

      <small>
        <div className="hover:underline flex items-center justify-center  cursor-pointer">
          <Link to={`/profile/${user._id}`}>
            @{user.name}{" "}
            <small>
              replied to{" "}
              <Link
                className="text-blue-500 hover:underline  cursor-pointer"
                to={`/profile/${reply_user?._id}`}
              >
                {reply_user?.name}
              </Link>
            </small>{" "}
          </Link>
        </div>
      </small>
    </div>
  );
};

export default ReplyAvatar;
