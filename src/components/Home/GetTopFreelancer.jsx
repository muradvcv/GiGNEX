import Link from "next/link";

import { ArrowRight, Star, ThumbsUp } from "lucide-react";
import { getTopReviewFreelancer } from "@/lib/api/review";

const GetTopReview = async () => {
  const freelancers = await getTopReviewFreelancer();

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
          Top Freelancers
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          🏆 Top Rated Freelancers
        </h2>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Discover the freelancers who consistently earn the highest ratings and
          positive client feedback.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {freelancers.map((freelancer) => (
          <div
            key={freelancer.freelancerId}
            className="border border-cyan-200 rounded-xl bg-white p-4 hover:border-cyan-500 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-center gap-4">
              {/* Left */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center shrink-0">
                  {freelancer.freelancerName?.charAt(0).toUpperCase()}
                </div>

                {/* Inf */}
                <div className="flex-1 min-w-0">
                  {/* Name + Rating */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-gray-800 text-lg truncate">
                      {freelancer.freelancerName}
                    </h3>

                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium">
                        {Number(freelancer.avgRating ?? 0).toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <ThumbsUp className="w-4 h-4 text-cyan-600" />
                      <span>{freelancer.totalLikes}</span>
                    </div>

                    <span className="text-sm text-gray-500">
                      📝 {freelancer.totalReviews} Reviews
                    </span>
                  </div>

                
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {freelancer.freelancerEmail}
                  </p>
                </div>
              </div>

              {/* Button */}
              <Link
                href={`/public/freelancers/${freelancer.freelancerId}`}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition whitespace-nowrap"
              >
                View Details
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mobile Button */}
            <Link
              href={`/public/freelancers/${freelancer.freelancerId}`}
              className="sm:hidden mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition"
            >
              View Details
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetTopReview;