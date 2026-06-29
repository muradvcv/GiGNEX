"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// get review
export const getReviewByFreelancerId = async (freelancerId) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/reviews/freelancer/${freelancerId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};