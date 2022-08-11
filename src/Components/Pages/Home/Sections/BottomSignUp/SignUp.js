import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="sign-up py-16">
      <h1 className="text-white text-4xl lg:text-6xl">
        Join the millions of users worldwide trusting Shohoj Pay everyday
      </h1>
      <Link
        to={"/signUp"}
        className="bg-white hover:bg-purple-200 text-xl block max-w-xs mx-auto mt-10 py-2 px-12 rounded-full font-semibold"
      >
        Sign Up For Free
      </Link>
    </div>
  );
};

export default SignUp;
