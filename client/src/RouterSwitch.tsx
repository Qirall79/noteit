import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";

interface Props {
  getUser: any;
}

const RouterSwitch = ({ getUser }: Props) => {
  const user = useContext(UserContext);
  return (
    <BrowserRouter>
      <div className="w-full h-full">
        <Navbar isAuthenticated={Boolean(user.id)} />
        <Routes>
          <Route
            path="/"
            element={user.id ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={
              !user.id ? <Login getUser={getUser} /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/signup"
            element={
              !user.id ? <Signup getUser={getUser} /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/logout"
            element={user.id ? <Logout /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default RouterSwitch;
