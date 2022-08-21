import { Result } from "postcss";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import auth from "../../../firebase.init";

const MakeAdmin = () => {
  const [user] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data?.email;

    toast.loading("Making Admin in progress.", { id: "makingAdmin" });

    const updatedUser = {
      type: "admin",
    };

    fetch(`http://localhost:5000/makeadmin/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.dismiss("makingAdmin");
        if (result?.error) {
          toast.error(result.error);
        } else {
          reset();
          toast.success(result.success);
        }
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="eachServicesContainer md:w-[25rem] lg:w-[30rem] w-[22rem]">
        <h2 className="textColor text-[1.70rem] mb-3 pl-1">Manage Admin</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            className="h-12 p-2 mb-5 w-full rounded-lg"
            placeholder="User's email"
            required
          />
          <input
            type="submit"
            className="btn btn-sm btn-primary px-7  rounded-lg "
            value="ok"
          />
        </form>
      </div>
    </div>
  );
};

export default MakeAdmin;
