"use client";

import React, { useState } from "react";

import {Select,ListBox,Form, Label, Input, Button,} from "@heroui/react";
import {ChevronsExpandVertical, Magnifier,} from "@gravity-ui/icons";

const Search = () => {

  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
 


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-10">
      {/* Search */}
      <div>
        <Form className="w-full max-w-2xl">
          <Label className="mb-2 block text-sm font-semibold text-gray-700">
            Search by Title
          </Label>

          <div className="flex items-stretch">
            <Input
              name="search"
              type="search"
              placeholder="Search task with title..."
              radius="none"
             
            />

            <Button
              type="submit"
              color="primary"
              radius="none"
              className="h-12 rounded-r-lg rounded-l-none px-8 font-medium"
            >
              Search
            </Button>
          </div>
        </Form>
      </div>
      {/* Category */}
      <div className="space-y-2">
        <Label className="font-medium text-gray-700">
          Category
        </Label>

        <Select
          selectedKey={category}
          onSelectionChange={setCategory}
        >
          <Select.Trigger className="h-11 rounded-xl border border-gray-300 bg-white px-3">
            <Select.Value />
            <Select.Indicator>
              <ChevronsExpandVertical />
            </Select.Indicator>
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all">
                All Categories
              </ListBox.Item>

              <ListBox.Item id="web">
                Web Development
              </ListBox.Item>

              <ListBox.Item id="design">
                UI/UX Design
              </ListBox.Item>

              <ListBox.Item id="marketing">
                Digital Marketing
              </ListBox.Item>

              <ListBox.Item id="writing">
                Content Writing
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label className="font-medium text-gray-700">
          Status
        </Label>

        <Select
          selectedKey={status}
          onSelectionChange={setStatus}
        >
          <Select.Trigger className="h-11 rounded-xl border border-gray-300 bg-white px-3">
            <Select.Value />
            <Select.Indicator>
              <ChevronsExpandVertical />
            </Select.Indicator>
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all">
                All Status
              </ListBox.Item>

              <ListBox.Item id="open">
                Open
              </ListBox.Item>

              <ListBox.Item id="in-progress">
                In Progress
              </ListBox.Item>

              <ListBox.Item id="completed">
                Completed
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
};

export default Search;