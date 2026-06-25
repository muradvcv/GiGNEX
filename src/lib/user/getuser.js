import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserForServer=async()=>{
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}