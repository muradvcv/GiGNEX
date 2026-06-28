import { getProposalByTask } from "@/lib/api/proposal";
import {
  User,
  Mail,
  DollarSign,
  CalendarDays,
  FileText,
  CheckCircle2,
  XCircle,
  Clock3,
  User2,
} from "lucide-react";

export default async function TasksProposal({ taskId }) {
  const proposals = await getProposalByTask(taskId);

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          Proposals
        </h2>

        <div className="rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-semibold flex gap-2 justify-center items-center">
          <User2 />Total Proposal : <span className="text-xl"> {proposals.length}</span>
        </div>
      </div>

      {proposals.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 py-10 flex flex-col items-center justify-center">
          <FileText size={40} className="text-slate-400 mb-3" />
          <p className="text-slate-500">No proposals yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div
              key={proposal._id}
              className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-5 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              {/* Top */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                    <User size={18} className="text-blue-600" />
                    {proposal.freelancer_name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <Mail size={14} />
                    {proposal.freelancer_email}
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Budget */}
                  <div className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 border border-emerald-100">
                    <DollarSign size={16} />
                    ${proposal.proposed_budget}
                  </div>

                  {/* Days */}
                  <div className="flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 border border-violet-100">
                    <CalendarDays size={16} />
                    {proposal.estimated_days} Days
                  </div>

                  {/* Status */}
                  <div
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold border ${proposal.status === "accepted"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : proposal.status === "rejected"
                          ? "bg-rose-100 text-rose-700 border-rose-200"
                          : "bg-amber-100 text-amber-700 border-amber-200"
                      }`}
                  >
                    {proposal.status === "accepted" ? (
                      <CheckCircle2 size={16} />
                    ) : proposal.status === "rejected" ? (
                      <XCircle size={16} />
                    ) : (
                      <Clock3 size={16} />
                    )}

                    <span className="capitalize">
                      {proposal.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Note */}
              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-blue-600" />
                  <h4 className="font-semibold text-slate-700">
                    Cover Note
                  </h4>
                </div>

                <p className="text-sm leading-7 text-slate-600">
                  {proposal.cover_note}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}