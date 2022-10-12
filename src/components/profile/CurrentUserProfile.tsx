import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import Modal from "../global/Modal";

const CurrentUserProfile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const {
    auth: { user },
  } = useAppSelector((state) => state);

  return (
    <>
      <div>
        <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex flex-col items-center pb-10 pt-10">
            <img
              className="mb-3 w-24 h-24 rounded-full shadow-lg"
              src={user?.avatar}
              alt="Bonnie "
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user?.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Visual Designer
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <div
                onClick={() => setIsEditProfileModalOpen((prev) => !prev)}
                className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                Edit Profile
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isModalOpen={isEditProfileModalOpen}
        setIsModalOpen={setIsEditProfileModalOpen}
      ></Modal>
    </>
  );
};

export default CurrentUserProfile;
