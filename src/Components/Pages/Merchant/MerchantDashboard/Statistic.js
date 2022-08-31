import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
const data = [
  { name: "From Card", value: 400, color: "#0088FE" },
  { name: "Got Paid", value: 300, color: "#00C49F" },
  { name: "Loan", value: 300, color: "#FFBB28" },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const Statistic = () => {
  return (
    <div className="rounded-lg w-full p-10">
      <div className="flex justify-between items-center w-full">
        <h4 className="text-2xl font-semibold">Statistic</h4>
        <select className=" select select-ghost text-gray-700  ">
          <option selected> Aug, 2022</option>
          <option>Jul, 2022</option>
          <option>Jun, 2022</option>
          <option>May, 2022</option>
        </select>
      </div>

      <div className="flex items-center">
        {/* chart */}
        <div className="w-full lg:w-72 h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx={120}
                cy={140}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* titles */}
        <div>
          <ul>
            {data.map((d, i) => (
              <li key={d.name} className="flex items-center space-x-8 my-4">
                <div
                  style={{ backgroundColor: d.color }}
                  className={`w-3 h-3 rounded-full  `}
                ></div>
                <div>
                  <p className="text-xl font-medium">{d.value / 10}%</p>
                  <small className="text-gray-400">{d.name}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
