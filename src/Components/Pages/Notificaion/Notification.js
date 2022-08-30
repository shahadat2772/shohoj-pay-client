import React, { useEffect, useMemo } from "react";

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import EachNotification from "./EachNotification";
import "./Notification.css";
import { useSelector } from "react-redux";
import {
  fetchNotifications,
  updateUnseenNotifications,
} from "../../../app/slices/notificationSlice";
import { useDispatch } from "react-redux";
import Pagination from "../../Shared/Pagination/Pagination";
const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const pathName = location?.pathname;
  const dispatch = useDispatch();

  const { notifications, unseenNotifications } = useSelector(
    (state) => state.allNotification
  );
  const [user] = useAuthState(auth);
  const email = user?.email || user?.user?.email;

  // START PAGINATION
  let PageSize = 17;
  const currentNotification = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return notifications.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, notifications, PageSize]);
  useEffect(() => {
    if (pathName === "/notification" && unseenNotifications.length > 0) {
      fetch("http://localhost:5000/updateNotificationStatus", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ unseenNotifications }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            dispatch(updateUnseenNotifications([]));
            setTimeout(() => {
              dispatch(fetchNotifications(email));
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
          {notifications.length > 0 ? (
            currentNotification?.map((notification) => (
              <EachNotification
                key={notification._id}
                notification={notification}
              ></EachNotification>
            ))
          ) : (
            <div className="min-h-[60vh] flex justify-center items-center">
              <h2 className="text-xl gray">No notifications yet :(</h2>
            </div>
          )}
        </div>
        <div className={`mt-12 ${notifications.length < 17 && "hidden"}`}>
          {/* START PAGINATION */}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={notifications.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
