const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getTaskByClient = async (clientId, status="open")=>{

  const res = await fetch(`${baseUrl}/api/tasks?clientId=${clientId}&status=${status}`)
  return res.json()
}


export const getTaskById = async (id) => {
  const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
    cache: "no-store",
  });

  return res.json();
};

// browse task section


// Get all tasks
export async function getBrowseTasks(page = 1, limit = 6) {
  const res = await fetch(
    `${baseUrl}/api/browsetasks?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}

// Get single task
export async function getBrowseTaskDetails(id) {
  try {
    const res = await fetch(`${baseUrl}/api/browsetasks/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch task details");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}