import React, { useEffect, useContext } from "react";
import { UserDispatchContext } from "../contexts/userContext";

const Logout: React.FC<any> = () => {
  const userDispatch = useContext(UserDispatchContext);
  const logoutUser = async () => {
    localStorage.removeItem("token");
    userDispatch({ type: "logout" });
  };

  useEffect(() => {
    logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
