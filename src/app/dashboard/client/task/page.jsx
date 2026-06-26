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
import Search from "@/components/Search";

const ClientTasks = async () => {

  const session = await getUserForServer()

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
    <div>
      <Search />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Budget</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Deadline</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Proposals</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-5">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {task.title}
                  </h3>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium${categoryStyles[task.category] || "bg-gray-100 text-gray-700"
                      }`}
                  >
                    <Briefcase size={13} />
                    {task.category}
                  </span>
                </td>

                <td className="px-6 py-5 font-semibold text-green-600">
                  ${task.budget}
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-xs">
                  {new Date(task.deadline).toLocaleDateString("en-CA")}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[task.status] || "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {task.status === "completed" ? (
                      <CircleCheckBig size={13} />
                    ) : (
                      <Clock3 size={13} />
                    )}

                    {task.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1">
                    <FileText size={15} />
                    {task.proposalsCount || 0}
                  </span>
                </td>

                <td className="px-6 py-5 text-center">
                  <Link href={`/dashboard/client/task/${task._id}`}>
                    <button className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600 transition cursor-pointer">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3 mt-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border border-gray-200 rounded-xl p-4"
          >
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {task.title}
            </h3>

            <div className="mt-3 flex items-center justify-between">
              <span
                className={`text-xs rounded-full px-2.5 py-1 ${categoryStyles[task.category] || "bg-gray-100 text-gray-700"
                  }`}
              >
                {task.category}
              </span>

              <span className="font-semibold text-green-600">
                ${task.budget}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>
                {new Date(task.deadline).toLocaleDateString("en-CA")}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 ${statusStyles[task.status] || "bg-gray-100 text-gray-700"
                  }`}
              >
                {task.status}
              </span>
            </div>

            <Link href={`/dashboard/client/task/${task._id}`}>
              <button className="w-full mt-4 rounded-lg bg-cyan-500 py-2 text-sm font-medium text-white hover:bg-cyan-600">
                View
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientTasks;