"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getProposalByFreelancer } from "@/lib/api/proposal";

/* ================= STATUS COLORS ================= */
const getTaskStatusColor = (status) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-700";
    case "closed":
      return "bg-red-100 text-red-700";
    case "in-progress":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getProposalStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "accepted":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function FreelancerProposals() {
  const { data: session, isPending } = useSession();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProposals = async () => {
      try {
        if (!session?.user?.email) return;

        setLoading(true);

        const data = await getProposalByFreelancer(
          session.user.email
        );

        setProposals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err.message);
        setProposals([]);
      } finally {
        setLoading(false);
      }
    };

    loadProposals();
  }, [session]);

  if (isPending || loading) {
    return (
      <p className="p-5 text-gray-500">Loading proposals...</p>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">My Proposals</h1>

      {proposals.length === 0 ? (
        <p className="text-gray-500">No proposals found</p>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto rounded-xl border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Task</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Days</th>
                  <th className="p-3">Task Status</th>
                  <th className="p-3">Proposal Status</th>
                  <th className="p-3">Submitted</th>
                </tr>
              </thead>

              <tbody>
                {proposals.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">
                      {p.task_title}
                    </td>

                    <td className="p-3">{p.client_email}</td>

                    <td className="p-3 text-green-600 font-semibold">
                      ${p.proposed_budget}
                    </td>

                    <td className="p-3">
                      {p.estimated_days}
                    </td>

                    {/* TASK STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(
                          p.taskStatus
                        )}`}
                      >
                        {p.taskStatus || "unknown"}
                      </span>
                    </td>

                    {/* PROPOSAL STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getProposalStatusColor(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="p-3 text-gray-500">
                      {p.submitted_at
                        ? new Date(
                          p.submitted_at
                        ).toLocaleDateString()
                        : "N/A"}
                    </td>

                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="grid gap-4 md:hidden">
            {proposals.map((p) => (
              <div
                key={p._id}
                className="border rounded-xl p-4 shadow-sm bg-white"
              >
                <p className="font-bold text-lg mb-2">
                  {p.task_title}
                </p>

                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold">
                      Client:
                    </span>{" "}
                    {p.client_email}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Budget:
                    </span>{" "}
                    <span className="text-green-600">
                      ${p.proposed_budget}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">
                      Days:
                    </span>{" "}
                    {p.estimated_days}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Task Status:
                    </span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getTaskStatusColor(
                        p.taskStatus
                      )}`}
                    >
                      {p.taskStatus || "unknown"}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">
                      Proposal Status:
                    </span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getProposalStatusColor(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </p>

                  <p className="text-gray-500 text-xs mt-2">
                    Submitted:{" "}
                    {p.submitted_at
                      ? new Date(
                        p.submitted_at
                      ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}