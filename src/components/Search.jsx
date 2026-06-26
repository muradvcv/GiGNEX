"use client";

import React, { useState } from "react";
import {
  Select,
  ListBox,
  Form,
  Label,
  Input,
  Button,
} from "@heroui/react";
import {
  ChevronsExpandVertical,
  Magnifier,
} from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

const Search = ({
  route = "/public/browsetasks",
  queryKey = "search",
}) => {
  const router = useRouter();

  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = e.target.search.value.trim();

    router.push(
      `${route}?${queryKey}=${encodeURIComponent(value)}`
    );
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

        {/* Search Input */}
        <div className="w-full">
          <Form onSubmit={handleSearch} className="w-full">
            <div className="w-full">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search by Title
              </label>

              <div className="group flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition-all duration-300 focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-100 hover:border-gray-400">
                <input
                  name="search"
                  type="search"
                  placeholder="Search tasks by title..."
                  className="flex-1 bg-transparent px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-cyan-600 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-cyan-700 active:scale-95"
                >
                  <Magnifier className="text-lg" />
                  Search
                </button>
              </div>
            </div>
          </Form>
        </div>

        {/* Category Dropdown */}
        <div className="w-full">
          <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
            Category
          </Label>

          <Select
            aria-label="Select Category"
            selectedKey={category}
            onSelectionChange={setCategory}
          >
            <Select.Trigger className="h-12 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 px-4 hover:border-gray-300 dark:hover:border-zinc-600 transition-colors">
              <Select.Value className="text-gray-700 dark:text-zinc-200 font-medium" />
              <Select.Indicator>
                <ChevronsExpandVertical className="text-gray-400" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="border border-gray-100 dark:border-zinc-800 shadow-xl rounded-xl">
              <ListBox className="p-1">
                <ListBox.Item id="all" className="rounded-lg">All Categories</ListBox.Item>
                <ListBox.Item id="technology" className="rounded-lg">Technology</ListBox.Item>
                <ListBox.Item id="design" className="rounded-lg">Design</ListBox.Item>
                <ListBox.Item id="marketing" className="rounded-lg">Marketing</ListBox.Item>
                <ListBox.Item id="sales" className="rounded-lg">Sales</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Status Dropdown */}
        <div className="w-full">
          <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
            Status
          </Label>

          <Select
            aria-label="Select Status"
            selectedKey={status}
            onSelectionChange={setStatus}
          >
            <Select.Trigger className="h-12 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 px-4 hover:border-gray-300 dark:hover:border-zinc-600 transition-colors">
              <Select.Value className="text-gray-700 dark:text-zinc-200 font-medium" />
              <Select.Indicator>
                <ChevronsExpandVertical className="text-gray-400" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="border border-gray-100 dark:border-zinc-800 shadow-xl rounded-xl">
              <ListBox className="p-1">
                <ListBox.Item id="all" className="rounded-lg">All Status</ListBox.Item>
                <ListBox.Item id="open" className="rounded-lg">Open</ListBox.Item>
                <ListBox.Item id="in-progress" className="rounded-lg">In Progress</ListBox.Item>
                <ListBox.Item id="completed" className="rounded-lg">Completed</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

      </div>
    </div>
  );
};

export default Search;