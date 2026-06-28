"use client";

import { Chip } from "@heroui/react";

const PaymentsTable = ({ payments = [] }) => {
  const safePayments = Array.isArray(payments) ? payments : [];

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="bg-white border rounded-xl p-4 overflow-x-auto">
      <h2 className="text-sm font-semibold mb-4">Payments</h2>

      {/* SIMPLE HTML TABLE (NO ERROR EVER) */}
      <table className="w-full text-sm border-collapse">

        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Client</th>
            <th className="p-2">Freelancer</th>
            <th className="p-2">Task ID</th>
            <th className="p-2">Proposal ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Paid At</th>
          </tr>
        </thead>

        <tbody>
          {safePayments.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No payments found
              </td>
            </tr>
          ) : (
            safePayments.map((p) => (
              <tr key={p._id || p.id} className="border-b hover:bg-gray-50">

                <td className="p-2 text-xs">
                  {p._id?.slice(0, 10) || "-"}
                </td>

                <td className="p-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{p.clientName}</span>
                    <span className="text-xs text-gray-500">
                      {p.clientEmail}
                    </span>
                  </div>
                </td>

                <td className="p-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{p.freelancerName}</span>
                    <span className="text-xs text-gray-500">
                      {p.freelancerEmail}
                    </span>
                  </div>
                </td>

                <td className="p-2 text-xs">
                  {p.taskId?.slice?.(0, 10) || p.taskId || "-"}
                </td>

                <td className="p-2 text-xs">
                  {p.proposalId?.slice?.(0, 10) || p.proposalId || "-"}
                </td>

                <td className="p-2">
                  <Chip color="success" variant="flat">
                    +${p.amount || 0}
                  </Chip>
                </td>

                <td className="p-2 text-xs text-gray-600">
                  {formatDate(p.paidAt)}
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default PaymentsTable;