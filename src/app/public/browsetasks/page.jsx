import Link from "next/link";
import { CalendarDays, CircleDollarSign, Briefcase } from "lucide-react";

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

// SkillSwap ব্র্যান্ডের সাথে ম্যাচিং ক্যাটাগরি স্টাইল
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
            href={`/browse-tasks/${task._id}`}
            className="group block"
          >
            <div className="flex flex-col h-full border border-gray-200/80 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-in-out">

              {/* Status + Category Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusStyles[task.status] || statusStyles.open}`}>
                  {task.status}
                </span>
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${getCategoryStyle(task.category)}`}>
                  {task.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                  {task.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6">
                  {task.description}
                </p>
              </div>

              {/* Footer Meta Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                {/* Budget */}
                <div className="flex items-center gap-1.5 text-gray-900 font-semibold text-sm">
                  <CircleDollarSign size={16} className="text-emerald-500" />
                  <span>${task.budget}</span>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <CalendarDays size={14} />
                  <span>{formatDate(task.deadline)}</span>
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