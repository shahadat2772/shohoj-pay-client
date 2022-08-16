import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Spinner from "../../Shared/Spinner/Spinner";

const AllTransaction = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const todayDate = new Date().toLocaleDateString();
  console.log(transactionData);
  useEffect(() => {
    axios
      .get(
        `https://shohoj-pay-server.herokuapp.com/transactionStatus/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => setTransactionData(res.data))
      .catch((error) => {
        localStorage.removeItem("accessToken");
        signOut(auth);
        toast.error(error?.message);
        navigate("/");
      });
    if (shareLinkCopied) {
      toast.success("Copied Transaction Information");
    }
  }, [user.email, shareLinkCopied, navigate]);
  if (transactionData.length === 0) {
    return <Spinner />;
  }
  //   COPY TRANSACTION DATA FUNCTION
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
  return (
    <div className="container mx-auto lg:mt-24 lg:px-10 py-10 mt-10">
      <div className=" px-2 lg:w-8/12 mx-auto">
        <h3
          className="font-bold text-xl border-b-4 border-black pb-2 w-48"
        >
          All Transaction
        </h3>
        <div className="mt-8">
          <ul>
            {transactionData.map((transAction) => (
              <li
                className={`flex items-center my-4 p-3 rounded-lg w-full shadow`}
                key={transAction._id}
              >
                <div className="lg:mr-8 w-36">
                  <h5 className="gray">
                    {transAction.fullDate === todayDate
                      ? "Today"
                      : transAction.fullDate}
                  </h5>
                  <h6 className="gray">{transAction.time}</h6>
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
                    <h5 className="gray">{transAction?.userName}</h5>
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
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AllTransaction;
