
"use client";

import { useMemo, useState } from "react";
import { Button, Card, Chip } from "@heroui/react";
import {
  Calendar,
  DollarSign,
  User,
  Mail,
  Send,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const ActiveProjectsList = ({ projects = [] }) => {
  const [tab, setTab] = useState("in_progress");

  const inProgress = useMemo(
    () => projects.filter((p) => p.status === "in_progress"),
    [projects]
  );

  const completed = useMemo(
    () => projects.filter((p) => p.status === "completed"),
    [projects]
  );

  const data = tab === "in_progress" ? inProgress : completed;

  return (
    <div className="space-y-6">

      {/* Toggle */}
      <div className="flex justify-center">
        <div className="flex rounded-xl border bg-white p-1 shadow-sm">

          <button
            onClick={() => setTab("in_progress")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${tab === "in_progress"
                ? "bg-cyan-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <div className="flex items-center gap-2">
              <Clock3 size={16} />
              In Progress (
              {projects.filter((p) => p.status === "in_progress").length})
            </div>
          </button>

          <button
            onClick={() => setTab("completed")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${tab === "completed"
                ? "bg-emerald-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              Completed (
              {projects.filter((p) => p.status === "completed").length})
            </div>
          </button>

        </div>
      </div>
      {/* Empty */}
      {data.length === 0 ? (
        <Card className="rounded-xl border p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">
            No {tab === "in_progress" ? "In Progress" : "Completed"} Projects
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Assigned projects will appear here.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">

          {data.map((project) => (
            <Card
              key={project._id}
              className="border rounded-xl shadow-sm hover:shadow-md transition-all p-5"
            >
              {/* Top */}
              <div className="flex justify-between items-start gap-4">

                <h2 className="text-lg font-semibold text-gray-800">
                  {project.title}
                </h2>

                <Chip
                  size="sm"
                  variant="flat"
                  className={
                    project.status === "completed"
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "bg-cyan-100 text-cyan-700 font-medium"
                  }
                >
                  {project.status === "completed"
                    ? "Completed"
                    : "In Progress"}
                </Chip>

              </div>

              {/* Category Budget Deadline */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-sm text-gray-600">

                <span>{project.category}</span>

                <span>•</span>

                <span className="flex items-center gap-1">
                  <DollarSign size={14} />
                  ${project.budget}
                </span>

                <span>•</span>

                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {project.deadline}
                </span>

              </div>

              {/* Client */}
              <div className="mt-5 space-y-2">

                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User size={15} />
                  <span>{project.clientName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={15} />
                  <span>{project.clientEmail}</span>
                </div>

              </div>

              {/* Button */}
              <div className="mt-6 flex justify-end">

                {project.status === "in_progress" ? (
                  <Button
                    color="primary"
                    radius="md"
                    startContent={<Send size={16} />}
                  >
                    Submit Deliverable
                  </Button>
                ) : (
                  <Button
                    color="success"
                    radius="md"
                    isDisabled
                    startContent={<CheckCircle2 size={16} />}
                  >
                    Completed
                  </Button>
                )}

              </div>

            </Card>
          ))}

        </div>
      )}

    </div>
  );
};

export default ActiveProjectsList;

