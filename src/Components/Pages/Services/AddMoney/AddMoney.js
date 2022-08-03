import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import CardForm from "./CardForm";
import "./AddMoney.css";

const stripePromise = loadStripe(
  "pk_test_51L105BIxM8sRxo2mh9agH6bogilwho5NgGj1UqtzfXtlLoaBTG4ufhc31Kem5Og0H5bfx1cfv87lGEZTNgDWGTTR007hgLkB5x"
);

const AddMoney = () => {
  const [addAmount, setAddAmount] = useState();

  // console.log(addAmount);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-11 pl-1">Add Money</h2>
        <input
          required
          placeholder="How much to add?"
          className="h-12 p-2 w-full rounded"
          type="number"
          onChange={(e) => {
            setAddAmount(e.target.value);
          }}
        />
        <div className="w-full mt-7">
          <Elements stripe={stripePromise}>
            <CardForm addAmount={addAmount} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default AddMoney;
