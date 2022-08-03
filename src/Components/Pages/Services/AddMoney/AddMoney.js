import {
  Elements,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import "./AddMoney.css";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";

const stripePromise = loadStripe(
  "pk_test_51L105BIxM8sRxo2mh9agH6bogilwho5NgGj1UqtzfXtlLoaBTG4ufhc31Kem5Og0H5bfx1cfv87lGEZTNgDWGTTR007hgLkB5x"
);

const AddMoney = () => {
  const [user] = useAuthState(auth);

  const date = new Date().toLocaleDateString();
  const [addAmount, setAddAmount] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [cardError, setCardError] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/create-payment-intent", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ addAmount }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.clientSecret) {
  //         setClientSecret(data.clientSecret);
  //       }
  //     });
  // }, [addAmount]);

  const stripe = useStripe();
  const elements = useElements();

  const addMoneyToBackend = (id) => {
    //   const addMoneyInfo = {
    //     type: "addMoney",
    //     email: user.email,
    //     amount: addAmount,
    //     transactionId: id,
    //     date: date,
    //   };
    //   fetch("http://localhost:5000/addMoney", {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify({ addMoneyInfo }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));
    // };
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   if (!stripe || !elements) {
    //     return;
    //   }
    //   const card = elements.getElement(CardElement);
    //   if (!card) {
    //     return;
    //   }
    //   toast.loading("Please wait.", {
    //     id: "waitingToast",
    //   });
    //   const { error } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card,
    //   });
    //   setCardError(error?.message || "");
    //   const { paymentIntent, error: intentErr } = await stripe.confirmCardPayment(
    //     clientSecret,
    //     {
    //       payment_method: {
    //         card: card,
    //         billing_details: {
    //           name: `${user?.displayName}`,
    //           email: `${user?.email}`,
    //         },
    //       },
    //     }
    //   );
    //   if (intentErr) {
    //     toast.dismiss("waitingToast");
    //     setCardError(intentErr?.message);
    //     setConfirmed("");
    //   } else {
    //     const id = paymentIntent?.id;
    //     toast.dismiss("waitingToast");
    //     card.clear();
    //     setCardError("");
    //     addMoneyToBackend(id);
    //     setConfirmed(`$${addAmount} Added Successfully.`);
    //   }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-11 pl-1">Add Money</h2>
        <input
          required
          placeholder="How much to add?"
          className="h-12 p-2 w-full rounded"
          type="number"
          onChange={(e) => {
            setAddAmount(e.target.value);
          }}
        />
        <div className="w-full mt-7">
          <Elements stripe={stripePromise}>
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
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default AddMoney;
