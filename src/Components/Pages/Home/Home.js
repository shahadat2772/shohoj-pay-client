import React from "react";
import Header from "./Sections/Header/Header";
import UserFlow from "./Sections/UserFlow/UserFlow";
import YouHavePower from "./Sections/YouHavePower/YouHavePower";
import WhyUs from "./Sections/WhyUs/WhyUs";
import SupportEngine from "../SupportEngine";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <UserFlow></UserFlow>
      <YouHavePower></YouHavePower>
      <WhyUs></WhyUs>
      <SupportEngine />
    </div>
  );
};

export default Home;
