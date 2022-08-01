import React from 'react';
import "./style.css";

const Banner = () => {
    return (
        <>
        <div class=" min-h-screen bg-image bg-base-100">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
  <div className="max-w-lg">
            <h1 className="mb-5 mt-48 text-blue-600/75 text-4xl lg:text-5xl leading-10 font-bold ">
              Empty Life Without <span className="block text-blue-600/100">Shohoj Pay</span>
            </h1>
            <p className="text-blue-600/75 mt-4 mb-4">
              We make your life easy by probiding you one of the most important
              services that is Finance. Use Shohoj Pay and kick out your
              problems.
            </p>
            <button class="btn text-blue-800 font-bold text-2xl border-2 border-indigo-500 px-8 mt-4 hover:bg-sky-700">Get Free 25$</button>
          </div>
  </div>
</div>
        </>

        
    );
};

export default Banner;