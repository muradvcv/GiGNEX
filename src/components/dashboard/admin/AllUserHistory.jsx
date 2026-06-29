"use client";

import { useState } from "react";
import { Search, Ban } from "lucide-react";
import Image from "next/image";

const AllUserHistory = ({ users = [] }) => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [localUsers, setLocalUsers] = useState(users);
  const [loadingId, setLoadingId] = useState(null);

  const filteredUsers = localUsers.filter((user) => {
    const matchSearch = user.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchRole = role === "all" || user.role === role;

    return matchSearch && matchRole;
  });

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      setLoadingId(userId);

      const res = await fetch(
        "http://localhost:5000/api/users/block",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            isBlocked: !currentStatus,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message);

      setLocalUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, isBlocked: !currentStatus }
            : user
        )
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">
          User Management
        </h1>
        <p className="text-gray-500 mt-1">
          {filteredUsers.length} total users
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            className="w-full h-11 border rounded-lg pl-10 pr-4"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border rounded-lg h-11 px-4 w-44"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto border rounded-xl">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Joined</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => {
              const isBlocked = user.isBlocked;

              return (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={user.image || "/default-avatar.png"}
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">{user.role}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                        }`}
                    >
                      {isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={loadingId === user._id}
                      onClick={() =>
                        handleToggleBlock(user._id, isBlocked)
                      }
                      className={`font-medium ${isBlocked ? "text-green-600" : "text-red-500"
                        }`}
                    >
                      <Ban size={16} className="inline mr-1" />
                      {loadingId === user._id
                        ? "Updating..."
                        : isBlocked
                          ? "Unblock"
                          : "Block"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => {
          const isBlocked = user.isBlocked;

          return (
            <div
              key={user._id}
              className="border rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">{user.role}</span>

                <span
                  className={`px-2 py-1 rounded-full text-xs ${isBlocked
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                    }`}
                >
                  {isBlocked ? "Blocked" : "Active"}
                </span>
              </div>

              <button
                disabled={loadingId === user._id}
                onClick={() =>
                  handleToggleBlock(user._id, isBlocked)
                }
                className={`mt-3 w-full py-2 rounded-lg font-medium ${isBlocked
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {loadingId === user._id
                  ? "Updating..."
                  : isBlocked
                    ? "Unblock User"
                    : "Block User"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUserHistory;