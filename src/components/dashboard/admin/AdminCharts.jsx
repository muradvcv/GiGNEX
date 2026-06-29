"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminCharts = ({ summary }) => {
  const roleData = [
    {
      name: "Admin",
      value: 1,
      color: "#F43F5E",
    },
    {
      name: "Client",
      value: summary?.totalClients || 0,
      color: "#3B82F6",
    },
    {
      name: "Freelancer",
      value: summary?.totalFreelancers || 0,
      color: "#10B981",
    },
  ];

  const taskData = [
    {
      name: "Open",
      value: summary?.openTasks || 0,
      fill: "#F59E0B",
    },
    {
      name: "Completed",
      value: summary?.completedTasks || 0,
      fill: "#10B981",
    },
    {
      name: "In Progress",
      value: summary?.inProgressTasks || 0,
      fill: "#3B82F6",
    },
  ];

  return (
    <div>
      <div className="mt-16 mb-10">
        <h2 className="text-2xl font-bold text-slate-800">
          Analytics Overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Visual insights into users and task performance
        </p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* Pie Chart */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">
            Users by Role
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {roleData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">
            Tasks by Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
              >
                {taskData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.fill}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;