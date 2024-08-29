import React, { useRef, useState } from "react";
import Header from "./Header";
import BgImg from "../assets/MainBgImg.jpg";
import { checkValidData } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { Alert } from 'antd';
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SignInForm, SetSignInForm] = useState(true);
  const [ErrMessage, SetErrMessage] = useState(null);
  const toggleSignInform = () => {
    SetSignInForm(!SignInForm);
  };
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  //  HANDLING BUTTON FUNCTION
  const handleButtonClick = () => {
    const EMessage = checkValidData(
      email.current.value,
      password.current.value
    );
    console.log(EMessage);
    SetErrMessage(EMessage);

    if (EMessage) return;

    // SIGN UP LOGIC
    if (!SignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: "https://lh3.googleusercontent.com/a/ACg8ocL-D_UnF_svMgALftuysN2cbclnGErNQmDKycOaz-kf4mVZ9eANCA=s96-c",
          })
            .then(() => {
              // Profile updated!
              const {uid, email, displayName} = auth.currentUser;
              dispatch(
                addUser({uid: uid, email: email, displayName: displayName})
              )
              navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              SetErrMessage(error.message);
              // ...
            });
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
    // SIGN IN LOGIC
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
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          SetErrMessage(errorCode + "-" + errorMessage);
          console.log(ErrMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img
          className=" h-screen w-screen object-cover"
          src={BgImg}
          alt="bg_img"
        />
      </div>

      {/* FORM START HERE */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-[300px] sm:w-2/5 md:w-4/12 lg:w-3/12 absolute bg-black flex flex-col p-4 my-32 md:my-64
        lg:my-64 mx-auto left-0 right-0 text-white bg-opacity-60 "
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
      {/* FORM ENDS HERE */}
    </div>
  );
};

export default Login;
