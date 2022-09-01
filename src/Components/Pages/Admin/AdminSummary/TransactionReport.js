import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionReport } from "../../../../app/slices/transactionReportSlice";

const TransactionReport = () => {
  const dispatch = useDispatch();
  const { isLoading, transactionReports, error } = useSelector(
    (state) => state.transactionReport
  );

  const [monthToFilter, setMonthToFilter] = useState("all");
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    dispatch(fetchTransactionReport(monthToFilter));
  }, [monthToFilter]);

  // Setting available months
  useEffect(() => {
    if (!isLoading) {
      if (
        JSON.stringify(availableMonths) !==
        JSON.stringify(transactionReports?.availableMonths)
      ) {
        setAvailableMonths(transactionReports?.availableMonths);
      }
    }
  }, [isLoading]);

  // SERVICE ALL DATA
  const transactionData = [
    {
      id: 1,
      name: "Add Money",
      icon: "fa-credit-card",
      amount: transactionReports?.totalAddMoney,
      transactionCount: transactionReports?.addMoneyTransactionCount,
    },
    {
      id: 2,
      name: "Send Money",
      icon: "fa-paper-plane",
      amount: transactionReports?.totalSendMoney,
      transactionCount: transactionReports?.sendMoneyTransactionCount,
    },
    {
      id: 3,
      name: "Receive Money",
      icon: "fa-circle-dollar-to-slot",
      amount: transactionReports?.totalReceiveMoney,
      transactionCount: transactionReports?.receiveMoneyTransactionCount,
    },
    {
      id: 4,
      name: "Save Money",
      icon: "fa-circle-dollar-to-slot",
      amount: transactionReports?.totalSaveMoney,
      transactionCount: transactionReports?.saveMoneyTransactionCount,
    },
    {
      id: 5,
      name: "Request Money",
      icon: "fa-circle-dollar-to-slot",
      amount: transactionReports?.totalRequestMoney,
      transactionCount: transactionReports?.requestMoneyTransactionCount,
    },
    {
      id: 6,
      name: "Merchant Pay",
      icon: "fa-money-bill-trend-up",
      amount: transactionReports?.totalMerchantPay,
      transactionCount: transactionReports?.merchantPayTransactionCount,
    },
    {
      id: 7,
      name: "E-Check",
      icon: "fa-money-check-dollar",
      amount: transactionReports?.totalECheck,
      transactionCount: transactionReports?.eCheckTransactionCount,
    },
    {
      id: 8,
      name: "M to M",
      icon: "fa-money-check-dollar",
      amount: transactionReports?.totalMtoM,
      transactionCount: transactionReports?.mtoMTransactionCount,
    },
    {
      id: 9,
      name: "M to P",
      icon: "fa-money-check-dollar",
      amount: transactionReports?.totalMtoP,
      transactionCount: transactionReports?.mtoPTransactionCount,
    },
    {
      id: 10,
      name: "Transfer Savings",
      icon: "fa-arrow-down",
      amount: transactionReports?.totalTransferSavings,
      transactionCount: transactionReports?.transferSavingsTransactionCount,
    },
  ];

  return (
    <div className="px-2">
      <div className="flex justify-between items-center w-full">
        <h4 className="text-xl ml-2">Transactions</h4>
        <select
          onChange={(e) => setMonthToFilter(e.target.value)}
          className=" select select-ghost text-gray-700 font-normal"
        >
          <option selected value={"all"}>
            Select Month
          </option>
          {availableMonths?.map((month) => (
            <option value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div className="max-h-[80vh] overflow-y-auto">
        {transactionData?.map((service) => (
          <div className="flex items-center justify-between shadow-sm bg-base-100 p-5 rounded mt-4">
            <div className="flex items-center">
              <div className="bg-blue-100 h-8 w-8 flex justify-center items-center rounded">
                <i
                  class={`fa-solid text-secondary text-xl ${service?.icon}`}
                ></i>
              </div>
              <div>
                <h5 className="text-xl ml-3">{service?.name}</h5>
                <h5 className="text-xs ml-3">
                  {service?.transactionCount} transactions
                </h5>{" "}
              </div>
            </div>
            {!isLoading ? (
              <h3 className="text-xl">${service?.amount}</h3>
            ) : (
              <h3 className="text-xm">Loading..</h3>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionReport;
