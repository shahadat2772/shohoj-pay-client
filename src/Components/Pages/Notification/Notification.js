import React from "react";
import "./Notification.css";

const Notification = () => {
  const fakeNotifications = [
    {
      message: "Received $15 from Shahadat hossain",
      date: "01/01/1200",
      time: "12:10 AM",
    },
    {
      message: "Shahadat hossain requested for $15.",
      date: "01/01/1200",
      time: "12:10 AM",
    },
    {
      message: "Shahadat hossain sended $15",
      date: "01/01/1200",
      time: "12:10 AM",
    },
    {
      message: "Shahadat hossain sended $15",
      date: "01/01/1200",
      time: "12:10 AM",
    },
    {
      message: "Shahadat hossain sended $15",
      date: "01/01/1200",
      time: "12:10 AM",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="notificationContainer">
        <h2 className="text-3xl text-center text-gray-600">Notifications</h2>
        <div className="notificationsContainer">
          {fakeNotifications.map((notification) => (
            <></>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
