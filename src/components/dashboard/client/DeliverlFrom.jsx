"use client";

import { useState } from "react";

const DeliverlFrom = ({ task }) => {
  const [likes, setLikes] = useState(task.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return;

    setLikes((prev) => prev + 1);
    setLiked(true);

    try {
      await fetch(`/api/tasks/${task._id}/like`, {
        method: "PATCH",
      });
    } catch (err) {
      setLikes((prev) => prev - 1);
      setLiked(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
      <h2 className="text-lg font-bold mb-5">
        Project Delivery
      </h2>

      {/* Freelancer Info */}
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        <div className="bg-white p-3 rounded-xl">
          <p className="text-sm text-gray-500">Freelancer</p>
          <h4 className="font-semibold">
            {task.assignedFreelancerName}
          </h4>
        </div>

        <div className="bg-white p-3 rounded-xl">
          <p className="text-sm text-gray-500">Email</p>
          <h4 className="font-semibold">
            {task.assignedFreelancerEmail}
          </h4>
        </div>

        <div className="bg-white p-3 rounded-xl">
          <p className="text-sm text-gray-500">Completed</p>
          <h4 className="font-semibold">
            {new Date(task.completedAt).toLocaleDateString()}
          </h4>
        </div>

        <div className="bg-white p-3 rounded-xl">
          <p className="text-sm text-gray-500">Likes</p>
          <h4 className="font-semibold">
            ❤️ {likes}
          </h4>
        </div>
      </div>

      {/* Deliverable */}
      <div className="mb-5">
        <p className="text-sm text-gray-600 mb-2">
          Deliverable URL
        </p>

        <a
          href={task.deliverable_url}
          target="_blank"
          className="text-cyan-600 hover:underline break-all"
        >
          {task.deliverable_url}
        </a>
      </div>
      <div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-lg transition ${liked
            ? "bg-pink-200 text-pink-700"
            : "bg-pink-100 text-pink-600 hover:bg-pink-200"
            }`}
        >
          ❤️ Like Project
        </button>

        {/* Comments */}
        <div className="mt-5 border-t pt-4">
          <h3 className="font-semibold mb-3">Comments</h3>

          {task.comments?.map((comment, index) => (
            <div key={index} className="bg-white rounded-xl p-3 mb-2">
              <p className="font-medium">{comment.userName}</p>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))}

          <textarea
            className="w-full border rounded-xl p-3 mt-3"
            rows={3}
            placeholder="Write your feedback..."
          />

          <button className="mt-3 px-5 py-2 bg-cyan-500 text-white rounded-lg">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliverlFrom;