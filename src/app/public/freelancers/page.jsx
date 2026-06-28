import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react";
import { getFreelancers } from "@/lib/user/getFreelancers";

const Freelancer = async () => {
  const freelancers = await getFreelancers();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Browse Freelancers
        </h1>
        <p className="text-gray-500 mt-2">
          Discover talented freelancers for your next project
        </p>
      </div>

      {/* Freelancers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {freelancers?.map((freelancer) => (
          <div
            key={freelancer._id}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex gap-4">
              {/* Profile Image */}
              <Image
                src={
                  freelancer.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={freelancer.name}
                width={65}
                height={65}
                className="w-[65px] h-[65px] rounded-full object-cover border-2 border-green-300"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-lg truncate">
                      {freelancer.name}
                    </h2>

                    <p className="text-xs text-gray-500 truncate">
                      {freelancer.email}
                    </p>
                  </div>

                  <Link
                    href={`/public/freelancers/${freelancer._id}`}
                    className="flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    Profile
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Joined + Rate */}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <CalendarDays size={13} />joined : 
                      {new Date(
                      freelancer.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <div className="flex items-center gap-1 text-cyan-600 font-semibold">
                    <CircleDollarSign size={14} />
                    ${freelancer.hourlyRate || 0}/hr
                  </div>
                </div>

           
              
                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {freelancer.skills
                    ?.slice(0, 4)
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-cyan-50 text-cyan-700 rounded-full text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {freelancers?.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-gray-500">
            No freelancers found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Freelancer;