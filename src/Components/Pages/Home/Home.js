import React, { useEffect } from "react";
import Header from "./Sections/Header/Header";
import UserFlow from "./Sections/UserFlow/UserFlow";
import YouHavePower from "./Sections/YouHavePower/YouHavePower";
import WhyUs from "./Sections/WhyUs/WhyUs";
import Countdown from "./Sections/Countdown/Countdown";
import SignUp from "./Sections/BottomSignUp/SignUp";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <UserFlow></UserFlow>
      <YouHavePower></YouHavePower>
      <WhyUs></WhyUs>
      <Countdown></Countdown>
      <SignUp></SignUp>
    </div>
  );
};

export default Home;
