import React from "react";
import {
  CalendarDays,
  CircleDollarSign,
  User,
  Mail,
  Briefcase,
  Clock3,
  FileText,
} from "lucide-react";
import { getUserForServer } from "@/lib/user/getuser";
import Image from "next/image";
import { getBrowseTaskDetails } from "@/lib/api/tasks";
import { ProposalModal } from "@/components/dashboard/freelancer/ProposalModal";

const TasksDetails = async ({ params }) => {
  const { id } = await params;

  const session = await getUserForServer();
  const userRole = session?.user?.role;

  const data = await getBrowseTaskDetails(id);

  // Add null check for data
  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 min-h-screen">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <p className="text-gray-500">Task not found</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 min-h-screen">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* Main Grid: Header + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Title & Category */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-cyan-50 flex-shrink-0">
                <Briefcase size={20} className="text-cyan-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {data?.title || "Untitled Task"}
                </h1>
                <p className="text-sm text-gray-500 capitalize">
                  {data?.category || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Client Card */}
          <div className="flex items-center gap-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4">
            <Image
              width={48}
              height={48}
              src={
                data?.clientPhoto ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={data?.clientName || "Client"}
              className="w-12 h-12 rounded-lg object-cover border border-cyan-200 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {data?.clientName || "Unknown Client"}
              </h3>
              <p className="text-xs text-gray-500">Project Owner</p>
            </div>
          </div>
        </div>

        {/* Quick Stats: 4 Column Compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 hover:border-cyan-200 transition">
            <div className="flex items-center gap-2 mb-1.5">
              <CircleDollarSign size={16} className="text-green-600" />
              <span className="text-xs text-gray-500">Budget</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              ${data?.budget || "0"}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 hover:border-cyan-200 transition">
            <div className="flex items-center gap-2 mb-1.5">
              <CalendarDays size={16} className="text-blue-600" />
              <span className="text-xs text-gray-500">Deadline</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {data?.deadline ? formatDate(data.deadline) : "N/A"}
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 hover:border-cyan-200 transition">
            <div className="flex items-center gap-2 mb-1.5">
              <Clock3 size={16} className="text-orange-600" />
              <span className="text-xs text-gray-500">Status</span>
            </div>
            <span
              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg ${getStatusColor(
                data?.status
              )}`}
            >
              {data?.status || "pending"}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 hover:border-cyan-200 transition">
            <div className="flex items-center gap-2 mb-1.5">
              <User size={16} className="text-purple-600" />
              <span className="text-xs text-gray-500">Proposals</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {data?.proposalsCount || 0}
            </p>
          </div>
        </div>

        {/* Description + Client Info: Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Description: Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-cyan-600" />
              <h2 className="text-sm font-bold text-gray-900">
                Project Description
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-6 line-clamp-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
              {data?.description || "No description provided"}
            </p>
          </div>

          {/* Client Info */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Client Info
            </h2>
            <div className=" rounded-xl border px-4 py-3 bg-gray-50">
              <div className="flex items-start gap-2.5">
                <User size={16} className="text-cyan-600  flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {data?.clientName || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-cyan-600  flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 break-all">
                    {data?.clientEmail || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Compact */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">ID: {data?._id || "N/A"}</p>
          {userRole === "freelancer" && (
            <ProposalModal/>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksDetails;