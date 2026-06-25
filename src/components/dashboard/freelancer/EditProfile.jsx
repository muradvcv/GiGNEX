"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Input,
  Label,
  Button,
} from "@heroui/react";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const profileData = {
      name: formData.get("name"),
      image: formData.get("image"),
      bio: formData.get("bio"),
      skills: formData
        .get("skills")
        ?.split(",")
        .map((skill) => skill.trim()),
      hourlyRate: Number(formData.get("hourlyRate")),
    };

    try {
      const res = await fetch("/api/freelancers/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6">
        Edit Freelancer Profile
      </h2>

      <Form onSubmit={handleUpdate} className="space-y-5">

        <TextField name="name" isRequired>
          <Label>Full Name</Label>
          <Input defaultValue={user?.name} />
        </TextField>

        <TextField name="image">
          <Label>Profile Image</Label>
          <Input defaultValue={user?.image} />
        </TextField>

        <TextField name="bio">
          <Label>Bio</Label>
          <Input
            defaultValue={user?.bio}
            placeholder="Tell clients about yourself"
          />
        </TextField>

        <TextField name="skills">
          <Label>Skills</Label>
          <Input
            defaultValue={user?.skills?.join(", ")}
            placeholder="React, Node.js, MongoDB"
          />
        </TextField>

        <TextField name="hourlyRate">
          <Label>Hourly Rate (USD)</Label>
          <Input
            type="number"
            defaultValue={user?.hourlyRate?.toString()}
          />
        </TextField>

        <Button
          color="primary"
          type="submit"
          isLoading={loading}
          className="w-full"
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;