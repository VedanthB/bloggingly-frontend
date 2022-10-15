import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { CurrentUserProfile, UserBlogs, UserProfile } from "../../components";

const Profile = () => {
  const { slug } = useParams();
  const { auth } = useAppSelector((state) => state);

  return (
    <div className="w-full max-w-5xl m-auto min-h-[100vh]">
      <div className="w-full flex flex-wrap my-4">
        <div className="md:w-[40%] md:mt-10 w-full mb-4">
          {auth.user?._id === slug ? <CurrentUserProfile /> : <UserProfile />}
        </div>

        <div className="md:w-[60%] w-full">
          <UserBlogs />
        </div>
      </div>
    </div>
  );
};

export default Profile;
