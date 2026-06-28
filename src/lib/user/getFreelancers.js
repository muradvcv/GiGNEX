"use server"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getFreelancers() {
  const res = await fetch(`${baseUrl}/api/freelancers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch freelancers");
  }

  return res.json();
}
