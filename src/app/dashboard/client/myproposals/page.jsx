import { getProposalByClient } from "@/lib/api/proposal";
import { getUserForServer } from "@/lib/user/getuser";

import {
  Avatar,
  Button,
  Chip,
} from "@heroui/react";

import {
  DollarSign,
  CalendarDays,
  FileText,
  X,
  Check,
} from "lucide-react";
import Image from "next/image";

export default async function ClientProposalPage() {
  const session = await getUserForServer();
  const proposals = await getProposalByClient(session.user.email);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-[#7701d2] rounded-2xl p-6 mb-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Proposal Requests</h1>

        <p className="text-cyan-100 mt-1">
          Review freelancer proposals for your tasks.
        </p>
      </div>

      {/* ================= Desktop Table ================= */}

      <div className="hidden md:block overflow-hidden rounded-2xl border bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Freelancer</th>

                <th className="px-6 py-4 text-left">Task</th>

                <th className="px-6 py-4 text-left">Budget</th>

                <th className="px-6 py-4 text-left">Delivery</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-center">Check</th>
              </tr>
            </thead>

            <tbody>
              {proposals.map((proposal) => (
                <tr
                  key={proposal._id}
                  className="border-t hover:bg-cyan-50 transition"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={proposal.freelancer_image}
                        alt="Freelancer"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                      />

                      <div>
                        <h2 className="font-semibold">
                          {proposal.freelancer_name}
                        </h2>

                        <p className="text-sm text-gray-500">
                          {proposal.freelancer_email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6">
                    <div className="flex items-center gap-2">
                      <FileText
                        size={18}
                        className="text-cyan-600"
                      />

                      {proposal.task_title}
                    </div>
                  </td>

                  <td className="px-6">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <DollarSign size={18} />

                      ${proposal.proposed_budget}
                    </div>
                  </td>

                  <td className="px-6">
                    <div className="flex items-center gap-2 text-orange-500">
                      <CalendarDays size={18} />

                      {proposal.estimated_days} Days
                    </div>
                  </td>

                  <td className="px-6">
                    <Chip
                      color={
                        proposal.status === "accepted"
                          ? "success"
                          : proposal.status === "rejected"
                          ? "danger"
                          : "warning"
                      }
                      variant="flat"
                    >
                      {proposal.status}
                    </Chip>
                  </td>

                  <td className="px-6 text-center">
                    <div className="mt-6">
                      <Button
                        radius="md"
                        variant="bordered"
                        className="w-full h-11 rounded-md border border-cyan-500 bg-cyan-50 text-cyan-600 font-semibold hover:bg-cyan-100 hover:border-cyan-600 transition-all duration-300"
                        startContent={<Check size={18} />}
                      >
                        Review Proposal
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Mobile Card ================= */}

      <div className="md:hidden space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal._id}
            className="bg-white rounded-2xl border shadow p-5"
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={proposal.freelancer_image}
                size="lg"
              />

              <div>
                <h2 className="font-bold">
                  {proposal.freelancer_name}
                </h2>

                <p className="text-xs text-gray-500">
                  {proposal.freelancer_email}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Task</span>

                <span className="font-medium text-right">
                  {proposal.task_title}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Budget</span>

                <span className="font-semibold text-green-600">
                  ${proposal.proposed_budget}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>

                <span>{proposal.estimated_days} Days</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>

                <Chip
                  size="sm"
                  color={
                    proposal.status === "accepted"
                      ? "success"
                      : proposal.status === "rejected"
                      ? "danger"
                      : "warning"
                  }
                  variant="flat"
                >
                  {proposal.status}
                </Chip>
              </div>
            </div>
            <div className="mt-6">
              <Button
                radius="md"
                className="w-full h-11 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold shadow-md hover:from-cyan-600 hover:to-sky-700 hover:shadow-xl transition-all duration-300"
                startContent={<Check size={18} />}
              >
                Review Proposal
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}

      {proposals.length === 0 && (
        <div className="text-center py-20">
          <FileText
            className="mx-auto text-gray-300"
            size={60}
          />

          <h2 className="mt-4 text-xl font-semibold">
            No Proposals Found
          </h2>

          <p className="text-gray-500 mt-2">
            Freelancers have not submitted any proposals yet.
          </p>
        </div>
      )}
    </section>
  );
}