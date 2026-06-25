"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TaskEditModal({ task }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedTask = {
      title: form.title.value,
      description: form.description.value,
      budget: Number(form.budget.value),
      deadline: form.deadline.value,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${task._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }
    );

    if (res.ok) {
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      {task.status === "open" && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50"
        >
          Edit
        </button>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Edit Task
              </h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                defaultValue={task.title}
                className="w-full border rounded-xl p-3"
              />

              <textarea
                name="description"
                defaultValue={task.description}
                rows={5}
                className="w-full border rounded-xl p-3"
              />

              <input
                type="number"
                name="budget"
                defaultValue={task.budget}
                className="w-full border rounded-xl p-3"
              />

              <input
                type="date"
                name="deadline"
                defaultValue={task.deadline}
                className="w-full border rounded-xl p-3"
              />

              <button
                type="submit"
                className="w-full py-3 bg-cyan-500 text-white rounded-xl"
              >
                Update Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}