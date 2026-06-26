import Link from "next/link";
import {
  CalendarDays,
  CircleDollarSign,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { getBrowseTasks } from "@/lib/api/tasks";
import Search from "@/components/Search";

const formatDate = (date) => {
  if (!date) return "Not Set";

  const d = new Date(date);

  return isNaN(d.getTime())
    ? "Not Set"
    : d.toLocaleDateString("en-GB");
};

const getCategoryStyle = (category) => {
  const styles = {
    "Web Development":
      "bg-blue-50 text-blue-600 border border-blue-100",
    "Graphic Design":
      "bg-purple-50 text-purple-600 border border-purple-100",
    "Digital Marketing":
      "bg-indigo-50 text-indigo-600 border border-indigo-100",
    "Content Writing":
      "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100",
    "Video Editing":
      "bg-rose-50 text-rose-600 border border-rose-100",
    "Data Entry":
      "bg-cyan-50 text-cyan-600 border border-cyan-100",
  };

  return (
    styles[category] ||
    "bg-gray-50 text-gray-600 border border-gray-200"
  );
};

const BrowseTasks = async ({ searchParams }) => {
  // Next.js 15
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const search = params?.search || "";

  const data = await getBrowseTasks(page, search);

  const tasks = data?.tasks || [];
  const totalPages = data?.totalPages || 1;

  const statusStyles = {
    open: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "in-progress":
      "bg-amber-50 text-amber-700 border border-amber-200",
    completed: "bg-gray-100 text-gray-600 border border-gray-200",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Browse Available Tasks
        </h1>

        <p className="mt-2 text-gray-500">
          Find the perfect skill-swapping opportunities and start
          collaborating.
        </p>
      </div>
      <Search />
      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="bg-white rounded-2xl border py-20 text-center">
          <Briefcase
            size={48}
            className="mx-auto text-gray-400 mb-4"
          />

          <h2 className="text-xl font-semibold">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-2">
            Please check back later.
          </p>
        </div>
      )}

      {/* Tasks */}
      {tasks.length > 0 && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Link
                key={task._id}
                href={`/public/browsetasks/${task._id}`}
                className="group"
              >
                <div className="relative h-full overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />

                  <div className="flex flex-wrap gap-2 mb-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusStyles[task.status] ||
                        statusStyles.open
                        }`}
                    >
                      {task.status}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getCategoryStyle(
                        task.category
                      )}`}
                    >
                      {task.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-cyan-600">
                    {task.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                    {task.description}
                  </p>

                  <div className="mt-6 border-t pt-5 flex justify-between items-center">

                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-50 p-2 rounded-xl">
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

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-xs text-gray-400">
                        <CalendarDays size={14} />

                        <span>
                          {formatDate(task.deadline)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-end gap-1 text-cyan-600 opacity-0 group-hover:opacity-100 transition">
                        View

                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-1 transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

            {/* Previous */}
            <Link
              href={`/public/browsetasks?page=${page - 1}&search=${search}`}
            >
              ← Previous
            </Link>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <Link
                  key={pageNumber}
                  href={`/public/browsetasks?page=${pageNumber}&search=${search}`}
                >
                  {pageNumber}
                </Link>
              );
            })}

            {/* Next */}
            <Link
              href={`/public/browsetasks?page=${page + 1}&search=${search}`}
            >
              Next →
            </Link>

          </div>
        </>
      )}
    </div>
  );
};

export default BrowseTasks;