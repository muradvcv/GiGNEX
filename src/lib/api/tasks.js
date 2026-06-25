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