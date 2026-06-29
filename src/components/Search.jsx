"use client";

import React from "react";
import { Form } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

const Search = ({
  route = "/public/browsetasks",
  queryKey = "search",
}) => {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const value = e.target.search.value.trim();

    router.push(
      `${route}?${queryKey}=${encodeURIComponent(value)}`
    );
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
      <Form onSubmit={handleSearch}>
        <div className="w-full">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Search by Title
          </label>

          <div className="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white focus-within:border-cyan-500">
            <input
              name="search"
              type="search"
              placeholder="Search tasks by title..."
              className="flex-1 px-4 outline-none"
            />

            <button
              type="submit"
              className="flex items-center gap-2 bg-cyan-600 px-6 text-white hover:bg-cyan-700"
            >
              <Magnifier />
              Search
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Search;