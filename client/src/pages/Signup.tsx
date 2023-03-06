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
    <div className="w-full min-h-[92.5vh] px-20 py-10 bg-slate-200">
      <form method="post">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />
        </div>
        <input type="submit" value="Sign up" onClick={handleSubmit} />
      </form>

      <p className="text-red-400">{response?.message}</p>
    </div>
  );
};

export default Signup;
