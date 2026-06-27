"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// create proposal
export const CreateProposal = async (newProposal) => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/api/proposal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProposal),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create proposal");
  }

  return data;
};


// get proposal by freelancer email
export const getProposalByFreelancer = async (email) => {
  const res = await fetch(
    `${baseUrl}/api/proposal/freelancer/${email}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch proposals");
  }

  return data.data;
};