import React from 'react';
import "./style.css";

const Banner = () => {
    return (
        <>
        <div class=" min-h-screen bg-img1">
  <div class="hero-overlay bg-opacity-30"></div>
  <div class="hero-content text-center text-neutral-content">
  <div className="max-w-lg">
            <h1 className="mb-5 mt-48 text-black text-4xl lg:text-5xl leading-10 font-bold ">
              Empty Life Without <span className="block mt-4">Shohoj Pay</span>
            </h1>
            <p className="text-black mt-4 mb-4 text-xl">
              We make your life easy by probiding you one of the most important
              services that is Finance. Use Shohoj Pay and kick out your
              problems.
            </p>
            <button class="text-black bg-white font-bold text-2xl outline outline-4  outline-offset-2 outline-base-300 border-4 rounded-full border-base-300 px-8 py-2 mt-4 hover:bg-secondary hover:text-white">Get Free 25$</button>
          </div>
  </div>
</div>
        </>

        
    );
};

export default Banner;