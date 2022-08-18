import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import EachNotification from "./EachNotification";
import "./Notification.css";

const Notification = ({
  fetchNotification,
  allNotification,
  unseenNotification,
  setUnseenNotification,
}) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const pathName = location?.pathname;

  useEffect(() => {
    if (pathName === "/notification" && unseenNotification.length > 0) {
      fetch("http://localhost:5000/updateNotificationStatus", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ unseenNotification }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            setUnseenNotification([]);
            setTimeout(() => {
              fetchNotification();
            }, 5000);
          }
        });
    }
  }, [pathName]);

  return (
    <div className="min-h-screen">
      <div className="notificationContainer">
        <h2 className="text-3xl text-center text-gray-600 mb-10">
          Notifications
        </h2>
        <div className="notificationsContainer">
          {allNotification?.map((notification) => (
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
