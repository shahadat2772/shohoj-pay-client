import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import auth from "../../../../firebase.init";

const MerchantPay = () => {
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
    console.log(amount, email);

    toast.loading("Money is being sended.", { id: "sendingMoney" });

    const merchantPayInfo = {
      type: "Merchant Pay",
      name: user?.displayName,
      email: user?.email,
      amount: amount,
      from: user?.email,
      to: email,
      fullDate,
      date,
      time,
      fee: "0",
    };

    fetch("http://localhost:5000/personal-to-merchant", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ merchantPayInfo }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.dismiss("sendingMoney");
        if (result?.error) {
          toast.error(result.error);
        } else {
          // eslint-disable-next-line no-unused-expressions
          reset();
          toast.success(result.success);
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-11 pl-1">Merchant Pay</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("amount", {
              min: {
                value: 30,
                message: "$30 is the minimum send amount.",
              },
              max: {
                value: 1000,
                message: "$1000 is the maximum send amount at a time.",
              },
            })}
            type="number"
            className="h-12 p-2 w-full rounded"
            placeholder="How much to send?"
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
            placeholder="Merchant email"
            required
          />
          <input
            type="submit"
            className="actionButton mt-12 border-0"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default MerchantPay;