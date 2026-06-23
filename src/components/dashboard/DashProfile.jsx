"use client";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";

const DashProfile = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-3 p-4 border rounded-xl">
        <div className="w-6 h-12 rounded-full bg-gray-200 animate-pulse" />

        <div className="flex-1">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="flex items-center gap-3 p-2 border rounded-xl bg-white shadow-sm mb-2">

      {/* Avatar */}
      <Image
        src={user?.image || '/default-avatar.png'}
        alt={user?.name}
        className="w-12 h-12 rounded-full object-cover"
        width={100}
        height={100}
      />
      {/* Info */}
      <div className="flex-1">

        {/* Name + Role (right side small badge) */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm truncate">
            {user?.name || "Unknown User"}
          </h3>

          <span className="ml-2 text-[10px] px-2 py-[2px] rounded-full bg-blue-100 text-blue-600 whitespace-nowrap">
            {user?.role || "Client"}
          </span>
        </div>

        {/* Email */}
        <p className="text-xs text-gray-500 mt-1 truncate">
          {user?.email}
        </p>
      </div>
    </div>
  );
};

export default DashProfile;