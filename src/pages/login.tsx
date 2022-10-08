import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components";

const Login = () => {
  return (
    <div className="w-full py-10 px-0 flex justify-center mb-32">
      <div className="max-w-md w-full py-11 px-7 border border-solid border-gray-200 bg-white">
        <h3 className="text-center mb-4 text-2xl">Login</h3>

        <LoginForm />

        <small className="flex items-center my-4">
          <Link to="/forgot_password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </small>

        <p>
          You don't have an account?
          <Link to={`/register`} className="text-red-500 hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
