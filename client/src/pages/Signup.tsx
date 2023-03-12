import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import signupUser from "../utils/signupUser";
import { useForm } from "react-hook-form";

interface Props {
  getUser: any;
}

type FormData = {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};

const Signup: React.FC<Props> = ({ getUser }): any => {
  const [redirect, setRedirect] = useState(false);
  const [response, setResponse] = useState({ message: "" });
  const [confirmation, setConfirmation] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleClick = async (data: any) => {
    console.log(data);
    if (data.password !== data.password_confirmation) {
      setConfirmation("Passwords don't match");
      return;
    }
    setConfirmation("");

    await signupUser(data, setRedirect, getUser, setResponse);
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
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219] mb-1"
            type="text"
            name="username"
            id="username"
          />
          <p className="text-sm font-medium text-[#ccff33]">
            {errors?.username?.message}
          </p>
        </div>
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219] mb-1"
            type="text"
            name="email"
            id="email"
          />
          <p className="text-sm font-medium text-[#ccff33]">
            {errors?.email?.message}
          </p>
        </div>
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219] mb-1"
            type="password"
            name="password"
            id="password"
          />
          <p className="text-sm font-medium text-[#ccff33]">
            {errors?.password?.message}
          </p>
        </div>
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="password_confirmation">
            Password Confirmation
          </label>
          <input
            {...register("password_confirmation", {
              required: {
                value: true,
                message: "Please confirm your password",
              },
            })}
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219] mb-1"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />
          <p className="text-sm font-medium text-[#ccff33]">
            {errors?.password_confirmation?.message || confirmation}
          </p>
        </div>
        <input
          className="bg-[#0e2219] font-medium text-sm text-white px-7 py-2 rounded-md cursor-pointer"
          type="submit"
          value="Sign up"
          onClick={handleSubmit(handleClick)}
        />
      </form>

      <p className="text-sm font-medium text-[#ccff33]">{response?.message}</p>
    </div>
  );
};

export default Signup;
