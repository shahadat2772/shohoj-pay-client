import { Result } from "postcss";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";

const SendMoney = () => {
  const date = new Date().toLocaleDateString();

  const [user] = useAuthState(auth);

  const handleSendMoney = (e) => {
    e.preventDefault();

    const receiversEmail = e.target.receiversEmail.value;
    const sendMoneyAmount = e.target.sendMoneyAmount.value;
    const sendMoneyInfo = {
      type: "sendMoney",
      email: user?.email,
      from: user?.email,
      to: receiversEmail,
      amount: sendMoneyAmount,
      date: date,
    };
    fetch("http://localhost:5000/sendMoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ sendMoneyInfo }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="addMoneyContainer w-11/12 lg:w-1/2 bg-secondary bg-opacity-75 rounded-xl px-10 py-8">
        <h2 className="servicesHeader md:text-3xl text-2xl font-medium mb-12 text-center text-white">
          Send Money
        </h2>
        <form onSubmit={(e) => handleSendMoney(e)} action="">
          <input
            type="number"
            className="h-12 p-2 w-full rounded-lg mb-3"
            name="sendMoneyAmount"
            placeholder="How much to send"
          />

          <input
            type="email"
            className="h-12 p-2 w-full  rounded-lg "
            name="receiversEmail"
            placeholder="Receivers email"
          />
          <input
            type="submit"
            className="btn btn-primary w-full mt-3"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
