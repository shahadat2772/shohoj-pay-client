import React from 'react';
import "./style.css";

const Banner = () => {
    return (
        <>
        <div class=" min-h-screen bg-img1">
  <div class="hero-overlay bg-opacity-30"></div>
  <div class="hero-content text-center text-neutral-content">
  <div className="max-w-lg">
            <h1 className="mb-4 mt-40 font-mono text-zinc-800 text-4xl lg:text-5xl leading-10 font-bold ">
              Empty Life Without <span className="block mt-4 font-mono">Shohoj Pay</span>
            </h1>
            <p className="text-slate-800 mt-4 mb-2 text-xl font-serif">
              We make your life easy by providing most important
              services that is Finance. Use Shohoj Pay and kick out your
              problems.
            </p>
            <button class="text-black font-mono bg-white font-bold text-2xl outline outline-4  outline-offset-2 outline-base-300 border-4 rounded-full border-base-300 px-8 py-2 mt-4 hover:bg-secondary hover:text-white">Get Free 25$</button>
          </div>
  </div>
</div>
        </>

        
    );
};

export default Banner;