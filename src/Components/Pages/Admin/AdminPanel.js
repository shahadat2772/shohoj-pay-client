import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../firebase.init";
import "./AdminPanel.css";

const AdminPanel = () => {
  // State for navIcon
  const [checked, setChecked] = useState(false);

  const adminMenuItems = (
    <div className="adminMenuItems">
      <li>
        <Link to="/adminpanel/summary">Summary</Link>
      </li>
      <li>
        <Link to="/adminpanel/manageAdmin">Admins</Link>
      </li>
      <li>
        <Link to="/adminpanel/manageAccounts">Accounts</Link>
      </li>
      <li
        onClick={() => {
          signOut(auth);
          window.localStorage.clear("accessToken");
        }}
      >
        <Link to={""}>Sign Out</Link>
      </li>
    </div>
  );

  return (
    <div className="">
      <div className="absolute top-3 left-3 md:left-7 bg-base-100 z-20 navIcon lg:hidden">
        {/* NavButton Icon */}
        <label htmlFor="my-drawer-2" className="">
          {checked ? (
            <FontAwesomeIcon
              style={{ width: "23px", height: "23px", color: "#909096" }}
              icon={faBarsStaggered}
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              style={{ width: "23px", height: "23px", color: "#909096" }}
              icon={faBars}
            ></FontAwesomeIcon>
          )}
        </label>
      </div>

      <div class="drawer drawer-mobile">
        <input
          onChange={() => setChecked(!checked)}
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
        />
        <div class="drawer-content px-2 py-3">
          {/* <!-- Page content here --> */}
          <Outlet />
        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-32 text-base-content justify-center bg-white">
            {/* <!-- Sidebar content here --> */}
            {adminMenuItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
