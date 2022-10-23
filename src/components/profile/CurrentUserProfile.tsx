import React, { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUser } from "../../features";
import { InputChange, IUserProfile } from "../../utils/TypeScript";

const CurrentUserProfile = () => {
  const { auth } = useAppSelector((state) => state);

  const initialState: IUserProfile = {
    name: auth?.user?.name as string,
    email: "",
    password: "",
    cf_password: "",
    avatar: undefined,
  };

  const dispatch = useAppDispatch();

  const [userDetails, setUserDetails] = useState<IUserProfile>(initialState);

  const { name, avatar } = userDetails;

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      setUserDetails({ ...userDetails, avatar: file });
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (avatar || name) dispatch(updateUser({ avatar, name, auth }));
  };

  return (
    <>
      <div>
        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md">
          <form className="flex flex-col pb-10 pt-10">
            <div className="info_avatar">
              <img
                src={avatar ? URL.createObjectURL(avatar) : auth?.user?.avatar}
                alt="avatar"
              />

              <span>
                <i className="fas fa-camera" />
                <p>Change</p>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="file_up"
                  onChange={handleChangeFile}
                />
              </span>
            </div>
            <h5 className="mb-1 text-xl text-center  font-medium text-gray-900 ">
              @{userDetails.name}
            </h5>
            <span className="text-sm text-center text-gray-500 ">
              {auth?.user?.email}
            </span>

            <div className="space-y-4 px-6 mt-6">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your Name"
                  required
                  value={userDetails.name}
                  onChange={handleChangeInput}
                />
              </div>

              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CurrentUserProfile;
