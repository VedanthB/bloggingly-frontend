import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Search from "./Search";

const Header = () => {
  return (
    <nav className="w-full bg-white h-16 z-50 fixed top-0">
      <div className="px-6 py-1 w-full flex justify-between items-center m-auto">
        <Logo />

        <Search />

        <NavLinks />
      </div>
    </nav>
  );
};

export default Header;
