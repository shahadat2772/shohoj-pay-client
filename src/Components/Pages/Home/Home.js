import React from "react";
// import Header from "./Sections/Header/Header";
import UserFlow from "./Sections/UserFlow/UserFlow";
import YouHavePower from "./Sections/YouHavePower/YouHavePower";
import WhyUs from "./Sections/WhyUs/WhyUs";
import Banner from "./Sections/Header/Banner";

const Home = () => {
  return (
    <div>
      <Banner/>
      <UserFlow></UserFlow>
      <YouHavePower></YouHavePower>
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
