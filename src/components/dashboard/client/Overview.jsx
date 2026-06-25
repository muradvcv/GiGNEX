
import Link from "next/link";
import {
  ListCheck,
  Clock3,
  CircleDashed,
  DollarSign,
  ClipboardList,
  Calendar,
  CircleCheckBig,
  ArrowRight,
} from "lucide-react";

import { Card, Button } from "@heroui/react";
import { getTaskByClient } from "@/lib/api/tasks";
import { getUserForServer } from "@/lib/user/getuser";

export default async function Overview() {
  const session = await getUserForServer();

  const clientId = session?.user?.id;

  const tasks = await getTaskByClient(clientId);

  const totalTasks = tasks?.length || 0;

  const openTasks =
    tasks?.filter((task) => task.status === "open").length || 0;

  const inProgressTasks =
    tasks?.filter((task) => task.status === "in-progress").length || 0;

  const completedTasks =
    tasks?.filter((task) => task.status === "completed").length || 0;

  const totalSpent =
    tasks
      ?.filter((task) => task.status === "completed")
      .reduce((sum, task) => sum + Number(task.budget || 0), 0) || 0;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      description: "All tasks created",
      icon: ListCheck,
    },
    {
      title: "Open Tasks",
      value: openTasks,
      description: "Awaiting proposals",
      icon: Clock3,
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      description: "Currently active",
      icon: CircleDashed,
    },
    {
      title: "Completed",
      value: completedTasks,
      description: "Successfully finished",
      icon: CircleCheckBig,
    },
    {
      title: "Total Spent",
      value: `$${totalSpent}`,
      description: "Total money paid",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card
              key={index}
              className="border border-default-200 p-5 shadow-none hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-default-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-cyan-500">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-xs text-default-400">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
                  <Icon
                    size={20}
                    className="text-cyan-500"
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Recent Tasks
          </h2>

          {tasks?.length > 0 && (
            <Link
              href="/dashboard/client/task"
              className="text-cyan-500 text-sm font-medium hover:underline"
            >
              View All
            </Link>
          )}
        </div>

        {!tasks?.length ? (
          <Card className="min-h-[420px] border border-default-200 shadow-none">
            <div className="flex h-[420px] flex-col items-center justify-center px-4 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-default-100">
                <ClipboardList
                  size={38}
                  className="text-default-500"
                />
              </div>

              <h3 className="text-3xl font-bold">
                No tasks yet
              </h3>

              <p className="mt-2 text-default-500">
                Post your first task to find talented freelancers
              </p>
              <Link href="/dashboard/client/task/new">
                <Button className="mt-6 bg-cyan-500 text-white">
                  Post a Task
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {tasks
              .sort(
                (a, b) =>
                  new Date(b.createdAt) -
                  new Date(a.createdAt)
              )
              .slice(0, 4)
              .map((task) => (
                <Link
                  key={task._id}
                  href={`/dashboard/client/task/${task._id}`}
                >
                  <Card className="border border-default-200 p-5 shadow-none hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg line-clamp-1">
                          {task.title}
                        </h3>

                        <p className="mt-1 text-xs text-default-500">
                          {task.category}
                        </p>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium capitalize ${task.status === "open"
                            ? "bg-green-100 text-green-700"
                            : task.status === "in-progress"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-purple-600"
                          }`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-default-500 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 font-semibold text-green-600">
                        <DollarSign size={15} />
                        {task.budget}
                      </div>

                      <div className="flex items-center gap-1 text-default-500">
                        <Calendar size={14} />
                        {new Date(
                          task.deadline
                        ).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <span className="text-xs text-default-400">
                        Created:{" "}
                        {new Date(
                          task.createdAt
                        ).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-1 text-cyan-500 text-sm font-medium">
                        View Details
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}