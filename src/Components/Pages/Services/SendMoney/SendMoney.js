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
      <div className="addMoneyContainer w-[30rem]">
        <h2 className="servicesHeader text-[1.70rem] mb-11 pl-1">Send Money</h2>
        <form onSubmit={(e) => handleSendMoney(e)} action="">
          <input
            type="number"
            className="h-12 p-2 w-full mb-5 rounded"
            name="sendMoneyAmount"
            placeholder="How much to send?"
          />

          <input
            type="email"
            className="h-12 p-2 w-full rounded"
            name="receiversEmail"
            placeholder="Receivers email"
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

export default SendMoney;
