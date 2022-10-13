import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { InputChange, IUserProfile } from "../../utils/TypeScript";

const EditProfileForm = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    avatar: "",
  };

  const {
    auth: { user },
  } = useAppSelector((state) => state);

  const [userDetails, setUserDetails] = useState<IUserProfile>(initialState);

  const { email, password, name, cf_password } = userDetails;

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

  return (
    <div className="relative bg-white rounded-lg shadow">
      <button
        // onClick={handleClose}
        type="button"
        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
      <div className="py-6 px-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-900 ">
          Update Details
        </h3>

        <form className="space-y-6" action="#">
          <div className="mb-6 mt-20">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="file_input"
            >
              Upload Profile Picture
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Name"
              required
              value={user?.name}
              onChange={handleChangeInput}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@bloggingly.com"
              required
              value={email}
              onChange={handleChangeInput}
            />
          </div>

          <div className="mb-6">
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
              onChange={handleChangeInput}
            />

            <small
              className="relative float-right bottom-8 right-2 cursor-pointer"
              onClick={() => setShowCfPassword(!showCfPassword)}
            >
              {showCfPassword ? "Hide" : "Show"}
            </small>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
