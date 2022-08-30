import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { sendNotification } from "../../../../App";
import auth from "../../../../firebase.init";

const ECheck = () => {
  const fullDate = new Date().toLocaleDateString();
  const date = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
  });
  const time = new Date().toLocaleTimeString();
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const amount = data?.amount;
    const email = data?.email;
    const reference = data?.reference;
    toast.loading("Money is being Process.", { id: "apply-eCheck" });
    const eCheckInfo = {
      type: "E-Check",
      email: user?.email,
      amount: amount,
      name: user?.displayName,
      from: user?.email,
      to: email,
      reference: reference,
      fullDate,
      date,
      time,
    };

    fetch("http://localhost:5000/eCheck", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ eCheckInfo }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.dismiss("apply-eCheck");
        toast.dismiss();
        if (result?.error) {
          toast.error(result.error);
        } else {
          reset();
          sendNotification(email, "eCheck");
          toast.success(result.success);
        }
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-11 pl-1">E-Check Payment</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("amount", {
              min: {
                value: 5,
                message: "$5 is the minimum amount.",
              },
              max: {
                value: 1000,
                message: "$1000 is the maximum amount at a time.",
              },
            })}
            type="number"
            className="h-12 p-2 w-full rounded"
            placeholder="How much to be paid?"
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
            placeholder="Who to issue"
            required
          />
          <input
            {...register("reference")}
            type="text"
            className="h-12 p-2 mt-4 w-full rounded"
            placeholder="Write reference"
            required
          />
          <input
            type="submit"
            className="actionButton mt-12 border-0"
            value="Issue"
          />
        </form>
      </div>
    </div>
  );
};

export default ECheck;
