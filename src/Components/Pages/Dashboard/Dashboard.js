import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Shared/Spinner/Spinner";
import { signOut } from "firebase/auth";
<<<<<<< HEAD
// USER TRANSACTION FAKE DATA
const COLORS = ["#000", "#414CDA", "#23E792", "#FF8042"];
// FAKE DATA
const data = [
  { name: "January", value: 7541, email: "ahsdf@gmail.com" },
  { name: "April", value: 6574, email: "ahsdf@gmail.com" },
  { name: "July", value: 5465, email: "ahsdf@gmail.com" },
=======
// SERVICE DATA
const someServices = [
  {
    type: "Add",
    icon: "fa-credit-card",
    action: "/services/addMoney",
  },
  {
    type: "Send",
    icon: "fa-paper-plane",
    action: "/services/sendMoney",
  },
  {
    type: "Request",
    icon: "fa-hand-holding-dollar",
    action: "/services/requestMoney",
  },
  {
    type: "More",
    icon: "fa-ellipsis-vertical",
    action: "/services",
  },
>>>>>>> 17bde2f89c4302c25984392138bef9fd93098303
];
// SERVICE DATA
const someServices = [
  {
    type: "Add",
    icon: "fa-credit-card",
    action: "/services/addMoney",
  },
  {
    type: "Send",
    icon: "fa-paper-plane",
    action: "/services/sendMoney",
  },
  {
    type: "Request",
    icon: "fa-hand-holding-dollar",
    action: "/services/requestMoney",
  },
  {
    type: "More",
    icon: "fa-ellipsis-vertical",
    action: "/services",
  },
];
// FIND TODAY DATE MONTH YEAR
<<<<<<< HEAD
let dateObj = new Date();
let shortMonth = dateObj.toLocaleString("default", { month: "long" });
let getDate =
  dateObj.getUTCDate() + " " + shortMonth + "," + dateObj.getUTCFullYear();
=======
const filterDate = new Date().toLocaleDateString("en-us", {
  year: "numeric",
  month: "short",
});
const getPreviousDate = (number) => {
  const current = new Date();
  current.setMonth(current.getMonth() - number);
  return current.toLocaleString("default", {
    year: "numeric",
    month: "short",
  });
};
>>>>>>> 17bde2f89c4302c25984392138bef9fd93098303
const todayDate = new Date().toLocaleDateString();
// WELCOME DASHBOARD SECTION
const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [monthService, setMonthService] = useState([]);
  const [monthServiceFilter, serMonthServiceFilter] = useState(filterDate);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  // LATEST TRANSACTION
  const latestTransaction = [...transactionData].splice(
    transactionData.length - 4,
    transactionData.length
  );
  const serviceType = (value) =>
    monthService.filter((service) => service.type.includes(value));
  serviceType("Receive Money");
  serviceType("Add Money");
  serviceType("Send Money");
  serviceType("Request Money");

  const totlaReceiveMoney = [
    ...serviceType("Receive Money"),
    ...serviceType("Add Money"),
  ];
  const totalLossMoney = [
    ...serviceType("Send Money"),
    ...serviceType("Request Money"),
  ];
  const reducerCount = (value) => {
    return value.reduce(
      (previousValue, currentValue) =>
        Number(previousValue) + Number(currentValue?.amount),
      0
    );
  };
  const TotalRecive = reducerCount(totlaReceiveMoney);
  console.log(TotalRecive);
  const TotalCost = reducerCount(totalLossMoney);
  const totalSavings = reducerCount(serviceType("Save Money"));
  // PAICHART DATA
  const COLORS = ["#066106", "#c30606", "#050566"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const data = [
    {
      name: "Receive",
      value: TotalRecive ? TotalRecive : 1,
      email: user.email,
    },
    { name: "Cost", value: TotalCost ? TotalCost : 1, email: user.email },
    {
      name: "Savings",
      value: totalSavings ? totalSavings : 1,
      email: user.email,
    },
  ];
  useEffect(() => {
    // USER BALANCE AMOUNT GET
    axios
      .get(`http://localhost:5000/getUserBalances/${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setBalance(res.data);
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        signOut(auth);
        toast.error(error?.message);
        navigate("/");
      });
    // USER TRANSACTION DATA GET
    axios
      .get(`http://localhost:5000/transactionStatus/${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setTransactionData(res.data))
      .catch((error) => {
        toast.error(error?.message);
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/");
      });
    console.log(monthServiceFilter);
    axios
      .get(`http://localhost:5000/getServices`, {
        headers: {
          "content-type": "application/json",
          email: user.email,
          monthServiceFilter,
        },
      })
      .then((res) => setMonthService(res.data));
    if (shareLinkCopied) {
      toast.success("Copied Transaction Information");
    }
  }, [user.email, shareLinkCopied, navigate, monthServiceFilter]);

  // COPY TEXT FUNCTION
  const onShare = (data) => {
    navigator.clipboard.writeText(`
    Date: ${data.date}
    Email: ${data.email}
    Type: ${data.type}
    Amount: ${data.amount}$
    `);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };
  if (transactionData === 0) {
    return <Spinner />;
  }
  return (
    <div className="container mx-auto lg:mt-28 lg:px-10 py-10">
      {/* START USER INFORMATION AND TRANSACTION */}
      <div className="lg:flex">
        {/* USER INFORMATION */}
        <div className="w-full mt-10 lg:mt-0">
          <div className="md:mx-10 lg:mx-0 card  rounded ">
            <div className="card-body py-0">
              <h1 className="text-left text-3xl font-bold mb-3">
                Hi, {user?.displayName}
              </h1>
              <div className="text-left">
                <h4 className="">Total Balance</h4>
                <h1 className="text-6xl font-bold">$ {balance?.balance}</h1>
              </div>
            </div>
          </div>
          {/* SOME SERVICE */}
          <div className="mt-10 px-2">
            <h2 className="border-b-4 border-black w-48 font-bold text-xl">
              Get Service
            </h2>
            <div className="flex align-center justify-between bg-base-200 shadow-lg rounded-md lg:px-16 py-10 my-8 px-3">
              {someServices.map((service, index) => {
                const { type, icon, action } = service;
                return (
                  <div key={index}>
                    <div
                      onClick={() => navigate(action)}
                      className="bg-primary p-6 rounded-full cursor-pointer"
                    >
                      <i className={`fa-solid ${icon} text-3xl text-white`}></i>
                    </div>
                    <p className="mt-2 font-bold text-center">{type}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* START  LAST TRANSACTION*/}
          <div className="mt-10 lg:mt-0">
            {transactionData.length === 0 ? (
              <h2 className="text-2xl font-bold text-red-500 p-14 text-center">
                You Have Not Made Any Transactions Yet
              </h2>
            ) : (
              <div className=" px-2">
                <h3 className="font-bold text-xl border-b-4 border-black pb-2 w-48">
                  Last Transaction
                </h3>
                <ul className="mt-8">
                  {latestTransaction.slice(0, 4).map((transAction) => (
                    <li
<<<<<<< HEAD
                      className={`flex items-center my-4 p-3 rounded-lg w-full ${
                        transAction.type === "Add Money" ||
                        transAction.type === "Receive Money"
                          ? "bg-green-200"
                          : "bg-red-200"
                      }`}
                      key={transAction._id}
                    >
                      <div className="lg:mr-8 w-36">
                        <h5>
                          {transAction.date === todayDate
                            ? "Today"
                            : transAction.date}
                        </h5>
                        <h6>{transAction.time}</h6>
                      </div>
                      <div className="avatar">
                        <div className="w-16 rounded-full ">
=======
                      className={`flex items-center my-4 p-3 rounded-lg w-full shadow-sm`}
                      key={transAction._id}
                    >
                      <div className="lg:mr-8 w-36">
                        <h5 className="gray text-sm mb-1">
                          {transAction.fullDate === todayDate
                            ? "Today"
                            : transAction.fullDate}
                        </h5>
                        <h6 className="gray text-sm">{transAction.time}</h6>
                      </div>
                      <div className="avatar">
                        <div className="w-14 rounded-full ">
>>>>>>> 17bde2f89c4302c25984392138bef9fd93098303
                          <img
                            src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                            alt="User Image"
                          />
                        </div>
                      </div>
                      <div className="ml-5 flex items-center justify-between w-full">
                        <div>
                          <h5
<<<<<<< HEAD
                            className={`font-bold text-lg ${
                              transAction.type === "Add Money" ||
                              transAction.type === "Receive Money"
                                ? "text-green-800"
                                : "text-red-800"
                            }`}
                          >
                            {transAction.type}
                          </h5>
                          <h5 className="">{transAction?.userEmail}</h5>
                        </div>
                        <div className="" onClick={() => onShare(transAction)}>
                          <i className="fa-solid fa-copy cursor-pointer"></i>
                        </div>
                        <div>
                          <h3
                            className={`text-lg font-bold text-right ${
                              transAction.type === "Add Money" ||
                              transAction.type === "Receive Money"
                                ? "text-green-800"
                                : "text-red-800"
=======
                            className={` font-medium text-lg mb-[2px]
                            `}
                          >
                            {transAction.type}
                          </h5>
                          <h5 className="gray text-sm">
                            {transAction?.userEmail}
                          </h5>
                        </div>
                        <div className="" onClick={() => onShare(transAction)}>
                          <i className="fa-solid fa-copy cursor-pointer gray"></i>
                        </div>
                        <div>
                          <h3
                            className={`text-2xl font-medium text-right ${
                              transAction.type === "Add Money" &&
                              "text-green-600"
                            } ${
                              transAction.type === "Receive Money" &&
                              "text-green-600"
>>>>>>> 17bde2f89c4302c25984392138bef9fd93098303
                            }`}
                          >
                            {transAction.type === "Add Money" ||
                            transAction.type === "Receive Money"
                              ? "+" + transAction.amount
<<<<<<< HEAD
                              : "-" + transAction.amount}{" "}
=======
                              : "-" + transAction.amount}
>>>>>>> 17bde2f89c4302c25984392138bef9fd93098303
                            $
                          </h3>
                        </div>
                      </div>
                    </li>
                  ))}
                  <div className="text-center">
                    {transactionData.length >= 1 && (
                      <button
                        onClick={() => navigate("/dashboard/allTransAction")}
                        className="btn btn-primary btn-sm mt-5 p-2"
                      >
                        View All Transaction
                      </button>
                    )}
                  </div>
                </ul>
              </div>
            )}
            {/* START STATISTIC */}
          </div>
        </div>
        <div className="divider divider-horizontal divide-black px-9 divider-hidden"></div>
        <div className="">
          <div className="px-2 w-full">
            <h3 className="font-bold text-xl pb-2 border-b border-black">
              Statistic
            </h3>
            <div>
              <select
                name="option"
                onChange={(e) => serMonthServiceFilter(e.target.value)}
                className="select select-ghost w-full max-w-xs mb-50 text-xl"
              >
                <option defaultValue={filterDate}>{filterDate}</option>
                <option value={getPreviousDate(1)}>{getPreviousDate(1)}</option>
                <option value={getPreviousDate(2)}>{getPreviousDate(2)}</option>
              </select>
            </div>
            <div className=" flex justify-center h-22 ">
              <div className="w-full lg:w-96 h-72">
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip />
                    <Legend style={{ width: "333px" }} />
                    <Pie
                      dataKey="value"
                      data={data}
                      fill="#8884d8"
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {" "}
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
