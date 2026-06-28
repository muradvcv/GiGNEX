"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlyEarningsChart = ({ payments = [] }) => {
  const data = Array.isArray(payments) ? payments : [];

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const total = data
      .filter((p) => {
        const date = new Date(p.paidAt); // FIXED HERE
        return !isNaN(date) && date.getMonth() === i;
      })
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    return {
      month: new Date(2024, i).toLocaleString("default", {
        month: "short",
      }),
      earnings: total,
    };
  });

  return (
    <div className="bg-white border rounded-xl p-5 w-full h-[350px]">
      <h2 className="text-sm font-semibold mb-4">Monthly Earnings</h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="earnings" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyEarningsChart;