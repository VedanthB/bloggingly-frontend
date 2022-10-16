import React, { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetPassword, updateUser } from "../../features";
import { InputChange, IUserProfile } from "../../utils/TypeScript";

const CurrentUserProfile = () => {
  const { auth } = useAppSelector((state) => state);

  const { access_token } = auth;

  const initialState: IUserProfile = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    avatar: undefined,
  };

  const dispatch = useAppDispatch();

  const [userDetails, setUserDetails] = useState<IUserProfile>(initialState);

  const { name, email, avatar, password, cf_password } = userDetails;

  const [showPassword, setShowPassword] = useState(false);

  const [showCfPassword, setShowCfPassword] = useState(false);

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

    if (password.length > 0 && auth.access_token)
      dispatch(resetPassword({ password, cf_password, access_token }));
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
              {auth?.user?.name}
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
                  value={auth?.user?.name}
                  onChange={handleChangeInput}
                />
              </div>

              {auth?.user?.type === "register" && (
                <>
                  <div className="mb-6">
                    {auth?.user?.type !== "register" && (
                      <div className="text-red-500 text-xs text-center mb-4">
                        * Google Login does not support change password *
                      </div>
                    )}
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your password
                    </label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      onChange={handleChangeInput}
                      disabled={auth?.user?.type !== "register"}
                    />

                    <small
                      className="relative float-right bottom-8 right-2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </small>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="cf_password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Confirm Password
                    </label>
                    <input
                      name="cf_password"
                      type={showCfPassword ? "text" : "password"}
                      id="cf_password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      disabled={auth?.user?.type !== "register"}
                      onChange={handleChangeInput}
                    />

                    <small
                      className="relative float-right bottom-8 right-2 cursor-pointer"
                      onClick={() => setShowCfPassword(!showCfPassword)}
                    >
                      {showCfPassword ? "Hide" : "Show"}
                    </small>
                  </div>
                </>
              )}

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
