"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const SignupPage = () => {
  const [togglePass, setTogglePass] = useState(false);

  return (
    <div className="w-screen bg-white/75 h-screen flex justify-center items-center px-5 md:px-0 text-white">
      <div className="w-96 h-96 rounded-xl backdrop-blur-xl bg-gray-600 px-10 py-10">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Create an account
          </h1>
          <h5 className="text-[12px] text-white">
            Already have an account?{" "}
            <span className="hover:underline cursor-pointer">Log in</span>
          </h5>
        </div>
        <div className="flex my-7 flex-col gap-3">
          <div className="flex w-full gap-5">
            <input
              type="text"
              className="w-full h-8 rounded-md bg-gray-500 pl-2"
              placeholder="First Name"
            />
            <input
              type="text"
              className="w-full h-8 rounded-md bg-gray-500 pl-2"
              placeholder="Last Name"
            />
          </div>
          <div className="flex gap-3 flex-col">
            <input
              type="text"
              className="w-full h-8 rounded-md bg-gray-500 pl-2"
              placeholder="Email"
            />
            <div className="flex relative">
              <input
                type={togglePass ? "text" : "password"}
                className="w-full h-8 pr-8 rounded-md bg-gray-500 pl-2"
                placeholder="Password"
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
          <button className="w-full bg-black mt-5 h-10 rounded-md cursor-pointer">Create Account</button>
        </div>
        {/* <div>
          <button
            className="bg-blue-400 p-4 rounded-2xl"
            onClick={async () => {
              try {
                await signIn("google", {
                  callbackUrl: "/",
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Sign In with Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SignupPage;
