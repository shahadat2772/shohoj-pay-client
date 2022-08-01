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
      <div className="addMoneyContainer w-11/12 lg:w-1/2 bg-secondary bg-opacity-75 rounded-xl px-10 py-8">
        <h2 className="servicesHeader md:text-3xl text-2xl font-medium mb-12 text-center text-white">
          Save Money
        </h2>
        <form onSubmit={(e) => handleSaveMoney(e)} action="">
          <input
            type="number"
            className="h-12 p-2 w-full rounded-lg"
            name="saveMoneyAmount"
            placeholder="How much to save"
          />
          <input
            type="submit"
            className="btn btn-primary w-full mt-3"
            value="Save"
          />
        </form>
      </div>
    </div>
  );
};

export default SaveMoney;
