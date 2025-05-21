"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignupPage = () => {
  const [togglePass, setTogglePass] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if(error) {
      alert(error);
    }
  }, [error])

  return (
    <>
      <div className="w-screen bg-black min-h-full flex justify-center items-center px-5 md:px-0 text-white">
        <div className="h-full flex justify-center items-center">
          <div className="w-96 rounded-xl backdrop-blur-xl bg-gray-600 px-10 py-10">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Create an account
              </h1>
              <h5 className="text-[12px] text-white">
                Already have an account?{" "}
                <Link href="/login" className="hover:underline cursor-pointer">Log in</Link>
              </h5>
            </div>
            <div className="flex my-7 flex-col gap-3">
              <div className="flex w-full gap-5">
                <input
                  type="text"
                  className="w-full h-8 rounded-md bg-gray-500 pl-2"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleOnchange}
                  value={userData.firstName}
                />
                <input
                  type="text"
                  className="w-full h-8 rounded-md bg-gray-500 pl-2"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleOnchange}
                  value={userData.lastName}
                />
              </div>
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
                className="w-full bg-black mt-5 h-10 rounded-md cursor-pointer hover:bg-black/80 transition-all"
                onClick={async () => {
                  const data = await signIn("credentials", userData)
                  console.log("DATA : ", data)
                }}
              >
                Create Account
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-0.5 w-full bg-gray-500" />
              <span className="w-full text-[12px] text-center">Or register with</span>
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

      </div>
    </>
  );
};

export default SignupPage;
