import ActiveProjectsList from "@/components/dashboard/freelancer/ActiveProjectsList";
import { getActiveProjects } from "@/lib/actions/activeProject";
import { getUserForServer } from "@/lib/user/getuser";


const FreelancerActiveProjects = async () => {
  const session = await getUserForServer();
  const freelancerId = session?.user?.id;

  const projects = await getActiveProjects(freelancerId);

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Active Projects</h1>

        <p className="text-default-500 mt-2">
          Track your running and completed projects.
        </p>
      </div>

      <ActiveProjectsList projects={projects} />
    </div>
  );
};

export default FreelancerActiveProjects;