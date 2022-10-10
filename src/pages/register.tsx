import React from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "../components";

const Register = () => {
  return (
    <div className="w-full py-10 px-0 flex justify-center min-h-[80vh] mb-32">
      <div className="max-w-md w-full py-11 px-7 border border-solid border-gray-200 bg-white">
        <h3 className="text-center mb-4 text-2xl">Register</h3>

        <RegisterForm />

        <small className="flex items-center my-4">
          <Link to="/forgot_password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </small>

        <p>
          Already have an account?
          <Link to={`/login`} className="text-red-500 hover:underline">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
