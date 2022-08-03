import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import "./CardForm.css";

const CardForm = ({ addAmount }) => {
  const date = new Date().toLocaleDateString();

  const [confirmed, setConfirmed] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [user] = useAuthState(auth);

  const stripe = useStripe();
  const elements = useElements();

  const addMoneyToBackend = (id) => {
    const addMoneyInfo = {
      type: "addMoney",
      email: user.email,
      amount: addAmount,
      transactionId: id,
      date: date,
    };
    fetch("http://localhost:5000/addMoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ addMoneyInfo }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  useEffect(() => {
    if (addAmount) {
      console.log({ addAmount });

      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ addAmount }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }
  }, [addAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    toast.loading("Please wait.", {
      id: "waitingToast",
    });
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");

    const { paymentIntent, error: intentErr } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: `${user?.displayName}`,
            email: `${user?.email}`,
          },
        },
      }
    );

    if (intentErr) {
      toast.dismiss("waitingToast");
      setCardError(intentErr?.message);
      setConfirmed("");
    } else {
      const id = paymentIntent?.id;
      toast.dismiss("waitingToast");
      card.clear();
      setCardError("");
      addMoneyToBackend(id);
      setConfirmed(`$${addAmount} Added Successfully.`);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              padding: "10px",
              base: {
                fontSize: "16px",
                color: "#424770",
                lineHeight: "3rem",
                borderRadius: 30,
                "::placeholder": {
                  color: "#aab7c4",
                },
                backgroundColor: "#fff",
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="actionButton mt-11"
          type="submit"
          disabled={!stripe || !clientSecret || confirmed || !addAmount}
        >
          Add
        </button>
      </form>
      <p className="text-xs text-red-500 mt-1 ml-1">{cardError && cardError}</p>
    </div>
  );
};

export default CardForm;
