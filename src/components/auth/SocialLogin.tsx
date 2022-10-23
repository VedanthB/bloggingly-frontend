import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../app/hooks";
import { googleLogin } from "../../features/actions/authAction";

const SocialLogin = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex w-full justify-center items-center">
      <GoogleLogin
        onSuccess={(credentialResponse: any) => {
          console.log(credentialResponse);
          dispatch(googleLogin(credentialResponse.credential));
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default SocialLogin;
