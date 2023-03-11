import React, { useEffect, useState, useReducer } from "react";
import RouterSwitch from "./RouterSwitch";
import fetchUser from "./utils/fetchUser";
import { UserContext, UserDispatchContext } from "./contexts/userContext";

// user reducer
import userReducer from "./reducers/userReducer";

function App() {
  const [user, userDispatch] = useReducer(userReducer, {
    id: "",
    username: "",
    email: "",
  });
  const [loaded, setLoaded] = useState(false);

  const getUser = async () => {
    await fetchUser(userDispatch, setLoaded);
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
      <UserContext.Provider value={user}>
        <UserDispatchContext.Provider value={userDispatch}>
          <RouterSwitch user={user} getUser={getUser} />
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
