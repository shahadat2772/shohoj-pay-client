import React from "react";
import UserFlow from "./Sections/UserFlow/UserFlow";
import YouHavePower from "./Sections/YouHavePower/YouHavePower";
import WhyUs from "./Sections/WhyUs/WhyUs";
import Countdown from "./Sections/Countdown/Countdown";
import SignUp from "./Sections/BottomSignUp/SignUp";
import Banner from "./Sections/Header/Banner";


const Home = () => {
  return (
    <div>
      <Banner/>
      <UserFlow></UserFlow>
      <YouHavePower></YouHavePower>
      <WhyUs></WhyUs>
      <Countdown></Countdown>
      <SignUp></SignUp>
    </div>
  );
};

export default Home;
