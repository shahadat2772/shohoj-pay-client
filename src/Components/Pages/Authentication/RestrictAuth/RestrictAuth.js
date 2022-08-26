import React from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../../firebase.init";
import Spinner from "../../../Shared/Spinner/Spinner";
import useUser from "../../Hooks/useUser";
import { useSelector } from "react-redux";

const RestrictAuth = ({ children }) => {
  const { signUpLoading } = useSelector((state) => state.signUpLoading);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [mongoUser, mongoUserLoading] = useUser(user);

  if (signUpLoading) {
    return children;
  }

  if (loading || mongoUserLoading) {
    return <Spinner />;
  }

  if (user && mongoUser) {
    if (mongoUser.type === "admin") {
      navigate("/adminpanel/summary");
    } else if (mongoUser?.type === "merchant") {
      navigate("/merchant/dashboard");
    } else if (mongoUser.type === "personal") {
      navigate("/dashboard");
    }
  }

  return children;
};

export default RestrictAuth;
