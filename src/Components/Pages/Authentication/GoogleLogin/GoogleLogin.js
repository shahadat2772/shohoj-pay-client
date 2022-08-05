import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../../firebase.init";
import googleLogo from "../../../../Images/google.svg";
import Spinner from "../../../Shared/Spinner/Spinner";

const GoogleLogin = () => {
  const [signInWithGoogle, user, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (googleError) {
      const errorMessage = googleError?.message.split(":")[1];
      toast.error(errorMessage);
    }
  }, [googleError]);
  const date = new Date().toLocaleDateString();
  useEffect(() => {
    if (user) {
      const userInfo = {
        type: "personal",
        name: user.user.displayName,
        email: user?.user?.email,
        date,
      };
      const createAccount = async () => {
        fetch("https://shohoj-pay-server.herokuapp.com/createAccount", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ userInfo }),
        })
          .then((res) => res.json())
          .then((result) => console.log(result));
      };

      // dispatch(setUser(userInfo))
      createAccount();
      setTimeout(() => {
        toast.success("User Login SuccessFull");
      }, 1000);
      navigate(from, { replace: true });
    }
  }, [from, navigate, user, date]);
  if (googleLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <button
        onClick={() => signInWithGoogle()}
        className="btn btn-outline w-full"
      >
        <img className="mr-2 w-7" src={googleLogo} alt="" />
        CONTINUE WITH GOOGLE
      </button>
    </div>
  );
};

export default GoogleLogin;
