import React from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FeeChart = () => {
  const { isLoading, transactionReports, error } = useSelector(
    (state) => state.transactionReport
  );

  const data = [
    {
      name: "Send Money",
      Fees: Number(transactionReports?.totalSendMoneyFees),
    },
    {
      name: "Request Money",
      Fees: Number(transactionReports?.totalRequestMoneyFees),
    },
    {
      name: "E-Check",
      Fees: Number(transactionReports?.totalECheckFees),
    },
    {
      name: "Merchant Pay",
      Fees: Number(transactionReports?.totalMerchantPayFees),
    },
    {
      name: "M to M",
      Fees: Number(transactionReports?.totalMtoMFees),
    },
    {
      name: "M to P",
      Fees: Number(transactionReports?.totalMtoPFees),
    },
  ];

  return (
    <div className="lg:h-[300px] md:h-[300px] h-[200px] w-full feeChartContainer lg:mb-0 lg:mt-4 mt-10 mb-12 md:mb-12">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Fees"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
      <h2 className="text-center mt-4 gray">Fee generated</h2>
    </div>
  );
};

export default FeeChart;
