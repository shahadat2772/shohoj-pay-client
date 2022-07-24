import React from "react";
import Header from "./Sections/Header/Header";
import UserFlow from "./Sections/UserFlow/UserFlow";
import YouHavePower from "./Sections/YouHavePower/YouHavePower";
import WhyUs from "./Sections/WhyUs/WhyUs";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <UserFlow></UserFlow>
      <YouHavePower></YouHavePower>
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
