import { getFeatureTask } from "@/lib/api/tasks";
import Link from "next/link";

const LatestFeaturedTasks = async () => {
  const tasks = await getFeatureTask();
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            Latest Featured Tasks
          </h2>

          <p className="text-gray-500 mt-3">
            Explore the newest opportunities posted by clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tasks?.map((task) => (
            <div
              key={task._id}
              className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-base-100 p-6 shadow-md hover:-translate-y-2 transition-all duration-300"
            >
              {/* Cyan Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600">
                    {task.category}
                  </span>

                  <span className="font-bold text-lg text-green-600">
                    ${task.budget}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-cyan-600 transition">
                  {task.title}
                </h3>

                <p className="text-gray-500 line-clamp-3 mb-5">
                  {task.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <p>
                    <span className="font-semibold">Client:</span>{" "}
                    {task.clientName}
                  </p>

                  <p>
                    <span className="font-semibold">Deadline:</span>{" "}
                    {task.deadline}
                  </p>
                </div>

                <Link
                  href={`/public/browsetasks/${task._id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-600 transition-all duration-300 hover:bg-cyan-500 hover:text-white hover:shadow-md"
                >
                  View Details
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestFeaturedTasks;