import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Dashboard.css";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import toast from "react-hot-toast";
// USER TRANSACTION FAKE DATA
const fakeTransaction = [
  {
    _id: 1,
    date: "8/3/2022",
    time: "11:40 PM",
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    actionType: "Send Money",
    money: 465,
  },
  {
    _id: 2,
    date: "7/3/2022",
    time: "10:40 PM",
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    actionType: "Add Money",
    money: 345,
  },
  {
    _id: 3,
    time: "12:40 PM",
    date: "6/3/2022",
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    actionType: "Send Money",
    money: 545,
  },
  {
    _id: 4,
    date: "7/3/2022",
    time: "12:40 PM",
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    name: "User Name",
    actionType: "Add Money",
    money: 235,
  },
];
const COLORS = ["#000", "#414CDA", "#23E792", "#FF8042"];
// FAKE SAVINGS DATA
const monthSavings = [
  {
    _id: 1,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    month: "January",
    year: "2022",
    money: 713,
  },
  {
    _id: 2,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    month: "April",
    year: "2022",
    money: 45136,
  },
  {
    _id: 3,
    img: "https://thumbs.dreamstime.com/z/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
    month: "July",
    year: "2022",
    money: 4548,
  },
];
// FAKE DATA

const data = [
  { name: "January", value: 7541, email: "ahsdf@gmail.com" },
  { name: "April", value: 6574, email: "ahsdf@gmail.com" },
  { name: "July", value: 5465, email: "ahsdf@gmail.com" },
];
// FIND TODAY DATE MONTH YEAR
let dateObj = new Date();
let shortMonth = dateObj.toLocaleString("default", { month: "long" });
let getDate =
  dateObj.getUTCDate() + " " + shortMonth + "," + dateObj.getUTCFullYear();

// WELCOME DASHBOARD SECTION
const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const todayDate = new Date().toLocaleDateString();
  console.log(typeof date);
  console.log(balance);
  const [user] = useAuthState(auth);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUserBalances/${user.email}`)
      .then((res) => setBalance(res.data));
    if (shareLinkCopied) {
      toast.success("Copied Transaction Information");
    }
  }, [user.email, shareLinkCopied]);
  // COPY TEXT FUNCTION
  const onShare = (data) => {
    navigator.clipboard.writeText(`
    Date: ${data.date}
    Name:${data.name}
    Type: ${data.actionType}
    Amount: ${data.money}$
    `);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto lg:mt-28 lg:px-10 py-10">
      {/* START USER INFORMATION AND TRANSACTION */}
      <div className="lg:flex">
        {/* CARD DIVIDER HORIZONTAL */}

        <div className="w-full mt-10 lg:mt-0">
          <div class="md:mx-10 lg:mx-0 card lg:w-96 rounded ">
            <div class="card-body py-0">
              <h1 className="text-left text-3xl font-bold mb-3">
                Hi, {user?.displayName}
              </h1>
              <div class="text-left">
                <h4 className="">Total Balance</h4>
                <h1 className="text-4xl font-bold">$ 245</h1>
              </div>
            </div>
          </div>
          {/* START SAVINGS MONTH */}
          <div className="mt-10">
            <div className=" px-2">
              <h3 className="font-bold text-xl border-b-4 border-black pb-2 w-48">
                Last Transaction
              </h3>

              <div className="mt-8">
                <ul>
                  {fakeTransaction.slice(0, 4).map((transAction) => (
                    <li
                      className={`flex items-center my-4 p-3 rounded-lg shadow-lg w-full ${
                        transAction.actionType === "Add Money"
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
                      <div class="avatar">
                        <div class="w-16 rounded-full ">
                          <img src={transAction.img} alt="User Image" />
                        </div>
                      </div>
                      <div className="ml-5 flex items-center justify-between w-full">
                        <div>
                          <h5
                            className={`font-bold text-lg ${
                              transAction.actionType === "Add Money"
                                ? "text-green-800"
                                : "text-red-800"
                            }`}
                          >
                            {transAction.actionType}
                          </h5>
                          <h5 className="">{transAction.name}</h5>
                        </div>
                        <div className="" onClick={() => onShare(transAction)}>
                          <i class="fa-solid fa-copy cursor-pointer"></i>
                        </div>
                        <div>
                          <h3
                            className={`text-lg font-bold text-right ${
                              transAction.actionType === "Add Money"
                                ? "text-green-800"
                                : "text-red-800"
                            }`}
                          >
                            {transAction.actionType === "Add Money"
                              ? "+" + transAction.money
                              : "-" + transAction.money}{" "}
                            $
                          </h3>
                          <h6 style={{ fontSize: "14px" }}>
                            TRX: lakshdfaoeeryhalkha45
                          </h6>
                        </div>
                      </div>
                    </li>
                  ))}
                  <div className="text-center">
                    <button className="btn btn-primary btn-sm mt-5 p-2">
                      View All Transaction
                    </button>
                  </div>
                </ul>
              </div>
            </div>
            {/* START STATISTIC */}
          </div>
        </div>
        <div class="divider divider-horizontal divide-black px-9 divider-hidden"></div>

        <div>
          <div className="">
            <div className="px-2 w-full">
              <h3 class="font-bold text-xl pb-2 border-b border-black">
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
          <div class="md:mx-10 lg:mx-0 card lg:w-96 shadow-xl bg-primary text-white py-5 rounded card-1-bg">
            <div class="card-body">
              <h1 className="text-left text-4xl font-bold">
                {user?.displayName}
              </h1>
              <h5 class="text-left">{user?.email}</h5>

              <div class="text-left">
                <h4 className="font-bold">Total Balance</h4>
                <h1 className="text-3xl">${balance?.balance}</h1>
              </div>
            </div>
          </div>
          {/* START RESECT TRANSACTION  */}
          <div className="mt-10 text-left md:mx-10 mx-5 lg:mx-0">
            <h3 className="font-bold text-xl border-b border-black pb-1">
              Recent Transaction
            </h3>
            <div className="mt-8">
              <ul>
                {fakeTransaction.slice(0, 4).map((transAction) => (
                  <li
                    className="flex items-center my-4 p-3 rounded-lg shadow-lg"
                    key={transAction._id}
                  >
                    <div class="avatar">
                      <div class="w-16 rounded-full ">
                        <img src={transAction.img} alt="User Image" />
                      </div>
                    </div>
                    <div className="ml-5 flex items-center justify-between w-full">
                      <div>
                        <h3 className="font-bold text-lg">
                          {transAction.name}
                        </h3>
                        <h5>{transAction.location}</h5>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">
                          ${transAction.money}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="text-center">
                  <button className="btn btn-primary btn-sm mt-5 p-2">
                    View All Transaction
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
