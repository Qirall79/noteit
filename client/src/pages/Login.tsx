import { useState } from "react";
import { Navigate } from "react-router-dom";
import loginUser from "../utils/loginUser";
import { useForm } from "react-hook-form";
import { MutatingDots } from "react-loader-spinner";

interface Props {
  getUser: any;
}

type formData = {
  username: string;
  password: string;
};

const Login = ({ getUser }: Props) => {
  const [response, setResponse] = useState({ message: "" });
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const handleClick = async (data: formData) => {
    setLoading(true);
    const res = await loginUser(data, setRedirect, getUser);
    if (res) {
      setResponse(res);
    }
    setLoading(false);
  };

  if (redirect) {
    return (
      <div>
        <Navigate to={"/"} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-[94.4vh] bg-[#1b4332] flex items-center justify-center">
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
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            name="username"
            id="username"
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219] mb-1"
          />
          <p className="text-sm font-medium text-[#ccff33]">
            {errors?.username?.message}
          </p>
        </div>
        <div className="w-full max-w-[500px] form-group flex flex-col gap-1">
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            name="password"
            id="password"
            className="h-8 rounded-sm outline-none pl-2 text-sm text-white bg-[#0e2219] mb-1"
          />
          <p className="text-sm font-medium text-[#ccff33]">
            {errors?.password?.message}
          </p>
        </div>
        <input
          type="submit"
          className="bg-[#0e2219] font-medium text-sm text-white px-7 py-2 rounded-md cursor-pointer"
          value="Login"
          onClick={handleSubmit(handleClick)}
        />
      </form>
      <p className="text-sm font-medium mt-3 text-[#ccff33]">
        {response?.message}
      </p>
    </div>
  );
};

export default Login;
