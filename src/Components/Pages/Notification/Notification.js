import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../../firebase.init";
import EachNotification from "./EachNotification";
import "./Notification.css";

const Notification = () => {
  const [user, loading] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);

  const fetchNotification = (email) => {
    try {
      axios
        .get("http://localhost:5000/getNotification", {
          headers: {
            email: email,
          },
        })
        .then((res) => {
          setNotifications(res?.data);
        });
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const email = user.email;
    if (email) {
      fetchNotification(email);
    }
  }, [user]);

  return (
    <div className="min-h-screen">
      <div className="notificationContainer">
        <h2 className="text-3xl text-center text-gray-600 mb-10">
          Notifications
        </h2>
        <div className="notificationsContainer">
          {notifications?.map((notification) => (
            <EachNotification
              key={notification._id}
              notification={notification}
            ></EachNotification>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
