import React, { useEffect } from "react";

interface Props {
  setUser: any;
}

const Logout: React.FC<Props> = ({ setUser }) => {
  const logoutUser = async () => {
    localStorage.removeItem("token");
    setUser({});
  };

  useEffect(() => {
    logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
