import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useToken from "../../Hooks/useToken";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import Spinner from "../../../Shared/Spinner/Spinner";
import useUser from "../../Hooks/useUser";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateSignUpLoading } from "../../../../app/slices/signUpLoadingSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showNamePart, setShowNamePart] = useState(true);
  const [showPasswordPart, setShowPasswordPart] = useState(false);
  const [showTypePart, setShowTypePart] = useState(false);
  const [progress, setProgress] = useState(1);
  const [dbUserCreationLoading, setDbUserCreationLoading] = useState(false);
  const imageStorageKey = `d65dd17739f3377d4d967e0dcbdfac26`;
  const passwordShowRef = useRef("");
  const date = new Date().toLocaleDateString();
  const dispatch = useDispatch();

  const [
    createUserWithEmailAndPassword,
    user,
    userCreatLoading,
    userCreateError,
  ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, uerror] = useUpdateProfile(auth);

  const [token, tokenLoading] = useToken(user);
  const [mongoUser, mongoUserLoading] = useUser(user);
  const { signUpLoading } = useSelector((state) => state.signUpLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(updateSignUpLoading(true));
    const email = data.email;
    const password = data.password;
    if (data.password !== data.ConfirmPassword) {
      dispatch(updateSignUpLoading(false));
      return toast.error("Opps Password Not Match");
    }

    const emailCheckResponse = await axios.get(
      `http://localhost:5000/checkemailexists/${email}`
    );
    if (emailCheckResponse?.data?.error) {
      dispatch(updateSignUpLoading(false));
      return toast.error(emailCheckResponse.data.error, {
        id: "emailExistsErr",
      });
    }

    setDbUserCreationLoading(true);

    const file = data.avatar[0];
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    const imgUploadRes = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imgUploadResult = await imgUploadRes.json();

    if (!imgUploadResult.success === true) {
      dispatch(updateSignUpLoading(false));
      setDbUserCreationLoading(false);
      return toast.error("Something went wrong.", {
        id: "signUpERR",
      });
    }

    const name = data.firstName + " " + data.lastName;
    const userInfo = {
      ...data,
      name,
      avatar: imgUploadResult.data.url,
      date,
      status: "active",
    };
    delete userInfo.password;
    delete userInfo.ConfirmPassword;
    delete userInfo.firstName;
    delete userInfo.lastName;

    const userUploadRes = await fetch("http://localhost:5000/createAccount", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userInfo }),
    });

    const userUploadResult = await userUploadRes.json();

    if (!userUploadResult?.userResult?.insertedId) {
      dispatch(updateSignUpLoading(false));
      setDbUserCreationLoading(false);
      return toast.error("Something went wrong.", {
        id: "signUpERR",
      });
    }
    await setDbUserCreationLoading(false);
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: data.firstName + " " + data.lastName });
  };

  console.log(
    tokenLoading,
    mongoUserLoading,
    userCreatLoading,
    dbUserCreationLoading,
    updating
  );
  if (
    userCreatLoading ||
    tokenLoading ||
    mongoUserLoading ||
    dbUserCreationLoading ||
    updating
  ) {
    return <Spinner />;
  }

  if (user && token && mongoUser) {
    toast.success("Signed up successfully.", {
      id: "successfulSignUp",
    });
    dispatch(updateSignUpLoading(false));
    if (mongoUser.type === "admin") {
      navigate("/adminpanel/summary");
    } else if (mongoUser?.type === "merchant") {
      navigate("/merchant/dashboard");
    } else if (mongoUser.type === "personal") {
      navigate("/dashboard");
    }
  }

  const handleShow = () => {
    const passShow = passwordShowRef.current.checked;
    setShow(passShow);
  };

  if (userCreateError || uerror) {
    dispatch(updateSignUpLoading(false));
    const error =
      userCreateError?.message.split(":")[1] || uerror?.message.split(":")[1];
    toast.error(error, {
      id: "userCreationToast",
    });
  }

  return (
    <div className="flex items-center justify-center w-screen my-10 mt-24 lg:mt-32">
      <div className="card w-96 bg-base-100 shadow-xl">
        <ul className="steps steps-horizontal">
          <li className={`step step-primary`}></li>
          <li className={`step ${progress > 1 && "step-primary"}`}></li>
          <li className={`step ${progress > 2 && "step-primary"}`}></li>
        </ul>
        <div className="card-body">
          <h2
            data-testid="signUp-heading"
            className="text-center font-bold text-xl"
          >
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name and Email part  */}
            <div className={`${showNamePart ? "block" : "hidden"}`}>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-name">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full max-w-xs lg:max-w-sm"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "First Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.firstName?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-name">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full max-w-xs lg:max-w-sm"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Last Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.lastName?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-email">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@.[a-z]{3}/,
                      message: "Your Email Have Must Be A Special characters",
                    },
                  })}
                />
                <label className="label">
                  {errors?.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors?.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-name">Phone</span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered w-full max-w-xs lg:max-w-sm"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone Number is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.phone?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.phone.message}
                    </span>
                  )}
                </label>
              </div>
              <button
                onClick={() => {
                  if (Object.keys(errors).length !== 0) {
                    if (
                      !errors.firstName &&
                      !errors.lastName &&
                      !errors.email &&
                      !errors.phone
                    ) {
                      setProgress(2);
                      setShowTypePart(true);
                      setShowNamePart(false);
                    }
                  }
                }}
                className="btn w-full"
              >
                Next
              </button>
            </div>
            {/* --------------------------- */}

            {/* Account Type  and Address */}
            <div className={`${showTypePart ? "block" : "hidden"}`}>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-name">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="city, country"
                  className="input input-bordered w-full max-w-xs lg:max-w-sm"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.address?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.address.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-name">Zip Code</span>
                </label>
                <input
                  type="number"
                  placeholder="Zip or Area code"
                  className="input input-bordered w-full max-w-xs lg:max-w-sm"
                  {...register("zip", {
                    required: {
                      value: true,
                      message: "Zip or Area code is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors?.zip?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors?.zip.message}
                    </span>
                  )}
                </label>
              </div>

              <label className="label ">Account Type</label>
              <div className="flex justify-between items-center mt-2 mb-7 px-1">
                <div className="flex space-x-2 items-center">
                  <input
                    {...register("type", { required: true })}
                    type="radio"
                    name="type"
                    value="personal"
                    className="radio radio-primary"
                    id="personal"
                    checked
                  />
                  <label htmlFor="personal">Personal</label>
                </div>
                <div className="flex space-x-2 items-center">
                  <input
                    {...register("type", { required: true })}
                    type="radio"
                    name="type"
                    value="merchant"
                    className="radio radio-primary"
                    id="merchant"
                  />
                  <label htmlFor="merchant">Merchant</label>
                </div>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-name">Avatar</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered w-full max-w-xs lg:max-w-sm"
                  {...register("avatar", {
                    required: {
                      value: true,
                      message: "Avatar is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.avatar?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.avatar.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setShowNamePart(true);
                    setShowTypePart(false);
                  }}
                  className="btn btn-outline lg:w-5/12"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!errors?.address && !errors?.zip && !errors?.avatar) {
                      setProgress(3);
                      setShowPasswordPart(true);
                      setShowTypePart(false);
                    }
                  }}
                  className="btn lg:w-6/12"
                >
                  Next
                </button>
              </div>
            </div>
            {/* ------------------------------- */}
            {/* Password Part  */}
            <div className={`${showPasswordPart ? "block" : "hidden"}`}>
              <div className="relative form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-password">Password</span>
                </label>
                {/* PASSWORD SHOW HIDE */}
                <div
                  onClick={handleShow}
                  className="absolute inset-y-0 right-3 flex items-center px-2 top-6"
                >
                  <label className="swap swap-rotate">
                    <input ref={passwordShowRef} type="checkbox" />
                    <i className="fa-solid fa-eye-low-vision swap-on fill-current"></i>
                    <i className="fa-solid fa-eye swap-off fill-current"></i>
                  </label>
                </div>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password Is Required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password Must Be 6 characters",
                    },
                  })}
                />
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-password">Confirm Password</span>
                </label>

                <input
                  type={show ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("ConfirmPassword", {
                    required: {
                      value: true,
                      message: "Please Type A Confirm Password",
                    },
                  })}
                />
                <label className="label">
                  {errors.ConfirmPassword?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.ConfirmPassword.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setShowPasswordPart(false);
                    setShowTypePart(true);
                  }}
                  className="btn btn-outline lg:w-5/12"
                >
                  Back
                </button>
                <input
                  className="btn lg:w-6/12"
                  type="submit"
                  value="Register"
                />
              </div>
            </div>
            {/* ---------------------------------- */}
          </form>
          <p
            className={`${showNamePart ? "block text-center my-2" : "hidden"}`}
          >
            Already have an account ?{" "}
            <Link className="font-bold text-secondary" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
