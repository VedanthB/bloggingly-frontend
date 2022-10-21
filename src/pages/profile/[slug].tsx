import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { CurrentUserProfile, UserBlogs, UserProfile } from "../../components";

const Profile = () => {
  const { slug } = useParams();
  const { auth } = useAppSelector((state) => state);

  return (
    <div className="w-full max-w-5xl m-auto min-h-[100vh]">
      <div className="w-full flex justify-between gap-8 my-4">
        <div className="md:mt-10 w-full mb-4">
          {auth.user?._id === slug ? (
            <CurrentUserProfile />
          ) : (
            <UserProfile id={slug as string} />
          )}
        </div>

        <div className="md:mt-10 w-full mb-4">
          <UserBlogs />
        </div>
      </div>
    </div>
  );
};

export default Profile;
