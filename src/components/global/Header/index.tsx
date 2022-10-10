import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Search from "./Search";

const Header = () => {
  return (
    <nav className="w-full bg-white">
      <div className="px-6 py-4 w-full flex justify-between items-center m-auto">
        <Logo />

        <Search />

        <NavLinks />
      </div>
    </nav>
  );
};

export default Header;
