import AdminCharts from "@/components/dashboard/admin/AdminCharts";
import { getAllSummary } from "@/lib/actions/admin";
import {
  Users,
  BriefcaseBusiness,
  DollarSign,
  Activity,
} from "lucide-react";

const AdminDashboard = async () => {
  const result = await getAllSummary();
  const summary = result?.data;

  const cards = [
    {
      title: "Total Users",
      value: summary?.totalUsers,
      icon: Users,
      sub: `1 admin, ${summary?.totalFreelancers} freelancers, ${summary?.totalClients} clients`,
    },
    {
      title: "Total Tasks",
      value: summary?.totalTasks,
      icon: BriefcaseBusiness,
      sub: `${summary?.openTasks} active`,
    },
    {
      title: "Total Revenue",
      value: `$${summary?.totalRevenue}`,
      icon: DollarSign,
      sub: `${summary?.totalPayments} payments`,
    },
    {
      title: "Active Tasks",
      value: summary?.inProgressTasks,
      icon: Activity,
      sub: "Currently in progress",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Platform overview and management
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500">{card.title}</p>

                  <h2 className="text-5xl font-bold mt-3">
                    {card.value}
                  </h2>

                  <p className="text-sm text-gray-500 mt-4">
                    {card.sub}
                  </p>
                </div>

                <div className="bg-cyan-50 p-3 rounded-xl">
                  <Icon className="w-7 h-7 text-cyan-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AdminCharts summary={summary} />
    </div>
  );
};

export default AdminDashboard;