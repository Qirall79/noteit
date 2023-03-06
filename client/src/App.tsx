import React, { useEffect, useState } from "react";
import RouterSwitch from "./RouterSwitch";
import fetchUser from "./utils/fetchUser";

function App() {
  const [user, setUser] = useState({ id: "", username: "", email: "" });
  const [loaded, setLoaded] = useState(false);

  const getUser = async () => {
    await fetchUser(setUser, setLoaded);
  };

  useEffect(() => {
    getUser();
  }, []);

  // Display loader
  if (!loaded) {
    return (
      <div className="min-w-screen min-h-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen">
      <RouterSwitch user={user} getUser={getUser} setUser={setUser} />
    </div>
  );
}

export default App;
