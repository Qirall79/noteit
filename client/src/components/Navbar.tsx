import React from "react";
import { Link } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
}

const Navbar: React.FC<Props> = ({ isAuthenticated }): any => {
  return (
    <div className="w-full bg-[#27051c] text-white px-20 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-medium">Note it</h1>
      <ul className="flex gap-10 font-medium">
        <li>
          <Link to={isAuthenticated ? "/" : "/signup"}>
            {isAuthenticated ? "Home" : "Sign up"}
          </Link>
        </li>
        <li>
          <Link to={isAuthenticated ? "/logout" : "/login"}>
            {isAuthenticated ? "Log out" : "Log in"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
