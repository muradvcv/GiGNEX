import { getProposalByTask } from "@/lib/api/proposal";
import {
  User,
  Mail,
  DollarSign,
  CalendarDays,
  FileText,
  BadgeCheck,
} from "lucide-react";

export default async function TasksProposal({ taskId }) {
  const proposals = await getProposalByTask(taskId);

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Proposals
        </h2>

        <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
          {proposals.length} Total
        </span>
      </div>

      {proposals.length === 0 ? (
        <div className="border rounded-xl bg-gray-50 py-8 flex flex-col items-center justify-center">
          <FileText className="text-gray-400 mb-2" size={35} />
          <p className="text-gray-500 text-sm">No proposals yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {proposals.map((proposal) => (
            <div
              key={proposal._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="text-blue-600" size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base text-gray-800">
                      {proposal.freelancer_name}
                    </h3>

                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <Mail size={13} />
                      {proposal.freelancer_email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile | Budget | Days | Status */}
              <div className="grid grid-cols-4 gap-3 border-b pb-3 mb-3">
                {/* Profile */}
                <div className="flex flex-col items-center text-center">
                  <User className="text-blue-600" size={18} />
                  <span className="text-[10px] text-gray-500 mt-1">
                    Profile
                  </span>
                  <span className="text-xs font-semibold truncate w-full">
                    {proposal.freelancer_name}
                  </span>
                </div>

                {/* Budget */}
                <div className="flex flex-col items-center text-center">
                  <DollarSign className="text-green-600" size={18} />
                  <span className="text-[10px] text-gray-500 mt-1">
                    Budget
                  </span>
                  <span className="text-xs font-semibold text-green-700">
                    ${proposal.proposed_budget}
                  </span>
                </div>

                {/* Days */}
                <div className="flex flex-col items-center text-center">
                  <CalendarDays
                    className="text-purple-600"
                    size={18}
                  />
                  <span className="text-[10px] text-gray-500 mt-1">
                    Days
                  </span>
                  <span className="text-xs font-semibold text-purple-700">
                    {proposal.estimated_days}
                  </span>
                </div>

                {/* Status */}
                <div className="flex flex-col items-center text-center">
                  <BadgeCheck
                    size={18}
                    className={
                      proposal.status === "accepted"
                        ? "text-green-600"
                        : proposal.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }
                  />

                  <span className="text-[10px] text-gray-500 mt-1">
                    Status
                  </span>

                  <span
                    className={`text-xs font-semibold capitalize ${proposal.status === "accepted"
                        ? "text-green-600"
                        : proposal.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                  >
                    {proposal.status}
                  </span>
                </div>
              </div>

              {/* Cover Note */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FileText
                    className="text-indigo-600"
                    size={16}
                  />
                  <h4 className="text-sm font-semibold text-gray-700">
                    Cover Note
                  </h4>
                </div>

                <p className="text-sm text-gray-600">
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