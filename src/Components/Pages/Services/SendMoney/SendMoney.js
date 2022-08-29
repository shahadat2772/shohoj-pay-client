import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { sendNotification, socket } from "../../../../App";
import auth from "../../../../firebase.init";
import useUser from "../../Hooks/useUser";
import "./SendMoney.css";
import Spinner from "../../../Shared/Spinner/Spinner";
// import emailjs from "@emailjs/browser";

const SendMoney = () => {
  const [user] = useAuthState(auth);
  const [mongoUser, mongoUserLoading] = useUser(user);
  const fullDate = new Date().toLocaleDateString();
  const date = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
  });
  const time = new Date().toLocaleTimeString();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  if (mongoUserLoading) {
    return <Spinner />;
  }
  // EMAIL JS ADDED
  // const formRef = useRef();

  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   console.log(formRef);
  //   console.log(formRef.current);

  //   emailjs
  //     .sendForm(
  //       //       // "YOUR_SERVICE_ID",
  //       // "service_q11i3to",
  //       //       // "YOUR_TEMPLATE_ID",
  //       // "template_60e7bmp",
  //       // formRef.current,
  //       //       // "YOUR_PUBLIC_KEY"
  //       // "_BZVGBP7_QzIIrIGO"
  //     )
  //     .then((result) => console.log(result.text))
  //     .catch((error) => console.log(error.text));
  // };
  const onSubmit = (data) => {
    const amount = data?.amount;
    const email = data?.email;

    if (amount.slice(0, 1) === "0") {
      toast.error("Invalid amount");
      return;
    }

    toast.loading("Money is being sended.", { id: "sendingMoney" });
    const sendMoneyInfo = {
      type: "Send Money",
      name: user?.displayName,
      email: user?.email,
      amount: amount,
      from: user?.email,
      to: email,
      fullDate,
      date,
      time,
      image: mongoUser?.avatar,
    };

    fetch("http://localhost:5000/sendMoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ sendMoneyInfo }),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.dismiss("sendingMoney");
        if (result?.error) {
          toast.error(result.error);
        } else {
          // eslint-disable-next-line no-unused-expressions
          reset();
          sendNotification(email, "sendMoney");
          toast.success(result.success);
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-11 pl-1">Send Money</h2>
        {/* <form ref={formRef} onSubmit={sendEmail}>
          <input
            type="text"
            name="user_name"
            className="user"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="user_email"
            className="user"
            placeholder="Email"
            required
          />
          <textarea
            name="message"
            className="user"
            placeholder="Message"
            required
          />
          <input type="submit" value="Send" className="button" />
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
        </form> */}
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
            placeholder="Receivers email"
            required
          />
          <p className="my-3">1% fee will be deducted if using send money</p>
          <input
            type="submit"
            className="actionButton mt-10 border-0"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
