import React from "react";
import UserFlow from "./Sections/UserFlow/UserFlow";
import YouHavePower from "./Sections/YouHavePower/YouHavePower";
import SignUp from "./Sections/BottomSignUp/SignUp";
import Banner from "./Sections/Header/Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <UserFlow />
      <YouHavePower />
      <SignUp />
    </div>
  );
};

export default Home;
