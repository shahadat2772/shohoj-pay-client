import React, { useEffect, useState } from "react";
import BalanceSection from "./BalanceSection";
import ServicesSection from "./ServicesSection";
import Statistic from "./Statistic";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserEmailInfo } from "../../../../app/slices/userAllEmailInfoSlice";
import auth from "../../../../firebase.init";
import Spinner from "../../../Shared/Spinner/Spinner";

const MerchantDashboard = () => {
  const [user, loading, fError] = useAuthState(auth);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todayDate = new Date().toLocaleDateString();
  // GET DATA USING REDUX
  const { isLoading, allInfo, error } = useSelector(
    (state) => state.userAllEmailData
  );
  const { unseenNotifications } = useSelector((state) => state.allNotification);
  const { userBalance, userTransactionInfo } = allInfo;
  const transactionData = userTransactionInfo;
  useEffect(() => {
    dispatch(fetchUserEmailInfo(user));

  }, [navigate, dispatch, user, unseenNotifications]);
  useEffect(() => {
    if (shareLinkCopied) {
      toast.success("Copied Transaction Information");
    }
  }, [shareLinkCopied]);
  if (isLoading || loading || transactionData == undefined) {
    return <Spinner />;
  }
  // GET LATEST TRANSACTION
  const latestTransaction = [...transactionData]?.splice(
    transactionData.length - 4,
    transactionData.length
  );
  // REVERSE TRANSACTION DATA
  const reverseData = [...latestTransaction].reverse();
  if (error || fError) {
    toast.error(error?.message || fError?.message);
  }
  // COPY TEXT FUNCTION
  const onShare = (data) => {
    navigator.clipboard.writeText(`
    Amount: ${data.amount}$
    Email: ${data.email}
    Name: ${data.userName ? data.userName : data.name}
    TRX ID: ${data.transactionId ? data.transactionId : "Transaction Id Not Available"
      }
    Date: ${data.fullDate}
    Time: ${data.time}
    Type: ${data.type}
    `);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 py-32 lg:px-20 bg-white">
      {/* left part */}
      <div className="lg:col-span-7 grid grid-cols-1 gap-5">
        <BalanceSection balance={userBalance?.balance} />
        <ServicesSection />
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
                {reverseData.slice(0, 4).map((transAction) => (
                  <li
                    className={`flex items-center my-4 p-3 rounded-lg w-full shadow-sm`}
                    key={transAction._id}
                  >
                    <div className="lg:mr-8 w-36">
                      <h5 className="gray text-sm mb-1 md-responsive">
                        {transAction.fullDate === todayDate
                          ? "Today"
                          : transAction.fullDate}
                      </h5>
                      <h6 className="gray text-sm md-responsive">
                        {transAction.time}
                      </h6>
                    </div>
                    <div className="avatar">
                      <div className="w-14 rounded-full md-img-responsive">
                        <img src={transAction?.image} alt="User Image" />
                      </div>
                    </div>
                    <div className="ml-5 flex items-center justify-between w-full">
                      <div>
                        <h5
                          className={` font-medium text-lg mb-[2px] md-type-responsive
                            `}
                        >
                          {transAction.type}
                        </h5>
                        <h5 className="gray text-sm md-responsive">
                          {transAction?.userName
                            ? transAction.userName
                            : transAction.name}
                        </h5>
                        {transAction.transactionId && (
                          <h6 className="gray md-trx-responsive">
                            {transAction.transactionId}
                          </h6>
                        )}
                        {transAction.type === "Save Money" && (
                          <h6 className="gray md-responsive">
                            {transAction.email}
                          </h6>
                        )}
                      </div>
                      <div className="flex align-items-center ">
                        <div className="" onClick={() => onShare(transAction)}>
                          <i className="fa-solid fa-copy cursor-pointer"></i>
                        </div>
                        <div>
                          <h3
                            className={`text-2xl amount-style font-medium  text-right md-amount-responsive ${transAction.type === "Add Money" ||
                              transAction.type === "Receive Money"
                              ? "text-green-600"
                              : "text-red-600"
                              }`}
                          >
                            {transAction.type === "Add Money" ||
                              transAction.type === "Receive Money"
                              ? "+" + transAction.amount
                              : "-" + transAction.amount}
                            $
                          </h3>
                          <h6 className="text-right">
                            <small className="gray text-sm">
                              fee: ${transAction.fee}
                            </small>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="text-center">
                  {transactionData.length >= 1 && (
                    <button
                      onClick={() =>
                        navigate("/merchant/dashboard/allTransaction")
                      }
                      className="btn btn-link mt-5"
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

      {/* right part  */}
      <div className="grid lg:col-span-5 gap-5">
        <Statistic user={user} />
      </div>
    </div>
  );
};

export default MerchantDashboard;
