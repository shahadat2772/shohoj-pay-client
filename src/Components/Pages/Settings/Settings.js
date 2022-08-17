import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./settings.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [editAddress, setEditAddress] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [editName, setEditName] = useState(false);
  const [user, setUser] = useState({});
  const [firebaseUser, loading] = useAuthState(auth);
  const [userName, setUserName] = useState(user?.name);
  const [userAddress, setUserAddress] = useState(user?.address);
  const [userZip, setUserZip] = useState(user?.zip);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [userPhone, setUserPhone] = useState(user?.phone);
  const navigate = useNavigate();

  useState(() => {
    fetch("http://localhost:5000/getUserInfo", {
      method: "GET",
      headers: {
        email: firebaseUser.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const updateUser = (updatedUser) => {
    fetch("http://localhost:5000/updateUserInfo", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  if (loading) return <p>loading...</p>;
  if (!user) return <p>Loading user ....</p>;
  return (
    <section className="px-3 pt-20 lg:px-20 lg:pb-20 lg:pt-40 lg:flex w-full">
      {/* right part */}
      <div className="w-full lg:w-1/2 order-2 p-3 lg:p-10 ">
        {/* user div */}
        <div className="rounded-lg p-5 w-full lg:w-10/12 bg-white relative">
          <div className="w-full flex-col items-center ">
            <div>
              <figure className="flex justify-start items-end mb-3 relative ">
                <div className="h-44 w-44 bg-primary  rounded-full"></div>

                <p
                  className={` text-white text-center cursor-pointer font-semibold absolute h-24 w-44 bg-black opacity-0 hover:bg-opacity-25 hover:opacity-100 pt-5 rounded-br-full rounded-bl-full`}
                >
                  change photo
                </p>
              </figure>
            </div>
            <div className="w-full">
              <input
                disabled={!editName}
                className="input input-text text-2xl lg:text-3xl lg:text-left text-center bg-white w-full"
                type="text"
                value={userName || user?.name}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <div
              onClick={() => setEditName(true)}
              className={`${
                editName && "hidden"
              } cursor-pointer col-span-3 place-self-center`}
            >
              <FontAwesomeIcon className=" text-gray-500" icon={faPen} />
            </div>
            <div
              onClick={() => updateUser({ name: userName })}
              className={`${
                !editName && "hidden"
              } cursor-pointer col-span-3 bg-primary px-4 py-2 text-white rounded place-self-center`}
            >
              save
            </div>
          </div>
        </div>

        {/* security div */}
        <div className="rounded-lg p-5 w-full lg:w-10/12 place-self-end  mr-0 mt-5 bg-white ">
          {/* title div */}
          <div className="w-1/2 ">
            <h3 className="text-xl text-left mb-3">Security</h3>
          </div>
          <p
            onClick={() => navigate("/resetPassword")}
            className={"cursor-pointer btn-link"}
          >
            change your current password
          </p>
        </div>
      </div>

      {/* left part  */}
      <div className=" w-full lg:w-1/2 grid grid-cols-1 gap-5 p-5">
        {/* address section */}
        <div className="rounded-lg p-5 w-full lg:w-10/12 place-self-end  bg-white ">
          {/* title div */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl text-left mb-3">Address</h3>
            <div
              onClick={() => setEditAddress(true)}
              className={`${editAddress && "hidden"} cursor-pointer col-span-2`}
            >
              <FontAwesomeIcon className=" text-gray-500" icon={faPen} />
            </div>
            <div
              onClick={() => updateUser({ address: userAddress, zip: userZip })}
              className={`${
                !editAddress && "hidden"
              } cursor-pointer col-span-2 bg-primary px-4 py-2 text-white rounded`}
            >
              save
            </div>
          </div>

          {/* options container */}

          <div className="mt-5 grid grid-cols-1 gap-2">
            {/* address */}
            <form className="grid grid-cols-1 lg:grid-cols-6 gap-3">
              <label className="flex items-center font-semibold ">
                Address:
              </label>
              <input
                onChange={(e) => setUserAddress(e.target.value)}
                disabled={!editAddress}
                className="input input-text  bg-white col-span-5"
                type="text"
                value={userAddress || user?.address}
              />
            </form>
            <hr />
            {/* zip code */}
            <form className="grid grid-cols-1 lg:grid-cols-6 gap-3">
              <label className="flex items-center font-semibold ">Zip:</label>
              <input
                onChange={(e) => setUserZip(e.target.value)}
                disabled={!editAddress}
                className="input bg-white col-span-5"
                type="number"
                value={userZip || user?.zip}
              />
            </form>
          </div>
        </div>

        {/* contact div */}
        <div className="rounded-lg p-5 w-full lg:w-10/12 place-self-end  mr-0 bg-white ">
          {/* title div */}
          <div className="flex justify-between items-center ">
            <h3 className="text-xl text-left mb-3">Contact informations</h3>
            <div
              onClick={() => setEditContact(true)}
              className={`${editContact && "hidden"} cursor-pointer col-span-2`}
            >
              <FontAwesomeIcon className=" text-gray-500" icon={faPen} />
            </div>
            <div
              onClick={() => updateUser({ email: userEmail, phone: userPhone })}
              className={`${
                !editContact && "hidden"
              } cursor-pointer col-span-2 bg-primary px-4 py-2 text-white rounded`}
            >
              save
            </div>
          </div>

          {/* options container */}

          <div className="mt-5 grid grid-cols-1 gap-2">
            {/* Email */}
            <form className="grid grid-cols-1 lg:grid-cols-6 gap-3">
              <label className="flex items-center font-semibold ">Email:</label>
              <input
                onChange={(e) => setUserEmail(e.target.value)}
                disabled={true}
                className="input input-text  bg-white col-span-5"
                type="email"
                value={userEmail || user?.email}
              />
            </form>
            <hr />

            {/* phone number */}
            <form className="grid grid-cols-1 lg:grid-cols-6 gap-3">
              <label className="flex items-center font-semibold ">
                Phone :
              </label>
              <input
                onChange={(e) => setUserPhone(e.target.value)}
                disabled={!editContact}
                className="input input-text  bg-white col-span-5"
                type={"tel"}
                value={userPhone || user?.phone}
              />
            </form>
          </div>
        </div>

        {/* delete div */}
        <div className="p-5 lg:px-24 lg:pt-20 lg:pb-0 ">
          <div className="btn pl-0  text-error btn-ghost rounded">
            Delete Account
          </div>
        </div>
        {/* blank commit  */}
      </div>
    </section>
  );
};

export default Settings;
