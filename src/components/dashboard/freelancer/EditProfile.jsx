"use client";

import { useState } from "react";
import { Input, Label, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const EditProfile = ({ user }) => {
 
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const profileData = {
        name: formData.get("name")?.toString() || "",
        image: formData.get("image")?.toString() || "",
        bio: formData.get("bio")?.toString() || "",
        skills: formData
          .get("skills")
          ?.toString()
          .split(",")
          .map((skill) => skill.trim()),
        hourlyRate: Number(formData.get("hourlyRate") || 0),
      };

      const { error } = await authClient.updateUser({
        name: profileData.name,
        image: profileData.image,
        bio: profileData.bio,
        skills: profileData.skills,
        hourlyRate: profileData.hourlyRate,
      });

      if (error) {
        toast.error(error.message || "Profile update failed");
        return;
      }

      toast.success("Profile updated successfully 🎉");

      setTimeout(() => {
        router.push(`/public/freelancers/${user.id}`);
      }, 100);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-sky-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-cyan-100 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-8 py-8">
          <h2 className="text-3xl font-bold text-white">
            Edit Freelancer Profile
          </h2>
          <p className="text-cyan-100 mt-2">
            Update your profile information and impress clients.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8"
        >

          {/* Name */}
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">
              Full Name
            </Label>
            <Input
              name="name"
              defaultValue={user?.name || ""}
              size="lg"
              radius="lg"
              variant="bordered"
              className="w-full"
              
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">
              Profile Image URL
            </Label>
            <Input
              name="image"
              defaultValue={user?.image || ""}
              size="lg"
              radius="lg"
              variant="bordered"
              className="w-full"
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">
              Skills
            </Label>
            <Input
              name="skills"
              defaultValue={user?.skills?.join(", ") || ""}
              placeholder="React, Next.js, Node.js"
              size="lg"
              radius="lg"
              variant="bordered"
              className="w-full"
            />
          </div>

          {/* Hourly Rate */}
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">
              Hourly Rate ($)
            </Label>
            <Input
              type="number"
              name="hourlyRate"
              defaultValue={user?.hourlyRate || 0}
              size="lg"
              radius="lg"
              variant="bordered"
              className="w-full"

            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2 space-y-2">
            <Label className="font-semibold text-slate-700">
              Bio
            </Label>

            <textarea
              name="bio"
              defaultValue={user?.bio || ""}
              rows={5}
              className="w-full rounded-2xl border-2 border-cyan-200 bg-cyan-50 px-4 py-3 text-slate-700 outline-none transition-all duration-300 focus:border-cyan-500"
              placeholder="Write something about yourself..."
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2 pt-2">
            <Button
              type="submit"
              isLoading={loading}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-lg font-bold text-white shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Save Changes
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;