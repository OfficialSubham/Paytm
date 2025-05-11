"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SignupPage = () => {
  const [togglePass, setTogglePass] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    type: "login"
  });

  const [isLogin, setIsLogin] = useState(false);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  return (
    <>
      {error && <div className="flex justify-center items-center text-white font-bold sticky top-[4.2rem] h-10 bg-gray-700 w-screen left-1/2">
        {error}
      </div>}

      <div className="w-screen bg-white/75 h-screen flex justify-center items-center px-5 md:px-0 text-white">
        <div className="w-96 rounded-xl backdrop-blur-xl bg-gray-600 px-10 py-10">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Login your account
            </h1>
            <h5 className="text-[12px] text-white">
              Don&apos; have an account?{" "}
              <Link href="/signup" className="hover:underline cursor-pointer">
                Sign up
              </Link>
            </h5>
          </div>
          <div className="flex my-7 flex-col gap-3">
            <div className="flex gap-3 flex-col">
              <input
                type="text"
                className="w-full h-8 rounded-md bg-gray-500 pl-2"
                placeholder="Email"
                name="email"
                onChange={handleOnchange}
                value={userData.email}
              />
              <div className="flex relative">
                <input
                  type={togglePass ? "text" : "password"}
                  className="w-full h-8 pr-8 rounded-md bg-gray-500 pl-2"
                  placeholder="Password"
                  name="password"
                  onChange={handleOnchange}
                  value={userData.password}
                />
                <div
                  className="absolute right-1 top-1.5"
                  onClick={() => {
                    setTogglePass(!togglePass);
                  }}
                >
                  <Image
                    src={`/turborepo.svg`}
                    alt="eye"
                    className="right-10"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
            </div>
            <button
              className="w-full flex items-center justify-center bg-black mt-5 h-10 rounded-md cursor-pointer hover:bg-black/80 transition-all"
              onClick={() => {
                setIsLogin(true)
                signIn("credentials", userData)
              }}
              disabled={isLogin}
            >
              {isLogin ? <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg> : <span>Login</span>}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-full bg-gray-500" />
            <span className="w-full text-[12px] text-center">Or login with</span>
            <div className="h-0.5 w-full bg-gray-500" />
          </div>
          <div className="w-full flex items-center gap-3 mt-3">
            <div className="w-full  hover:bg-white transition-all hover:text-black flex py-1 rounded-md justify-center border-gray-500 border">
              <button
                onClick={async () => {
                  try {
                    await signIn("google");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Google
              </button>
            </div>
            <div className="w-full flex py-1 rounded-md justify-center border-gray-500 border hover:bg-white transition-all hover:text-black">
              <button
                onClick={async () => {
                  try {
                    await signIn("facebook");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
