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
  const [userEmail, setUserEmail] = useState(user?.email);
  const [userPhone, setUserPhone] = useState(user?.phone);
  const [nameCanSave, setNameCanSave] = useState(false);
  const [AddressCanSave, setAddressCanSave] = useState(false);
  const [PhoneCanSave, setPhoneCanSave] = useState(false);
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
      .then((data) => {
        if (data.modifiedCount) {
          if (updatedUser.name) {
            setEditName(false);
            setNameCanSave(false)
          }
          else if (updatedUser.address) {
            setEditAddress(false);
            setAddressCanSave(false)
          }
          else if (updatedUser.phone) {
            setEditContact(false);
            setPhoneCanSave(false)
          }


        }
      });
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
                onChange={(e) => {
                  setNameCanSave(true);
                  setUserName(e.target.value)
                }}

              />
            </div>
          </div>
          <div className="absolute top-3 right-3 flex items-center space-x-4">
            <div
              onClick={() => setEditName(true)}
              className={`${editName && "hidden"
                } cursor-pointer col-span-3 place-self-center`}
            >
              {/* edit  */}
              <FontAwesomeIcon className=" text-gray-500" icon={faPen} />
            </div>
            <div
              onClick={() => setEditName(false)}
              className={`${!editName && "hidden"
                } cursor-pointer col-span-3 px-4 py-2 rounded-lg place-self-center`}
            >
              {/* cancel  */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <button
              disabled={!nameCanSave}
              onClick={() => updateUser({ name: userName })}
              className={`${!editName && "hidden"
                }  btn btn-sm btn-primary place-self-center`}
            >
              {/* save  */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

            </button>
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
          <div className="flex justify-between items-center relative">
            <h3 className="text-xl text-left mb-3">Address</h3>

            <div className="absolute top-3 right-3 flex items-center space-x-4">
              <div
                onClick={() => setEditAddress(true)}
                className={`${editAddress && "hidden"
                  } cursor-pointer col-span-3 place-self-center`}
              >
                {/* edit  */}
                <FontAwesomeIcon className=" text-gray-500" icon={faPen} />
              </div>
              <div
                onClick={() => setEditAddress(false)}
                className={`${!editAddress && "hidden"
                  } cursor-pointer col-span-3 px-4 py-2 rounded-lg place-self-center`}
              >
                {/* cancel  */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>


              </div>
              <button
                disabled={!AddressCanSave}
                onClick={() => updateUser({ address: userAddress })}
                className={`${!editAddress && "hidden"
                  }  btn btn-sm btn-primary place-self-center`}
              >
                {/* save  */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

              </button>
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
                onChange={(e) => {
                  setUserAddress(e.target.value);
                  setAddressCanSave(true)
                }}
                disabled={!editAddress}
                className="input input-text  bg-white col-span-5"
                type="text"
                value={userAddress || user?.address}
              />
            </form>
          </div>
        </div>

        {/* contact div */}
        <div className="rounded-lg p-5 w-full lg:w-10/12 place-self-end  mr-0 bg-white ">
          {/* title div */}
          <div className="flex justify-between items-center relative">
            <h3 className="text-xl text-left mb-3">Contact informations</h3>

            <div className="absolute top-3 right-3 flex items-center space-x-4">
              <div
                onClick={() => setEditContact(true)}
                className={`${editContact && "hidden"
                  } cursor-pointer col-span-3 place-self-center`}
              >
                {/* edit  */}
                <FontAwesomeIcon className=" text-gray-500" icon={faPen} />
              </div>
              <div
                onClick={() => setEditContact(false)}
                className={`${!editContact && "hidden"
                  } cursor-pointer col-span-3 px-4 py-2 rounded-lg place-self-center`}
              >
                {/* cancel  */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>


              </div>
              <button
                disabled={!PhoneCanSave}
                onClick={() => updateUser({ phone: userPhone })}
                className={`${!editContact && "hidden"
                  }  btn btn-sm btn-primary place-self-center`}
              >
                {/* save  */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

              </button>
            </div>
          </div>

          {/* options container */}

          <div className="mt-5 grid grid-cols-1 gap-2">
            {/* Email */}
            <form className="grid grid-cols-1 lg:grid-cols-6 gap-3">
              <label className="flex items-center font-semibold ">Email:</label>
              <input
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
                onChange={(e) => {
                  setUserPhone(e.target.value);
                  setPhoneCanSave(true)
                }}
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
