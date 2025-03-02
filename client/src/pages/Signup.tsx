import { Eye, EyeOff, Loader2, MessageSquareQuote } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type formValues = {
  fullName: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const { isSigningUp, signup } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>();

  const onSubmit: SubmitHandler<formValues> = (data) => {
    console.log(data);
    signup(data);
  };
  return (
    <>
      <div className="w-full h-full flex justify-between items-center">
        <div className="w-[100%] flex flex-col justify-center items-center bg-base-200 h-[90vh]">
          <div className="flex flex-col gap-3 justify-center items-center mb-10">
            <div>
              <MessageSquareQuote />
            </div>
            <h1 className="text-[20px] font-bold">Create Account</h1>
            <p className="text-[13px]">Get started with your free account</p>
          </div>
          <form
            className="w-[100%] flex flex-col justify-center items-center gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                placeholder="Username"
                {...register("fullName", { required: "Name is required" })}
                className="p-2 grow"
              />
              {errors.fullName && toast.error(`${errors.fullName.message}`)}
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "invalid format",
                  },
                })}
              />
              {errors.email && toast.error(`${errors.email.message}`)}
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPass ? "text" : "password"}
                className="grow"
                placeholder="password"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 character",
                  },
                })}
              />

              {showPass ? (
                <Eye
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer"
                />
              ) : (
                <EyeOff
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer"
                />
              )}
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <button
              type="submit"
              className="btn btn-primary text-white w-[320px]"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-6 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <div>
              <p>
                Already have an account?{" "}
                <span className="text-blue-400 font-bold">
                  <Link to={"/login"}>
                    <button className="cursor-pointer">Login</button>
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
        <div className="w-[100%] justify-center items-center bg-base-300 h-[90vh] lg:block hidden">
          <div className="diff aspect-[16/14.3]">
            <div className="diff-item-1">
              <div className="bg-primary text-primary-content grid place-content-center text-9xl font-black">
                GUFF
              </div>
            </div>
            <div className="diff-item-2">
              <div className="bg-base-200 grid place-content-center text-9xl font-black">
                GUFF
              </div>
            </div>
            <div className="diff-resizer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
