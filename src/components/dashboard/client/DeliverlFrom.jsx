"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const DeliverForm = ({ task }) => {
  const [likes, setLikes] = useState(task.likes || 0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(
    task.reviewSubmitted || false
  );

  const handleLike = async () => {
    if (liked) return;

    setLikes((prev) => prev + 1);
    setLiked(true);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${task._id}/like`,
        {
          method: "PATCH",
        }
      );
    } catch (error) {
      setLikes((prev) => prev - 1);
      setLiked(false);
      console.error(error);
    }
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      alert("Please write feedback");
      return;
    }

    setLoading(true);

    try {
      const reviewData = {
        taskId: task._id,

        clientId: task.clientId,
        clientName: task.clientName,
        clientEmail: task.clientEmail,

        freelancerId: task.assignedFreelancerId,
        freelancerName: task.assignedFreelancerName,
        freelancerEmail: task.assignedFreelancerEmail,
        rating,
        like: likes,
        comment: comment.trim(),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Review submitted successfully");
        setComment("");
        setReviewSubmitted(true);
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
      <h2 className="text-lg font-bold mb-5">
        Project Delivery
      </h2>

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
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-sm text-gray-600 mb-2">
          Deliverable URL
        </p>

        <a
          href={task.deliverable_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 hover:underline break-all"
        >
          {task.deliverable_url}
        </a>
      </div>

      <button
        onClick={handleLike}
        disabled={liked}
        className={`px-4 py-2 rounded-lg transition ${liked
            ? "bg-pink-200 text-pink-700 cursor-not-allowed"
            : "bg-pink-100 text-pink-600 hover:bg-pink-200"
          }`}
      >
        ❤️ {liked ? "Liked" : "Like Project"}
      </button>

      <div className="mt-5 border-t pt-4">
        <h3 className="font-semibold mb-3">Feedback</h3>

        {!reviewSubmitted ? (
          <>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-xl p-3"
              rows={4}
              placeholder="Write your feedback..."
            />

            <button
              onClick={handleSubmitReview}
              disabled={loading}
              className="mt-3 px-5 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </>
        ) : (
          <div className="rounded-xl bg-green-100 p-4 text-green-700 font-medium">
            ✅ Feedback already submitted
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliverForm;