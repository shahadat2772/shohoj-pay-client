import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactSignatureCanvas from "react-signature-canvas";
import { sendNotification } from "../../../../App";
import auth from "../../../../firebase.init";

const MerchantECheck = () => {
  const fullDate = new Date().toLocaleDateString();
  const date = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
  });
  const time = new Date().toLocaleTimeString();
  const [user] = useAuthState(auth);
  const [signature, setSignature] = useState("");
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
    const eCheckInfo = {
      type: "E-Check",
      email: user?.email,
      amount: amount,
      name: user?.displayName,
      from: user?.email,
      to: email,
      reference: reference,
      signature,
      fullDate,
      date,
      time,
    };
    if (!signature) return toast.error("please signature first");

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
          clear();
          setSignature("");
          sendNotification(email, "merchantECheck");
          toast.success(result.success);
        }
      });
  };

  const signatureRef = useRef(null);
  const clear = () => {
    signatureRef.current.clear();
    setSignature("");
  };
  const trim = () => {
    const signatureData = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignature(signatureData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center mt-20">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem] relative">
        <h2 className="textColor text-[1.70rem] mb-11 pl-1">E-Check</h2>
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
          <label className="mt-4 inline-block ">E-Signature</label>
          <ReactSignatureCanvas
            ref={signatureRef}
            onEnd={trim}
            canvasProps={{ className: "sigCanvas border mt-3 h-24 w-full" }}
            required
          />

          <input
            type="submit"
            className="actionButton mt-12 border-0"
            value="Issue"
          />
        </form>
        <button className="absolute bottom-48 right-12" onClick={clear}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MerchantECheck;
