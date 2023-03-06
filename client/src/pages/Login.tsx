import { useState } from "react";
import { Navigate } from "react-router-dom";
import loginUser from "../utils/loginUser";

interface Props {
  getUser: any;
}

const Login = ({ getUser }: Props) => {
  const [loaded, setLoaded] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username: string | null = (
      document.querySelector("#username") as HTMLInputElement
    ).value;
    const password: string | null = (
      document.querySelector("#password") as HTMLInputElement
    ).value;

    setLoaded(false);
    await loginUser({ username, password }, setRedirect, getUser);
    setLoaded(true);
  };

  if (redirect) {
    return (
      <div>
        <Navigate to={"/"} />
      </div>
    );
  }

  if (!loaded) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[92.5vh] px-20 py-10 bg-slate-200">
      <form method="post">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <input type="submit" value="Login" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default Login;
