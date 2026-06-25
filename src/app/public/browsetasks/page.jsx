import Link from "next/link";
import { CalendarDays, CircleDollarSign, Briefcase, ArrowRight } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getTasks() {
  try {
    const res = await fetch(`${baseUrl}/api/tasks`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const formatDate = (date) => {
  if (!date) return "Not Set";
  const d = new Date(date);
  return isNaN(d.getTime()) ? "Not Set" : d.toLocaleDateString("en-GB");
};


const getCategoryStyle = (category) => {
  const styles = {
    "Web Development": "bg-blue-50 text-blue-600 border border-blue-100",
    "Graphic Design": "bg-purple-50 text-purple-600 border border-purple-100",
    "Digital Marketing": "bg-indigo-50 text-indigo-600 border border-indigo-100",
    "Content Writing": "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100",
    "Video Editing": "bg-rose-50 text-rose-600 border border-rose-100",
    "Data Entry": "bg-cyan-50 text-cyan-600 border border-cyan-100",
  };
  return styles[category] || "bg-gray-50 text-gray-600 border border-gray-200";
};

const BrowseTasks = async () => {
  const tasks = await getTasks();

  const statusStyles = {
    open: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "in-progress": "bg-amber-50 text-amber-700 border border-amber-200",
    completed: "bg-gray-100 text-gray-600 border border-gray-200",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Browse Available Tasks
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Find the perfect skill-swapping opportunities and start collaborating.
          </p>
        </div>
      </div>

      {/* Empty State */}
      {(!tasks || tasks.length === 0) && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
          <p className="text-sm text-gray-500 mt-1">Check back later for new opportunities.</p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks?.map((task) => (
          <Link
            key={task._id}
            href={`/public/browsetasks/${task._id}`}
            className="group"
          >
            <div className="relative overflow-hidden h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

              {/* Gradient Top Bar */}
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-200 via-fuchsia-200" />

              {/* Status + Category */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${statusStyles[task.status] || statusStyles.open
                    }`}
                >
                  {task.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-medium ${getCategoryStyle(task.category)
                    }`}
                >
                  {task.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-violet-600 transition-colors">
                  {task.title}
                </h2>

                <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {task.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">

                {/* Budget */}
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50">
                    <CircleDollarSign
                      size={18}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Budget
                    </p>
                    <p className="font-bold text-emerald-600">
                      ${task.budget}
                    </p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-gray-400 text-xs">
                    <CalendarDays size={14} />
                    <span>Post Date : {formatDate(task.deadline)}</span>
                  </div>

                  <div className="flex items-center justify-end gap-1 mt-2 text-violet-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all">
                    View
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseTasks;