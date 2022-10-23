import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="logo"
        className="w-24 cursor-pointer text-pink-500 h-14"
      />
    </Link>
  );
};

export default Logo;
