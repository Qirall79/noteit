import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import signupUser from "../utils/signupUser";

interface Props {
  getUser: any;
}

const Signup: React.FC<Props> = ({ getUser }): any => {
  const [redirect, setRedirect] = useState(false);
  const [response, setResponse] = useState({ message: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const username = (document.querySelector("#username") as HTMLInputElement)
      .value;
    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement)
      .value;
    const password_confirmation = (
      document.querySelector("#password_confirmation") as HTMLInputElement
    ).value;

    await signupUser(
      { username, email, password, password_confirmation },
      setRedirect,
      getUser,
      setResponse
    );
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full min-h-[94.4vh] px-20 py-20 bg-[#40916c]">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-semibold  pb-2 tracking-wide">Sign Up</h1>
        <p className="w-10 border-b-4 border-[#0e2219]"></p>
      </div>
      <form method="post" className="flex flex-col items-start gap-5">
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219]"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219]"
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219]"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="password_confirmation">
            Password Confirmation
          </label>
          <input
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219]"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />
        </div>
        <input
          className="bg-[#0e2219] font-medium text-sm text-white px-7 py-2 rounded-md cursor-pointer"
          type="submit"
          value="Sign up"
          onClick={handleSubmit}
        />
      </form>

      <p className="text-red-400">{response?.message}</p>
    </div>
  );
};

export default Signup;
