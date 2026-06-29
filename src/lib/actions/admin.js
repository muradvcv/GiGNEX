"use server"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

// get admin overview all data (summary data)

export const getAllSummary = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/dashboard`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard summary");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};