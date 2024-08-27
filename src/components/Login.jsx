import React, { useState } from "react";
import Header from "./Header";
import BgImg from "../assets/MainBgImg.jpg";
const Login = () => {
  const [SignInForm, SetSignInForm] = useState(true);
  const toggleSignInform = () =>{
    SetSignInForm(!SignInForm);
  }
  return (
    <div>
      <Header />
      <div className=" absolute">
        <img src={BgImg} alt="bg_img" />
      </div>
      <form
        className=" sm:w-1/3 w-3/12 absolute bg-black flex flex-col
        my-24 mx-auto left-0 right-0 text-white bg-opacity-70 "
      >
        <h1 className="font-bold text-2xl px-4 py-4 float-">{SignInForm ? "Sign In": "Sign Up"}</h1>
        <div className="flex flex-col items-center">
        {!SignInForm && (<input
            type="text"
            placeholder="Full Name"
            className=" w-8/12 p-2 m-2 bg-zinc-700 rounded-md"
          />)}
          <input
            type="email"
            placeholder="Email"
            className=" w-8/12 p-2 m-2 bg-zinc-700 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-8/12 p-2 m-2 bg-zinc-700 rounded-md"
          />
          <button className="w-8/12 p-2 mt-8 m-2 bg-red-700 rounded-md">{SignInForm ? "Sign In" : "Sign Up"}</button>
        </div>

        <p onClick={toggleSignInform} className="p-4 text-xs text-zinc-500 font-bold cursor-pointer w-max">{SignInForm ? "New to Netflix?  Sign Up": "Already a user?  Sign In"}</p>
      </form>
    </div>
  );
};

export default Login;
