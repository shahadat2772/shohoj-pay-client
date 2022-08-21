import { signOut } from "firebase/auth";
import React from "react";
import toast from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../firebase.init";

const AdminPanel = () => {
  return (
    <div className="bg-gray-50">
      <div className="flex justify-evenly lg:justify-center items-center relative">
        <div className="drawer-content flex flex-col items-center justify-center">
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            </svg>
          </label>
        </div>
      </div>

      <div className="lg:flex lg:relative absolute font-p">
        <div className="drawer drawer-mobile w-60">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className=" drawer-side ">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 rounded-lg overflow-y-auto w-52 bg-white text-base-content justify-center">
              <li>
                <Link to="/adminpanel/summary">Summary</Link>
              </li>
              <li>
                <Link to="/adminpanel/makeadmin">Manage Admin</Link>
              </li>
              <li
                onClick={() => {
                  signOut(auth);
                  toast.success("Sign Out Successfully");
                }}
              >
                {" "}
                <Link to={""}>Sign Out</Link>{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:flex-grow lg:block hidden">
          <Outlet />
        </div>
      </div>
      <div className="lg:flex-grow lg:hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
