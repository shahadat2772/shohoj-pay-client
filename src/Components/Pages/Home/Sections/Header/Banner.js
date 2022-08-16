import React from "react";
import "./style.css";
<<<<<<< HEAD
// import { Parallax } from 'react-parallax';
=======
import "./Banner.css";
import { useNavigate } from "react-router-dom";
>>>>>>> 17bde2f89c4302c25984392138bef9fd93098303

const Banner = () => {
  const navigate = useNavigate();
  return (
<>
<div className=" min-h-screen bg-img1 bg-fixed">
        <div className="hero-overlay bg-opacity-30"></div>
<<<<<<< HEAD
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg"  data-aos="fade-zoom-in"
     data-aos-easing="ease-out-cubic"
     data-aos-delay="300"
     data-aos-offset="0">
            <h1 className="mb-5 mt-48 text-black text-4xl lg:text-5xl leading-10 font-bold ">
              Empty Life Without <span className="block mt-4">Shohoj Pay</span>
=======
        <div className="hero-content mx-auto text-center text-neutral-content min-h-screen">
          <div className="">
            <h1
              style={{
                fontFamily: "Raleway, sans-ser",
                textShadow: "0px 1px 2px black",
                lineHeight: "120%",
              }}
              className="mb-5 text-secondary md:text-6xl lg:text-6xl text-5xl font-bold"
            >
              EMPTY LIFE WITHOUT <br /> SHOHOJ PAY
>>>>>>> 17bde2f89c4302c25984392138bef9fd93098303
            </h1>
            <p
              style={{ fontFamily: "Raleway, sans-ser" }}
              className=" mt-4 mb-4 text-color font-medium md:text-lg lg:text-lg max-w-[40rem]"
            >
              We make your life easy by probiding you one of the most important
              services that is Finance. Use Shohoj Pay and kick out your
              problems.
            </p>
<<<<<<< HEAD
            <button className="text-black bg-white font-bold text-2xl outline
             outline-4  outline-offset-2 outline-base-300 border-4 rounded-full 
             border-base-300 px-8 py-2 mt-4 hover:bg-secondary hover:text-white">
              Get Free 25$
=======
            <button
              onClick={() => navigate("/signUp")}
              style={{ fontFamily: "Raleway, sans-ser" }}
              className="text-color bg-white font lg:text-2xl md:text-2xl outline-base-300 border-4 rounded-full border-base-300 px-8 py-2 mt-4 hover:bg-primary hover:text-white duration-500"
            >
              GET YOUR FREE{" "}
              <span style={{ fontFamily: "Roboto, sans-ser" }}>25</span>$ NOW!
>>>>>>> 17bde2f89c4302c25984392138bef9fd93098303
            </button>
          </div>
        </div>
      </div>
      </>
  );
};

export default Banner;
