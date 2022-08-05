import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import auth from "../../../../firebase.init";

const SaveMoney = () => {
  const [user] = useAuthState(auth);
  const date = new Date().toLocaleDateString();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const amount = data?.amount;
    if (amount.slice(0, 1) === "0") {
      toast.error("Invalid save amount.");
      return;
    }

    toast.loading("Money is being saved.", { id: "saveMoneyLoading" });

    const saveMoneyInfo = {
      type: "saveMoney",
      email: user?.email,
      amount: amount,
      date: date,
    };

    fetch("https://shohoj-pay-server.herokuapp.com/saveMoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ saveMoneyInfo }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.dismiss("saveMoneyLoading");
        if (result.success) {
          reset();
          toast.success(result.success);
        } else {
          toast.error(result.error);
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-9 pl-1">Save Money</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-[1rem] mb-2 ml-[3px] textColor">
            Get more then 3% return
          </p>
          <input
            {...register("amount", {
              min: {
                value: 5,
                message: "$5 is the minimum save amount.",
              },
              max: {
                value: 1000,
                message: "$1000 is the maximum save amount at a time.",
              },
            })}
            required
            type="number"
            className="h-12 p-2 w-full rounded-lg"
            placeholder="How much to save?"
          />
          {errors.amount?.message && (
            <span className="text-[12px] text-red-600">
              {errors.amount?.message}
            </span>
          )}
          <input
            type="submit"
            className="actionButton block mt-11 border-0"
            value="Save"
          />
        </form>
      </div>
    </div>
  );
};

export default SaveMoney;
