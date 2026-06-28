import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CircleDollarSign,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { getTaskById } from "@/lib/api/tasks";
import TaskEditModal from "@/components/dashboard/client/TaskEditModal";
import DeleteTaskButton from "@/components/dashboard/client/DeleteTaskButton";
import TaskProposalTow from "@/components/dashboard/client/TaskProposal";

const ClientTaskDetails = async ({ params }) => {
  const { id } = await params;

  const task = await getTaskById(id);

  const statusStyles = {
    open: "bg-green-100 text-green-700",
    in_progress: "bg-amber-100 text-amber-700",
    completed: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link
          href="/dashboard/client/task"
          className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {task.title}
          </h1>

          <p className="text-sm text-gray-500">
            Task ID: {task._id}
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
        {/* Top Info */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span
            className={`px-3 py-1 rounded-full font-medium capitalize ${statusStyles[task.status]
              }`}
          >
            {task.status}
          </span>

          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {task.category}
          </span>

          <span className="flex items-center gap-1 text-gray-600">
            <CircleDollarSign size={15} />
            ${task.budget}
          </span>

          <span className="flex items-center gap-1 text-gray-600">
            <Calendar size={15} />
            {new Date(task.deadline).toLocaleDateString("en-CA")}
          </span>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h2 className="font-semibold text-lg mb-2">
            Description
          </h2>

          <p className="text-gray-600 leading-7">
            {task.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div className="border rounded-2xl p-3">
            <p className="text-xs text-gray-500">Budget</p>
            <h3 className="font-bold text-green-600 text-lg">
              ${task.budget}
            </h3>
          </div>

          <div className="border rounded-2xl p-3">
            <p className="text-xs text-gray-500">Proposals</p>
            <h3 className="font-bold text-lg">
              {task.proposalsCount}
            </h3>
          </div>

          <div className="border rounded-2xl p-3">
            <p className="text-xs text-gray-500">Deadline</p>
            <h3 className="font-semibold text-sm">
              {new Date(task.deadline).toLocaleDateString("en-CA")}
            </h3>
          </div>

          <div className="border rounded-2xl p-3">
            <p className="text-xs text-gray-500">Created At</p>
            <h3 className="font-semibold text-sm">
              {new Date(task.createdAt).toLocaleDateString("en-CA")}
            </h3>
          </div>
        </div>

        {/* Client Info */}
        <div className="mt-5 border rounded-2xl p-4">
          <h3 className="font-semibold mb-3">
            Client Information
          </h3>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {task.clientPhoto ? (
                <Image
                  src={task.clientPhoto}
                  alt={task.clientName}
                  width={40}
                  height={40}
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
              )}
            </div>

            <div>
              <h4 className="font-medium text-gray-900">
                {task.clientName}
              </h4>

              <p className="text-sm text-gray-500">
                {task.clientEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-4 border-t flex flex-wrap gap-3">
          <TaskEditModal task={task} />

          {task.status === "open" &&
            task.proposalsCount === 0 &&
            !task.assignedFreelancerId && (
              <DeleteTaskButton taskId={task._id} />
            )}
        </div>
      </div>
      <TaskProposalTow taskId={id}/>
    </div>
  );
};

export default ClientTaskDetails;