import React from "react";

const Header = () => {
  return (
    <section className="relative pt-0">
      {/* text part */}
      <div class="hero  min-h-screen">
        <div class="hero-overlay z-0 bg-primary bg-opacity-30"></div>
        <div class="hero-content text-center text-white ">
          <div class="max-w-lg">
            <h1 class="mb-5 text-4xl lg:text-5xl leading-10 font-bold">
              Empty Life Without <span className="block">Shohoj Pay</span>
            </h1>
            <p class="">
              We make your life easy by probiding you one of the most important
              services that is Finance. Use Shohoj Pay and kick out your
              problems.
            </p>
          </div>
        </div>
      </div>
      {/* img part */}
      <figure className="w-10/12 lg:w-7/12 absolute bottom-20 lg:bottom-10 left-5 lg:left-64 ">
        <img className="" src="/assets/images/banner-image.svg" alt="banner" />
      </figure>
      <div className="bg-secondary h-32 lg:h-96 w-full"></div>
    </section>
  );
};

export default Header;
