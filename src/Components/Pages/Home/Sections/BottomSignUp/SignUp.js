import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="sign-up py-16 mb-16">
      <h1 className=" text-4xl lg:text-6xl bottomSignUpMainText">
        Join the millions of users worldwide trusting Shohoj Pay everyday
      </h1>
      <Link
        to={"/signUp"}
        // style={{ fontFamily: "Raleway, serf" }}
        className="text-xl block max-w-xs mx-auto mt-12 py-2 px-12 text-white md:text-2xl shadow rounded-full bg-primary hover:bg-white hover:text-black duration-500"
      >
        SIGN UP FOR FREE!
      </Link>
    </div>
  );
};

export default SignUp;
