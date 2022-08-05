import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RequestMoney = () => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const [user] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const amount = data?.amount;
    const email = data?.email;

    if (amount.slice(0, 1) === "0") {
      toast.error("Invalid amount");
      return;
    }

    toast.loading("Money is being requested.", { id: "requestingMoney" });

    const requestMoneyInfo = {
      name: user?.displayName,
      amount: amount,
      email: user?.email,
      from: user?.email,
      to: email,
    };

    fetch("https://shohoj-pay-server.herokuapp.com/requestMoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ requestMoneyInfo }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.dismiss("requestingMoney");
        toast.dismiss();
        if (result?.error) {
          toast.error(result.error);
        } else {
          reset();
          toast.success(result.success);
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-11 pl-1">Request Money</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("amount", {
              min: {
                value: 5,
                message: "$5 is the minimum send amount.",
              },
              max: {
                value: 1000,
                message: "$1000 is the maximum send amount at a time.",
              },
            })}
            type="number"
            className="h-12 p-2 w-full rounded"
            placeholder="How much to request?"
            required
          />
          {errors.amount?.message && (
            <span className="text-[12px] text-red-600">
              {errors.amount?.message}
            </span>
          )}
          <input
            {...register("email")}
            type="email"
            className="h-12 p-2 mt-4 w-full rounded"
            placeholder="Senders email"
            required
          />
          <input
            type="submit"
            className="actionButton mt-12 border-0"
            value="Request"
          />
        </form>
      </div>
    </div>
  );
};

export default RequestMoney;
