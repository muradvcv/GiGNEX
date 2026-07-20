"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  Description,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const redirect = "/";
  const { refetch } = useSession();
  const [selectedRole, setSelectedRole] = useState("client");
  // PASSWORD VALIDATION
  const validatePassword = (value) => {
    if (!value) return "Password is required";

    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(value)) {
      return "Must contain at least one uppercase letter";
    }

    if (!/[0-9]/.test(value)) {
      return "Must contain at least one number";
    }

    if (!/[!@#$%^&*]/.test(value)) {
      return "Must contain at least one special character";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image,
        role: data.role,
        isBlocked: false,
        skills:
          data.role === "freelancer"
            ? data.skills?.split(",").map((s) => s.trim())
            : [],
        bio:
          data.role === "freelancer"
            ? data.bio
            : "",

        hourlyRate:
          data.role === "freelancer"
            ? Number(data.hourlyRate || 0)
            : 0,
      });
      if (result.token) {
        toast.success("Account created successfully!");
       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email?email=${data.email}&name=${data.name}`, {method: "POST",});
      }

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      await refetch();
      setTimeout(() => {
        router.push(redirect);
      }, 100);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-default-200 bg-background py-5 px-10 shadow-lg my-10">
      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-sm mb-3 text-center bg-red-100 p-2 shadow rounded-2xl">
          {error}
        </p>
      )}
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className=" text-default-500">
          Join our platform today
        </p>

      </div>

      <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* NAME */}
        <TextField isRequired name="name">
          <Label>Full Name</Label>
          <Input placeholder="Md Murad" />
          <FieldError />
        </TextField>

        {/* EMAIL */}
        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="murad121@gmail.com" />
          <FieldError />
        </TextField>

        {/* PASSWORD */}
        <TextField
          isRequired
          name="password"
          type="password"
          validate={validatePassword}
        >
          <Label>Password</Label>

          <Input placeholder="Enter password" />

          <Description>
            8+ chars, uppercase, number & special character
          </Description>

          <FieldError />
        </TextField>

        {/* IMAGE */}
        <TextField name="image">
          <Label>Profile Image URL</Label>
          <Input
            type="url"
            placeholder="https://i.ibb.co.com/hx063rhL/IMG-20260530-130354.jpg"
          />
          <FieldError />
        </TextField>

        {/* ROLE */}
        <div className="flex flex-col gap-2">
          <Label>Account Type</Label>

          <div className="flex gap-4 text-sm p-2 ">
            <label className="flex items-center gap-2 px-2 py-1 rounded-xl shadow">
              <input
                type="radio"
                name="role"
                value="client"
                checked={selectedRole === "client"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              Client
            </label>

            <label className="flex items-center gap-2 px-2 py-1 rounded-xl shadow">
              <input
                type="radio"
                name="role"
                value="freelancer"
                checked={selectedRole === "freelancer"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              Freelancer
            </label>
          </div>
        </div>
        {/* FREELANCER PROFILE */}
        {selectedRole === "freelancer" && (
          <div className="border border-emerald-200 rounded-2xl p-5 bg-emerald-50/40 space-y-4">
            <h3 className="font-semibold text-emerald-600">
              Freelancer Profile
            </h3>

            <TextField name="skills">
              <Label>Skills (comma-separated)</Label>
              <Input placeholder="React, Node.js, Design" />
            </TextField>

            <TextField name="bio">
              <Label>Bio</Label>
              <Input placeholder="Tell clients about yourself..." />
            </TextField>

            <TextField name="hourlyRate" type="number">
              <Label>Hourly Rate (USD)</Label>
              <Input placeholder="50" />
            </TextField>
          </div>
        )}

        {/* SUBMIT */}
        <Button
          color="primary"
          className="w-full font-semibold bg-[#06B6D4]"
          type="submit"
          isLoading={loading}
          isDisabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        {/* GOOGLE */}
        <Button
          type="button"
          onPress={handleGoogleLogin}
          className="w-full h-12 bg-white text-black border border-default-200 shadow-sm hover:shadow-md hover:bg-default-50 transition-all duration-300"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </Button>
      </Form>

      {/* LOGIN LINK */}
      <div className="text-center mt-4 text-sm text-default-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-[#4B4CFE] font-medium hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;