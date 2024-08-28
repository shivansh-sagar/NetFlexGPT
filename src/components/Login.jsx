import React, { useRef, useState } from "react";
import Header from "./Header";
import BgImg from "../assets/MainBgImg.jpg";
import { checkValidData } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
const Login = () => {
  const [SignInForm, SetSignInForm] = useState(true);
  const [ErrMessage, SetErrMessage] = useState(null);
  const toggleSignInform = () => {
    SetSignInForm(!SignInForm);
  };
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const EMessage = checkValidData(
      email.current.value,
      password.current.value
    );
    SetErrMessage(EMessage);

    if (EMessage) return;
    // Sign Up logic
    if (!SignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          SetErrMessage(errorCode + "-" + errorMessage);
          // ..
        });
    }
    // Sign In Logic
     else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode +":"+errorMessage)
          
        });
    }
    
  };
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img className=" h-screen object-cover" src={BgImg} alt="bg_img" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-[300px] sm:w-2/5 md:w-4/12 lg:w-3/12 absolute bg-black flex flex-col
        my-64 mx-auto left-0 right-0 text-white bg-opacity-60 "
      >
        <h1 className="font-bold text-2xl px-4 py-4 float-">
          {SignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div className="flex flex-col items-center">
          {!SignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className=" w-9/12 p-2 m-2 bg-zinc-700 rounded-sm"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email"
            className=" w-9/12 p-2 m-2 bg-zinc-700 rounded-sm"
          />
          <p className="  items-start text-[10px] text-red-500  ">
            {!ErrMessage ? null : ErrMessage.email}
          </p>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-9/12 p-2 m-2 bg-zinc-700 rounded-sm"
          />
          <p className="  items-start text-[10px] text-red-500   ">
            {!ErrMessage ? null : ErrMessage.password}
          </p>
          <button
            className="w-9/12 p-2 mt-7 mx-2 bg-red-700 rounded-sm"
            onClick={handleButtonClick}
          >
            {SignInForm ? "Sign In" : "Sign Up"}
          </button>
          {/* // An error message if not register */}
        </div>

        <p
          onClick={toggleSignInform}
          className="p-4 text-xs text-zinc-500 font-bold cursor-pointer w-max"
        >
          {SignInForm
            ? "New to Netflix?  Sign Up Now"
            : "Already a user?  Sign In"}
        </p>
        <p className="px-4 pb-2 text-[9px] text-zinc-400 ">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </form>
    </div>
  );
};

export default Login;
