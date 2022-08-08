import React from "react";
import "./UserFlow.css";

const UserFlow = () => {
  return (
    <div className="container md:max-w-[70rem] mx-auto py-20 lg:mt-10">
      {/* GRID USERFLOW CARD */}
      <div className="grid grid-cols-1 lg:gap-0 md:gap-0 gap-12 lg:grid-cols-3 md:grid-cols-2 bg-white rounded p-5 py-15  md:px-4 sm:px-4">
        <div className="px-4 flow-1">
          <div className="flex items-center mb-4">
            <a href="" className="ac-create-icon m-auto">
              <i className="fa-solid fa-user-plus text-5xl"></i>
            </a>
          </div>
          <h1 className="text-center font-[500] text-[22px] mb-3">
            Create account
          </h1>
          <p className="text-center text-[16px] lg:px-4">
            Checkout how easy is to create an Shohoj Pay account. By the way
            don't forgot your 25$ free on sign up.
          </p>
        </div>

        {/* USERFLOW CARD */}
        <div className="px-4 flow-2">
          <div className="flex items-center mb-4">
            <a href="" className="ac-create-icon m-auto">
              <i className="fa-solid fa-credit-card text-5xl"></i>
            </a>
          </div>
          <h1 className="text-center font-[500] text-[22px] mb-3">Add Money</h1>
          <p className="text-center text-[16px] lg:px-4">
            You have never added balance that easy before, to your digital
            wallet. Requires only the amount and card info.
          </p>
        </div>
        {/* USERFLOW CARD */}
        <div className="px-4 flow-3">
          <div className="flex items-center mb-4">
            <a href="" className="ac-create-icon m-auto">
              <i className="fa-solid fa-earth-americas text-5xl"></i>
            </a>
          </div>
          <h1 className="text-center text-[22px] font-[500] mb-3">
            Start Transaction
          </h1>
          <p className="text-center text-[16px] lg:px-4">
            You have got your account ready, balance in it, now what? Start
            transactions all over the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserFlow;
