import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const Navbar: React.FC<any> = (): any => {
  const user = useContext(UserContext);

  return (
    <div className="w-full bg-[#081c15] text-white px-10 md:px-20 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-medium">Note it</h1>
      <ul className="flex gap-10 font-medium">
        <li>
          <Link to={user.id ? "/" : "/signup"}>
            {user.id ? "Home" : "Sign up"}
          </Link>
        </li>
        <li>
          <Link to={user.id ? "/logout" : "/login"}>
            {user.id ? "Log out" : "Log in"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
