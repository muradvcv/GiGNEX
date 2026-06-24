"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  TextArea,
  ListBox,
  Label,
} from "@heroui/react";

export default function PostTask() {
  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log(data);

    // API call here
    // await fetch("/api/tasks", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <div className="jobCategory flex justify-center">
      <Form onSubmit={onSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 md:p-8">
        <h1 className="text-center text-3xl font-bold mb-8">Post a New Task</h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label className="block w-full text-sm font-medium mb-2">Task Title</Label>

            <Input name="title" required placeholder="Task Title" variant="bordered" radius="md" className="w-full" />
          </div>

          <div>
            <Select name="jobCategory" required className="w-full py-1" placeholder="Select category">
              <Label>Task Category</Label>

              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="technology" textValue="Technology">Technology</ListBox.Item>
                  <ListBox.Item id="design" textValue="Design">Design</ListBox.Item>
                  <ListBox.Item id="marketing" textValue="Marketing">Marketing</ListBox.Item>
                  <ListBox.Item id="sales" textValue="Sales">Sales</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        <div className="mt-5 w-full">
          <Label className="block w-full text-sm font-medium mb-2">Description</Label>

          <TextArea name="description" required placeholder="Description" variant="bordered" className="w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-5">
          <div>
            <Label className="block text-sm font-medium mb-2">Budget (USD)</Label>

            <Input name="budget" required type="number" min={1} placeholder="Enter budget" variant="bordered" className="w-full" />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-2">Deadline Date</Label>

            <Input name="deadline" required type="date" variant="bordered" className="w-full" />
          </div>
        </div>

        <Button type="submit" className="w-full mt-6 bg-cyan-500">
          Post Task
        </Button>
      </Form>
    </div>
  );
}