import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const current = new Date();
// GET THIS MONTH
const thisMonth = current.toLocaleString("default", {
  year: "numeric",
  month: "short",
});
// GET Year
const year = current.toLocaleString("default", {
  year: "numeric",
});
const AdminSummary = () => {
  const [shohojPayInfo, setShohojPayInfo] = useState(null);
  const [monthServiceFilter, setMonthServiceFilter] = useState(thisMonth);
  const [monthService, setMonthService] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/getShohojPayInfo", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setShohojPayInfo(data);
        });
    } catch (error) {
      toast.error(error.message);
    }
    axios
      .get(`http://localhost:5000/all-service`, {
        headers: {
          "content-type": "application/json",
          monthServiceFilter,
        },
      })
      .then((res) => setMonthService(res.data));
  }, [monthServiceFilter]);
  // GET SERVICE INCLUDES TYPE
  const serviceType = (value) =>
    monthService.filter((service) => service.type.includes(value));
  serviceType("Receive Money");
  serviceType("Add Money");
  serviceType("Send Money");
  serviceType("Merchant Pay");
  serviceType("E-Check");
  // COUNT RECEIVE, EXPENSE, AND SAVINGS MONEY
  const totalAddArray = [
    ...serviceType("Add Money"),
    ...serviceType("Receive Money"),
  ];
  // const totalReceiveArray = [...serviceType("Receive Money")];
  const reducerCount = (value) => {
    return value.reduce(
      (previousValue, currentValue) =>
        Number(previousValue) + Number(currentValue?.amount),
      0
    );
  };
  const totalAddMoney = reducerCount(totalAddArray);
  const totalSendMoney = reducerCount(serviceType("Send Money"));
  const totalSaveMoney = reducerCount(serviceType("Save Money"));
  const totalECheck = reducerCount(serviceType("E-Check"));
  const totalMerchantPay = reducerCount(serviceType("Merchant Pay"));
  // SERVICE ALL DATA
  const serviceData = [
    { id: 1, name: "Add Money", icon: "fa-credit-card", amount: totalAddMoney },
    {
      id: 2,
      name: "Send Money",
      icon: "fa-paper-plane",
      amount: totalSendMoney,
    },
    {
      id: 3,
      name: "Save Money",
      icon: "fa-circle-dollar-to-slot",
      amount: totalSaveMoney,
    },
    {
      id: 4,
      name: "E-Check",
      icon: "fa-money-check-dollar",
      amount: totalECheck,
    },
    {
      id: 5,
      name: "Merchant Pay",
      icon: "fa-money-bill-trend-up",
      amount: totalMerchantPay,
    },
  ];
  return (
    <div className="container mx-auto lg:px-10 py-10">
      {/* START USER INFORMATION AND TRANSACTION */}
      <div className="lg:flex">
        {/* USER INFORMATION */}
        <div className="w-full lg:mt-0">
          {/* <div className="md:mx-10 lg:mx-0 card  rounded ">
            <div className="card-body py-0">
              <div className="text-left">
                <h4 className="">Total Balance</h4>
                <h1 className="text-6xl font-bold">$ 54654654</h1>
              </div>
            </div>
          </div> */}
          <div className="px-2">
            <div className="bg-base-200 shadow-lg rounded-md lg:px-16 py-10 px-3">
              <h4 className="mb-3">Total Revenue</h4>
              <h1 className="text-6xl font-bold">$ {shohojPayInfo?.revenue}</h1>
            </div>
          </div>
          {/* START STATISTIC */}
        </div>
        <div className="divider divider-horizontal divide-black px-9 divider-hidden"></div>
        <div className="">
          <div className="px-2 lg:w-96 w-full">
            <h3 className="font-bold text-xl pb-2 border-b border-black">
              Total Money Statistic
            </h3>
            <div>
              <select
                name="option"
                onChange={(e) => setMonthServiceFilter(e.target.value)}
                className="select select-ghost w-full max-w-xs mb-50 text-xl"
              >
                {/* <option defaultValue={filterDate}>{filterDate}</option> */}
                <option value={`Jan ${year}`}>{`Jan ${year}`}</option>
                <option value={`Feb ${year}`}>{`Feb ${year}`}</option>
                <option value={`Mar ${year}`}>{`Mar ${year}`}</option>
                <option value={`Apr ${year}`}>{`Apr ${year}`}</option>
                <option value={`May ${year}`}>{`May ${year}`}</option>
                <option value={`Jun ${year}`}>{`Jun ${year}`}</option>
                <option value={`Jul ${year}`}>{`Jul ${year}`}</option>
                <option value={`Aug ${year}`}>{`Aug ${year}`}</option>
                <option value={`Sep ${year}`}>{`Sep ${year}`}</option>
                <option value={`Oct ${year}`}>{`Oct ${year}`}</option>
                <option value={`Nov ${year}`}>{`Nov ${year}`}</option>
                <option value={`Dec ${year}`}>{`Dec ${year}`}</option>
              </select>
            </div>
            <div>
              {serviceData.map((service) => (
                <div className="flex items-center justify-between shadow bg-base-100 p-5 rounded mt-4">
                  <div className="flex items-center">
                    <i class={`fa-solid ${service?.icon} mr-2`}></i>{" "}
                    <h5 className="text-xl font-bold">{service?.name}</h5>{" "}
                  </div>
                  <h3 className="text-2xl">${service?.amount}</h3>
                </div>
              ))}
              {/* <div className="flex items-center justify-between shadow-lg p-5 rounded">
                <div className="flex items-center">
                  <i class="fa-solid fa-paper-plane mr-2"></i>{" "}
                  <h5 className="text-xl font-bold">Send Money</h5>{" "}
                </div>
                <h3 className="text-2xl">${totalSendMoney}</h3>
              </div>
              <div className="flex items-center justify-between shadow-lg p-5 rounded">
                <div className="flex items-center">
                  <i class="fa-solid fa-circle-dollar-to-slot mr-2"></i>{" "}
                  <h5 className="text-xl font-bold">Save Money</h5>{" "}
                </div>
                <h3 className="text-2xl">${totalSaveMoney}</h3>
              </div> */}
              {/* <div className="flex items-center justify-between shadow-lg p-5 rounded">
                <div className="flex items-center">
                  <i class="fa-solid fa-money-check-dollar mr-2"></i>{" "}
                  <h5 className="text-xl font-bold">E-Check</h5>{" "}
                </div>
                <h3 className="text-2xl">${totalECheck}</h3>
              </div> */}
              {/* <div className="flex items-center justify-between shadow-lg p-5 rounded">
                <div className="flex items-center">
                  <i class="fa-solid fa-money-bill-trend-up mr-2"></i>{" "}
                  <h5 className="text-xl font-bold">Merchant Pay</h5>{" "}
                </div>
                <h3 className="text-2xl">${totalMerchantPay}</h3>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
