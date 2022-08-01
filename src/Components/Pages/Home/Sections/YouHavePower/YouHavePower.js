import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBills,
  faMoneyBillTransfer,
  faMoneyCheck,
  faPiggyBank,
  faSackDollar,
  faBolt,
  faShieldHalved,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const coreFeatures = () => {
  return (
    <div className="lg:p-20 md:p-18 py-20 w-full mx-auto bg-white">
      <h2 className="text-3xl text-center font-bold font-sans text-primary">
        You have the power
      </h2>
      <p className="text-center mt-4">
        Sohoj Pay provides the flexibility you need to manage your finance
        properly.
        <br /> Which is constantly getting better with you.
      </p>
      {/* CORE FUTURE CONTAINER */}
      <div className="coreServicesContainer mt-20 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        <div className="coreService text-center shadow rounded-xl p-5 m-5 lg:m-0 md:m-0">
          <figure className="w-24 h-24 mx-auto bg-[#F7FAFC] rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              className="mx-auto text-5xl text-primary"
              icon={faMoneyBillTransfer}
            />
          </figure>
          <p className="text-xl mt-4 mb-[6px]">Worldwide</p>
          <p>Worldwide payment is super easy with Shohoj Pay.</p>
        </div>
        <div className="coreService text-center shadow rounded-xl p-5 m-5 lg:m-0 md:m-0">
          <figure className="w-24 h-24 mx-auto bg-[#F7FAFC] rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              className="mx-auto text-5xl text-primary"
              icon={faMoneyCheck}
            />
          </figure>
          <p className="text-xl mt-4 mb-[6px]">eCheck</p>
          <p>Issue an eCheck with one tap with Shohoj Pay.</p>
        </div>
        <div className="coreService text-center shadow rounded-xl p-5 m-5 lg:m-0 md:m-0">
          <figure className="w-24 h-24 mx-auto bg-[#F7FAFC] rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              className="mx-auto text-5xl text-primary"
              icon={faPiggyBank}
            />
          </figure>
          <p className="text-xl mt-4 mb-[6px]">Savings</p>
          <p>
            Shohoj Pay offers you to save money with upto 3% of interest.
          </p>
        </div>
        <div className="coreService text-center shadow rounded-xl p-5 m-5 lg:m-0 md:m-0">
          <figure className="w-24 h-24 mx-auto bg-[#F7FAFC] rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              className="mx-auto text-5xl text-primary"
              icon={faMoneyBills}
            />
          </figure>
          <p className="text-xl mt-4 mb-[6px]">Loan</p>
          <p>Shohoj Pay provides adequate amount.</p>
        </div>
        <div className="coreService text-center shadow rounded-xl p-5 m-5 lg:m-0 md:m-0">
          <figure className="w-24 h-24 mx-auto bg-[#F7FAFC] rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              className="mx-auto text-5xl text-primary"
              icon={faSackDollar}
            />
          </figure>
          <p className="text-xl mt-4 mb-[6px]">Less Cost</p>
          <p>
            Shohoj pay offers a little cost in transaction.
          </p>
        </div>
        <div className="coreService text-center shadow rounded-xl p-5 m-5 lg:m-0 md:m-0">
          <figure className="w-24 h-24 mx-auto bg-[#F7FAFC] rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              className="mx-auto text-5xl text-primary"
              icon={faBolt}
            />
          </figure>

          <p className="text-xl mt-4 mb-[6px]">Fast payment method</p>
          <p>Your time is more valuable to Shohoj Pay.</p>
        </div>
        <div className="coreService text-center shadow rounded-xl p-5 m-5 lg:m-0 md:m-0">
          <figure className="w-24 h-24 mx-auto bg-[#F7FAFC] rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              className="mx-auto text-5xl text-primary"
              icon={faShieldHalved}
            />
          </figure>
          <p className="text-xl mt-4 mb-[6px]">Secured</p>
          <p>Shohoj Pay provides a strong secured system.</p>
        </div>
        <div className="coreService text-center shadow rounded-xl p-5 m-5 lg:m-0 md:m-0">
          <figure className="w-24 h-24 mx-auto bg-[#F7FAFC] rounded-full flex justify-center items-center">
            <FontAwesomeIcon
              className="mx-auto text-5xl text-primary"
              icon={faHeadset}
            />
          </figure>
          <p className="text-xl mt-4 mb-[6px]">24/7 Support</p>
          <p>Shohoj Pay fight against your issues</p>
        </div>
      </div>
    </div >
  );
};

export default coreFeatures;
