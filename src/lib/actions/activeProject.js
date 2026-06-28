"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getActiveProjects = async (freelancerId) => {
  const res = await fetch(
    `${baseUrl}/api/freelancer/activeprojects/${freelancerId}`
  );

  return res.json();
};