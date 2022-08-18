import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../../firebase.init";
import Spinner from "../../../Shared/Spinner/Spinner";
import useUser from '../../Hooks/useUser';

const RestrictAuth = ({ children }) => {
    let location = useLocation();
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [mongoUser] = useUser(user?.email)
    if (loading) {
        return <Spinner />;
    }
    if (user) {
        if (!mongoUser) return <Spinner></Spinner>
        else if (mongoUser) {
            if (mongoUser.type === "admin") {
                navigate('/adminpanel')
            }
            else if (mongoUser?.type === "merchant") {
                navigate("/merchant/dashboard")
            }
            else if (mongoUser.type === "personal") {
                navigate("/dashboard");
            }
        }
    }

    return children;
};

export default RestrictAuth;