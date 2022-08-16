import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Dashboard.css";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Shared/Spinner/Spinner";
import { signOut } from "firebase/auth";
// USER TRANSACTION FAKE DATA
const COLORS = ["#000", "#414CDA", "#23E792", "#FF8042"];
// FAKE DATA
const data = [
  { name: "January", value: 7541, email: "ahsdf@gmail.com" },
  { name: "April", value: 6574, email: "ahsdf@gmail.com" },
  { name: "July", value: 5465, email: "ahsdf@gmail.com" },
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
let dateObj = new Date();
let shortMonth = dateObj.toLocaleString("default", { month: "long" });
let getDate =
  dateObj.getUTCDate() + " " + shortMonth + "," + dateObj.getUTCFullYear();
const todayDate = new Date().toLocaleDateString();
// WELCOME DASHBOARD SECTION
const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  // LATEST TRANSACTION
  const latestTransaction = [...transactionData].splice(
    transactionData.length - 4,
    transactionData.length
  );
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
    if (shareLinkCopied) {
      toast.success("Copied Transaction Information");
    }
  }, [user.email, shareLinkCopied, navigate]);
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
                          <img
                            src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                            alt="User Image"
                          />
                        </div>
                      </div>
                      <div className="ml-5 flex items-center justify-between w-full">
                        <div>
                          <h5
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
                            }`}
                          >
                            {transAction.type === "Add Money" ||
                            transAction.type === "Receive Money"
                              ? "+" + transAction.amount
                              : "-" + transAction.amount}{" "}
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

        <div>
          <div className="">
            <div className="px-2 w-full">
              <h3 className="font-bold text-xl pb-2 border-b border-black">
                Statistic
              </h3>
              <h5 className="font-bold text-right text-xl">{getDate}</h5>
              <div className="">
                {/* <h4 className="font-bold text-2xl">Expense</h4> */}
                <div className=" flex justify-center h-22">
                  <PieChart width={290} height={330}>
                    <Tooltip />
                    <Legend style={{ width: "363px" }} />
                    <Pie
                      data={data}
                      cx={120}
                      cy={200}
                      innerRadius={65}
                      outerRadius={78}
                      fill="#8884d8"
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
