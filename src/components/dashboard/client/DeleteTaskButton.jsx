"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteTaskButton = ({ taskId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      alert("Task deleted successfully!");

      router.push("/dashboard/client/task");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition"
    >
      <Trash2 size={16} />
      Delete Task
    </button>
  );
};

export default DeleteTaskButton;