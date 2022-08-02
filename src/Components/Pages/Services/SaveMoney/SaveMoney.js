import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";

const SaveMoney = () => {
  const date = new Date().toLocaleDateString();

  const [user] = useAuthState(auth);

  const handleSaveMoney = (e) => {
    e.preventDefault();

    const saveMoneyAmount = e.target.saveMoneyAmount.value;

    const saveMoneyInfo = {
      type: "saveMoney",
      email: user?.email,
      amount: saveMoneyAmount,
      date: date,
    };
    fetch("http://localhost:5000/saveMoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ saveMoneyInfo }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="addMoneyContainer w-[30rem]">
        <h2 className="servicesHeader text-[1.70rem] mb-10 pl-1">Save Money</h2>
        <form onSubmit={(e) => handleSaveMoney(e)} action="">
          <p className="text-[1rem] mb-2 ml-[3px] servicesHeader">
            Get more then 3% return
          </p>
          <input
            type="number"
            className="h-12 p-2 w-full rounded-lg"
            name="saveMoneyAmount"
            placeholder="How much to save"
          />
          <input
            type="submit"
            className="actionButton mt-11 border-0"
            value="Save"
          />
        </form>
      </div>
    </div>
  );
};

export default SaveMoney;
