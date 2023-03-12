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
    <div className="w-full min-h-[94.4vh] px-20 py-20 bg-[#40916c]">
      <h1 className="text-2xl font-semibold border-b-4 border-[#0e2219] pb-2 w-7 mb-8 tracking-wide">
        Login
      </h1>
      <form method="post" className="flex flex-col items-start gap-5">
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219]"
          />
        </div>
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219]"
          />
        </div>
        <input
          type="submit"
          className="bg-[#0e2219] font-medium text-sm text-white px-7 py-2 rounded-md cursor-pointer"
          value="Login"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Login;
