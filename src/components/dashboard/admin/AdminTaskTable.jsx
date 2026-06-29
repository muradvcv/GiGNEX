"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteTaskByAdmin } from "@/lib/actions/admin";

export default function AdminTaskTable({ tasks = [] }) {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id) => {
    startTransition(async () => {
      const res = await deleteTaskByAdmin(id);

      if (res?.success) {
        router.refresh();
      }
    });
  };

  const categories = [...new Set(tasks.map((task) => task.category))];

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      category === "all" || task.category === category;

    const statusMatch =
      status === "all" || task.status === status;

    return categoryMatch && statusMatch;
  });

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "in progress":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "";

    return status
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <p className="text-sm text-gray-500">
          {filteredTasks.length} total tasks
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="completed">Completed</option>
          <option value="in progress">In Progress</option>
        </select>
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-600">
            <tr>
              <th className="px-3 py-3 text-left">Title</th>
              <th className="px-3 py-3 text-left">Category</th>
              <th className="px-3 py-3 text-left">Client</th>
              <th className="px-3 py-3 text-left">Budget</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-center">Proposals</th>
              <th className="px-3 py-3 text-left">Created</th>
              <th className="px-3 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-3 py-3 font-medium">{task.title}</td>

                <td className="px-3 py-3">
                  <span className="bg-gray-100 rounded-full px-2 py-1 text-xs capitalize">
                    {task.category}
                  </span>
                </td>

                <td className="px-3 py-3 text-gray-500">
                  {task.clientEmail}
                </td>

                <td className="px-3 py-3 font-medium">
                  ${task.budget}
                </td>

                <td className="px-3 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(
                      task.status
                    )}`}
                  >
                    {formatStatus(task.status)}
                  </span>
                </td>

                <td className="px-3 py-3 text-center">
                  {task.proposalsCount}
                </td>

                <td className="px-3 py-3 text-gray-500">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>

                <td className="px-3 py-3 text-center">
                  <button
                    onClick={() => handleDelete(task._id)}
                    disabled={isPending}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CARDS (MOBILE) ================= */}
      <div className="md:hidden space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-start">
              <h2 className="font-semibold text-base">{task.title}</h2>

              <button
                onClick={() => handleDelete(task._id)}
                disabled={isPending}
                className="text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              {task.clientEmail}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-gray-100 px-2 py-1 text-xs rounded-full capitalize">
                {task.category}
              </span>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(
                  task.status
                )}`}
              >
                {formatStatus(task.status)}
              </span>
            </div>

            <div className="mt-3 text-sm text-gray-700 flex justify-between">
              <span>💰 ${task.budget}</span>
              <span>📄 {task.proposalsCount} proposals</span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
}