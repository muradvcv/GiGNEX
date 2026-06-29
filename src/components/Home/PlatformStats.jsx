import {
  Users,
  ClipboardList,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { getAllSummary } from "@/lib/actions/admin";

const PlatformStats = async () => {
  const result = await getAllSummary();
  const summary = result?.data;

  const cards = [
    {
      id: 1,
      title: `${summary?.totalClients ?? 0}+`,
      subtitle: "Total Clients",
      icon: Users,
      bg: "from-violet-100 to-violet-50",
      color: "text-violet-600",
    },
    {
      id: 2,
      title: `${summary?.totalTasks ?? 0}+`,
      subtitle: "Total Tasks Posted",
      icon: ClipboardList,
      bg: "from-blue-100 to-blue-50",
      color: "text-blue-600",
    },
    {
      id: 3,
      title: `$${summary?.totalRevenue ?? 0}+`,
      subtitle: "Total Revenue",
      icon: DollarSign,
      bg: "from-green-100 to-green-50",
      color: "text-green-600",
    },
    {
      id: 4,
      title: `${summary?.totalPayments ?? 0}+`,
      subtitle: "Total Payments",
      icon: CreditCard,
      bg: "from-orange-100 to-orange-50",
      color: "text-orange-600",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Platform Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="border border-default-200 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-default-900">
                      {item.title}
                    </h3>

                    <p className="text-default-500 text-sm mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;