import React from "react";
import FeeChart from "./FeeChart";
import RevenueCard from "./RevenueCard";
import TransactionReport from "./TransactionReport";

const AdminSummary = () => {
  return (
    <div className="grid grid-cols-12 pt-4 justify-center">
      <div className="lg:col-span-7 md:col-span-12 col-span-12">
        <div className="">
          <RevenueCard />
          <FeeChart />
        </div>
      </div>
      <div className="lg:col-span-5 w-[95%] md:w-[85%] lg:w-[85%] mx-auto md:col-span-12 lg:mt-3 md:mt-16 mt-16 col-span-12">
        <TransactionReport />
      </div>
    </div>
  );
};

export default AdminSummary;
