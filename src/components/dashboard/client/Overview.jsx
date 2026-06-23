"use client";

import {
  ListCheck,
  Clock3,
  CircleDashed,
  DollarSign,
  ClipboardList,
} from "lucide-react";

import { Card, Button } from "@heroui/react";
import Link from "next/link";

const stats = [
  {
    title: "Total Tasks",
    value: 0,
    description: "All tasks created",
    icon: ListCheck,
  },
  {
    title: "Open Tasks",
    value: 0,
    description: "Awaiting proposals",
    icon: Clock3,
  },
  {
    title: "In Progress",
    value: 0,
    description: "Currently being worked on",
    icon: CircleDashed,
  },
  {
    title: "Total Spent",
    value: "$0",
    description: "Total money paid",
    icon: DollarSign,
  },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card
              key={index}
              className="border border-default-200 p-6 shadow-none"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-default-500 text-sm">{item.title}</p>

                  <h2 className="mt-2 text-5xl font-bold text-[#06B6D4]">
                    {item.value}
                  </h2>

                  <p className="mt-3 text-sm text-default-400">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#06b5d40e]">
                  <Icon
                    size={22}
                    className="text-[#3B82F6]"
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">
          Recent Tasks
        </h2>

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

            <Button
              as={Link}
              href="/dashboard/post-task"
              color="warning"
              className="mt-6 font-medium"
            >
              Post a Task
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}