import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";

interface IUser {
  id: string;
  username: string;
  email: string;
}

interface Props {
  user: IUser;
  getUser: any;
  setUser: any;
}

const RouterSwitch = ({ user, setUser, getUser }: Props) => {
  return (
    <BrowserRouter>
      <div className="w-full h-full">
        <Navbar isAuthenticated={Boolean(user.id)} />
        <Routes>
          <Route
            path="/"
            element={
              user.id ? <Home user={user} /> : <Navigate to={"/login"} />
            }
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
            element={
              user.id ? (
                <Logout setUser={setUser} />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default RouterSwitch;
