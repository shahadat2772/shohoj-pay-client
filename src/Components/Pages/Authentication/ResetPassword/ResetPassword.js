import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import auth from "../../../../firebase.init";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.success(
          "Password Resat Email SuccessFully sent. Check Your Email"
        );
        resetField("email");
      })
      .catch((error) => {
        const errors = error?.message.split(":")[1];
        toast.error(errors);
      });
  };
  return (
    <div className="flex items-center justify-center w-screen my-10 mt-24 lg:mt-32">
      <div className="card w-96 bg-base-100 shadow-xl mt-4">
        <div className="card-body">
          <h2
            data-testid="reset-pass"
            className="text-center font-bold text-xl"
          >
            Reset Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full  ">
              <label htmlFor="inputEmail" className="label">
                Email
              </label>
              <input
                id="inputEmail"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full "
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email Is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@.[a-z]{3}/,
                    message: "Invalid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <input
              className="btn w-full mt-5"
              type="submit"
              value="Reset Password"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
