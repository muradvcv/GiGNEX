import { getProposalByTask } from "@/lib/api/proposal";
import {
  User,
  Mail,
  DollarSign,
  CalendarDays,
  Clock3,
  FileText,
  CheckCircle2,
  XCircle,
  User2,
} from "lucide-react";

export default async function TaskProposalTow({ taskId }) {
  const proposals = await getProposalByTask(taskId);

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Proposals
        </h2>

        <div className="flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          <User2 size={18} />
          Total
          <span className="text-lg font-bold">
            {proposals.length}
          </span>
        </div>
      </div>

      {proposals.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
          <FileText
            size={40}
            className="mx-auto mb-3 text-slate-400"
          />
          <p className="text-slate-500">
            No proposals found.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {proposals.map((proposal) => (
            <div
              key={proposal._id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
            >
              {/* Top Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Name */}
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <User
                    size={16}
                    className="text-indigo-600"
                  />
                  <span>{proposal.freelancer_name}</span>
                </div>

                {/* Right Info */}
                <div className="flex flex-wrap items-center gap-5 text-sm">
                  <div className="flex items-center gap-1 font-medium text-green-600">
                    <DollarSign size={15} />
                    ${proposal.proposed_budget}
                  </div>

                  <div className="flex items-center gap-1 font-medium text-blue-600">
                    <CalendarDays size={15} />
                    {proposal.estimated_days}d
                  </div>

                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock3 size={15} />
                    {new Date(
                      proposal.createdAt
                    ).toLocaleDateString()}
                  </div>

                  <div
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${proposal.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : proposal.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {proposal.status === "accepted" ? (
                      <CheckCircle2 size={14} />
                    ) : proposal.status ===
                      "rejected" ? (
                      <XCircle size={14} />
                    ) : (
                      <Clock3 size={14} />
                    )}

                    <span className="capitalize">
                      {proposal.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Mail
                  size={15}
                  className="text-slate-400"
                />
                <span>{proposal.freelancer_email}</span>
              </div>

              {/* Cover Note */}
              <div className="mt-4 flex gap-2 rounded-lg bg-slate-50 p-3">
                <FileText
                  size={16}
                  className="mt-1 flex-shrink-0 text-indigo-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  {proposal.cover_note}
                </p>
              </div>

              {/* Buttons */}
              {proposal.status === "pending" && (
                <div className="mt-4 flex justify-end gap-3">
                  {/* payment api call */}
                  <form action="/api/subcription" method="POST">
                    <input
                      type="hidden"
                      name="amount"
                      value={proposal.proposed_budget}
                    />

                    <input
                      type="hidden"
                      name="productName"
                      value={`Task Proposal - ${proposal.freelancer_name}`}
                    />

                    <input
                      type="hidden"
                      name="taskId"
                      value={taskId}
                    />

                    {/* Selected Proposal ID */}
                    <input
                      type="hidden"
                      name="proposalId"
                      value={proposal._id}
                    />

                    {/* Freelancer Info */}
                    <input
                      type="hidden"
                      name="freelancerId"
                      value={proposal.freelancer_id}
                    />

                    <input
                      type="hidden"
                      name="freelancerEmail"
                      value={proposal.freelancer_email}
                    />

                    <input
                      type="hidden"
                      name="freelancerName"
                      value={proposal.freelancer_name}
                    />

                    <button
                      type="submit"
                      className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white"
                    >
                      Accept
                    </button>
                  </form>

                  <button className="rounded-lg border border-red-200 bg-red-50 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                    <span className="flex items-center gap-2">
                      <XCircle size={16} />
                      Reject
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}