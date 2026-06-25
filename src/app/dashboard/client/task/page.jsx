import Link from "next/link";
import { getTaskByClient } from "@/lib/api/tasks";
import {
  Calendar,
  CircleDollarSign,
  Briefcase,
  CircleCheckBig,
  Clock3,
  FileText,
} from "lucide-react";
import { getUserForServer } from "@/lib/user/getuser";

const ClientTasks = async () => {
  
  const session=await getUserForServer()

  const clientId = session?.user?.id;
  const tasks = await getTaskByClient(clientId);

  const statusStyles = {
    open: "bg-green-100 text-green-700",
    "in-progress": "bg-amber-100 text-amber-700",
    completed: "bg-gray-200 text-gray-700",
  };

  const categoryStyles = {
    development: "bg-blue-100 text-blue-700",
    design: "bg-purple-100 text-purple-700",
    marketing: "bg-orange-100 text-orange-700",

    "Web Development": "bg-blue-100 text-blue-700",
    "Graphic Design": "bg-purple-100 text-purple-700",
    Marketing: "bg-orange-100 text-orange-700",
  };

  if (!tasks?.length) {
    return (
      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-cyan-100">
            <Briefcase className="w-8 h-8 text-cyan-600" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-2">
            You haven not posted any tasks yet. Create your first task and start
            receiving proposals from freelancers.
          </p>

          <Link href="/dashboard/client/task/new">
            <button className="w-full mt-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition">
              Post a Task
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 px-10">
      {tasks.map((task) => (
        <Link
          key={task._id}
          href={`/dashboard/client/task/${task._id}`}
          className="block"
        >
          <div className="bg-white rounded-[24px] border border-gray-200 p-10 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
            {/* Top */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium capitalize ${statusStyles[task.status] || "bg-gray-100 text-gray-700"
                  }`}
              >
                {task.status === "completed" ? (
                  <CircleCheckBig size={12} />
                ) : (
                  <Clock3 size={12} />
                )}
                {task.status}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-cyan-100 text-cyan-700">
                <FileText size={12} />
                {task.proposalsCount || 0} Proposals
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-xl font-bold text-gray-900 line-clamp-2">
              {task.title}
            </h2>

            {/* Category */}
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${categoryStyles[task.category] ||
                  "bg-gray-100 text-gray-700"
                  }`}
              >
                <Briefcase size={12} />
                {task.category}
              </span>
            </div>

            {/* Description */}
            <p className=" text-sm text-gray-600 line-clamp-2 py-2">
              {task.description}
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Budget */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CircleDollarSign size={16} />
                <span>Budget</span>
              </div>

              <span className="font-bold text-green-600">
                ${task.budget}
              </span>
            </div>

            {/* Deadline */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} />
                <span>Deadline</span>
              </div>

              <span className="font-semibold text-sm text-gray-900">
                {new Date(task.deadline).toLocaleDateString("en-CA")}
              </span>
            </div>

            {/* Button */}
            <button
              type="button"
              className="w-full mt-2 py-2 rounded-full border border-gray-200 bg-white font-medium hover:bg-gray-50 transition cursor-pointer text-xs"
            >
              View Details
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ClientTasks;