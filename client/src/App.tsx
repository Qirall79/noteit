import { useEffect, useState, useReducer } from "react";
import RouterSwitch from "./RouterSwitch";
import fetchUser from "./utils/fetchUser";
import { UserContext, UserDispatchContext } from "./contexts/userContext";
import userReducer from "./reducers/userReducer";
import { MutatingDots } from "react-loader-spinner";

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
      <div className="min-w-screen min-h-screen bg-[#1b4332] flex items-center justify-center">
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen">
      <UserDispatchContext.Provider value={userDispatch}>
        <UserContext.Provider value={user}>
          <RouterSwitch getUser={getUser} />
        </UserContext.Provider>
      </UserDispatchContext.Provider>
    </div>
  );
}

export default App;
