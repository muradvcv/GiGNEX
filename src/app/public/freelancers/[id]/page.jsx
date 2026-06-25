import Image from "next/image";
import {
  CalendarDays,
  CircleDollarSign,
  Mail,
  Briefcase,
  BadgeCheck,
} from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getFreelancer(id) {
  const res = await fetch(
    `${baseUrl}/api/freelancers/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch freelancer");
  }

  return res.json();
}

const FreelancerDetails = async ({ params }) => {
  const { id } = await params;

  const freelancer = await getFreelancer(id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Cover */}
      <div className="h-24 rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600"></div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 -mt-20 relative">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Profile Image */}
          <Image
            src={
              freelancer?.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={freelancer?.name}
            width={130}
            height={130}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-3xl font-bold">
                {freelancer?.name}
              </h1>

              {!freelancer?.isBlocked && (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <BadgeCheck size={15} />
                  Active Freelancer
                </span>
              )}
            </div>

            <div className="mt-5 space-y-3 text-gray-600">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={17} />
                {freelancer?.email}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2">
                <CalendarDays size={17} />
                Joined{" "}
                {new Date(
                  freelancer?.createdAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2">
                <CircleDollarSign size={17} />
                ${freelancer?.hourlyRate || 0}/hr
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 capitalize">
                <Briefcase size={17} />
                {freelancer?.role}
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">
            About Freelancer
          </h2>

          <div className="bg-gray-50 border rounded-2xl p-5">
            <p className="text-gray-600 leading-7">
              {freelancer?.bio ||
                `${freelancer?.name} is a passionate freelancer dedicated to delivering high-quality work and helping clients achieve their goals. Focused on professionalism, communication, and client satisfaction.`}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-4">
            Professional Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {freelancer?.skills?.length > 0 ? (
              freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">
                No skills added yet
              </span>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-cyan-50 rounded-2xl p-5 text-center">
            <h3 className="text-2xl font-bold text-cyan-600">
              ${freelancer?.hourlyRate || 0}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Hourly Rate
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-5 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {freelancer?.emailVerified ? "Yes" : "No"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Email Verified
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5 text-center">
            <h3 className="text-2xl font-bold text-blue-600">
              {freelancer?.isBlocked ? "Blocked" : "Active"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Account Status
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetails;