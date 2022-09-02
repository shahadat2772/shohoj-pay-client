import React from "react";

const EachNotification = ({ notification }) => {
  return (
    <div
      className={`flex w-full bg-white eachNotification ${
        notification?.status === "unseen" && "bg-teal-50"
      }`}
    >
      <div
        className={`unreadSign w-[6px] h-[6px] md:w-[8px] md:h-[8px] ${
          notification?.status === "unseen" && "showUnseenSign"
        }`}
      ></div>
      <div className="avatarImage">
        <img
          className="rounded-full w-[40px] md:w-[48px] lg:w-[48px] h-[40px] md:h-[48px] lg:h-[48px]"
          src={notification?.image}
          alt="User Image"
        />
      </div>
      <div className="messageContainer">
        <p>{notification.message}</p>
      </div>
      <div className="timeAndDate ml-auto text-sm text-right gray">
        <p>{notification.time}</p>
        <p>{notification.date}</p>
      </div>
    </div>
  );
};

export default EachNotification;
