import Link from "next/link";
import {
  FileText,
  Clock3,
  CircleCheckBig,
  DollarSign,
  Search,
} from "lucide-react";
import { Card, Button } from "@heroui/react";

export default function FreelancerOverview({
  proposals = [],
  payments = [],
}) {
  const recentProposals = [...proposals]
    .sort(
      (a, b) =>
        new Date(b.submitted_at) - new Date(a.submitted_at)
    )
    .slice(0, 4);
  const totalProposals = proposals.length;

  const pendingProposals = proposals.filter(
    (p) => p.status === "pending"
  ).length;

  const acceptedProposals = proposals.filter(
    (p) => p.status === "accepted"
  ).length;

  const totalEarned = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const stats = [
    {
      title: "Total Proposals",
      value: totalProposals,
      description: "Proposals submitted",
      icon: FileText,
    },
    {
      title: "Pending",
      value: pendingProposals,
      description: "Awaiting response",
      icon: Clock3,
    },
    {
      title: "Accepted",
      value: acceptedProposals,
      description: "Accepted proposals",
      icon: CircleCheckBig,
    },
    {
      title: "Total Earned",
      value: `$${totalEarned}`,
      description: "From completed tasks",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Freelancer Dashboard
          </h1>

          <p className="text-default-500 mt-1">
            Track your proposals and earnings
          </p>
        </div>

        <Link href="/public/browsetasks">
          <Button
            className="bg-cyan-500 text-white"
            startContent={<Search size={18} />}
          >
            Browse Tasks
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card
              key={index}
              className="border border-default-200 p-5 shadow-none hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-default-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-cyan-500">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-xs text-default-400">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
                  <Icon size={20} className="text-cyan-500" />
                </div>
              </div>
            </Card>
          );
        })}
        
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Recent Proposals
          </h2>

          <Link
            href="/dashboard/freelancer/myproposal"
            className="text-cyan-500 hover:underline text-sm"
          >
            View All
          </Link>
        </div>

        {recentProposals.length === 0 ? (
          <Card className="p-10 text-center">
            <p className="text-default-500">
              No proposals submitted yet.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {recentProposals.map((proposal) => (
              <Card
                key={proposal._id}
                className="border border-default-200 p-5 shadow-none hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">
                      {proposal.task_title}
                    </h3>

                    <p className="text-sm text-default-500">
                      {proposal.client_email}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${proposal.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : proposal.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {proposal.status}
                  </span>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-green-600 font-semibold">
                    ${proposal.proposed_budget}
                  </span>

                  <span className="text-default-500">
                    {proposal.estimated_days} Days
                  </span>
                </div>

                <div className="mt-4 border-t pt-3 text-xs text-default-400">
                  Submitted{" "}
                  {new Date(
                    proposal.submitted_at
                  ).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}