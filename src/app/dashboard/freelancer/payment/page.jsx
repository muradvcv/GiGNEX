import MonthlyEarningsChart from "@/components/dashboard/freelancer/MonthlyEarningsChart";
import PaymentsTable from "@/components/dashboard/freelancer/PaymentsTable";
import { getPaymentByFreelancer } from "@/lib/actions/payment";
import { getUserForServer } from "@/lib/user/getuser";
import { DollarSign, TrendingUp } from "lucide-react";

const FreelancerPaymentPage = async () => {
  const session = await getUserForServer();

  const freelancerId = session?.user?.id;
  if (!freelancerId) return null;

  const payments = await getPaymentByFreelancer(freelancerId);
  const data = payments?.data || [];

  const totalEarned = data.reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const avgPerTask = data.length ? totalEarned / data.length : 0;

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">Earnings</h1>
        <p className="text-gray-500 text-sm">
          Track your income from completed tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="border rounded-xl p-5 flex justify-between items-center bg-white shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Total Earned</p>
            <h2 className="text-3xl font-bold">
              ${Number(totalEarned || 0).toFixed(0)}
            </h2>
            <p className="text-xs text-gray-400">
              From {data.length} payments
            </p>
          </div>
          <DollarSign className="text-orange-500" />
        </div>

        <div className="border rounded-xl p-5 flex justify-between items-center bg-white shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Average Per Task</p>
            <h2 className="text-3xl font-bold">
              ${Number(avgPerTask || 0).toFixed(0)}
            </h2>
            <p className="text-xs text-gray-400">
              Average earning per task
            </p>
          </div>
          <TrendingUp className="text-orange-500" />
        </div>

      </div>

      <MonthlyEarningsChart payments={data} />
      <PaymentsTable payments={data} />

    </div>
  );
};

export default FreelancerPaymentPage;