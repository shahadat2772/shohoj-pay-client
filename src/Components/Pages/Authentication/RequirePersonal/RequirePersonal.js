import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../../firebase.init";
import Spinner from "../../../Shared/Spinner/Spinner";
import useUser from "../../Hooks/useUser";

const RequirePersonal = ({ children }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [user, loading] = useAuthState(auth);
  const [mongoUser, mongoUserLoading] = useUser(user);

  if (loading || mongoUserLoading) {
    return <Spinner />;
  }

  if (!user) {
    window.localStorage.removeItem("accessToken");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (mongoUser && mongoUser.type !== "personal") {
    if (mongoUser?.type === "admin") {
      return navigate("/adminpanel/summary");
    } else if (mongoUser.type === "merchant") {
      return navigate("/merchant/dashboard");
    }
  }

  return children;
};

export default RequirePersonal;
