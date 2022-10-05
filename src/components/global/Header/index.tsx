import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Search from "./Search";

const Header = () => {
  return (
    <nav className=" w-full ">
      <div className="max-w-5xl w-full flex justify-between items-center m-auto">
        <Logo />

        <Search />

        <NavLinks />
      </div>
    </nav>
  );
};

export default Header;
