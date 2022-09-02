import React from "react";

// import { Parallax } from 'react-parallax';

import "./Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" bg-img1 bg-fixed  w-full mx-auto ">
        {/* <div className="hero-overlay bg-opacity-30"></div> */}
        <div className="flex items-center text-center lg:text-left container text-neutral-content px-6 lg:px-28 py-10 mt-14">
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-anchor-placement="center-bottom"
          >
            <h1
              style={{
                fontFamily: "Raleway, sans-ser",
                textShadow: "0px 1px 2px black",
                lineHeight: "120%",
              }}
              className="mb-5 text-secondary md:text-5xl lg:text-5xl text-4xl"
            >
              QUICK AND SECURE <br /> PAYMENTS STARTS WITH <br /> SHOHOJ PAY
            </h1>
            <p
              style={{ fontFamily: "Raleway, sans-ser" }}
              className="mx-auto mt-4 mb-4 text-color font-medium md:text-lg lg:text-lg max-w-[40rem]"
            >
              We make your life easy by providing you one of the most important
              services that is Finance. Use Shohoj Pay and kick out your
              problems.
            </p>
            <button
              onClick={() => navigate("/signUp")}
              style={{ fontFamily: "Raleway, sans-ser" }}
              className="text-color bg-white font lg:text-xl md:text-xl outline-base-300 border-4 rounded-full border-base-300 px-8 py-2 mt-4 hover:bg-primary hover:text-white duration-500"
            >
              GET YOUR FREE{" "}
              <span style={{ fontFamily: "Roboto, sans-ser" }}>25</span>$ NOW!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
