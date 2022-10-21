import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser } from "../../features";
import { IUser } from "../../utils/TypeScript";

interface IProps {
  id: string;
}

const UserProfile: React.FC<IProps> = ({ id }) => {
  const [user, setUser] = useState<IUser>();

  const {
    profile: { users },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;

    if (users.every((user) => user._id !== id)) {
      dispatch(getUser(id));
    } else {
      const newUser = users.find((user) => user._id === id);
      if (newUser) setUser(newUser);
    }
  }, [id, users, dispatch]);

  // if (!other) return ;

  return (
    <div>
      <div>
        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex flex-col pb-10 pt-10">
            <div className="info_avatar">
              <img src={user?.avatar} alt="avatar" />
            </div>
            <h5 className="mb-1 text-xl text-center  font-medium text-gray-900 ">
              @{user?.name}
            </h5>
            <div className="text-sm w-full text-center text-gray-500 ">
              {user?.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
