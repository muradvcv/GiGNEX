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


const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const redirect = "/";
  const { refetch } = useSession();


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      toast.success("logedin successfully!");
      await refetch();
      setTimeout(() => {
        router.push(redirect);
      });
    }
    catch (error) {
      toast.error(err.message || "Something went wrong");
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
        <p className="mt-2 text-default-500">
          Join our platform today
        </p>
      </div>

      <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>

        {/* EMAIL */}
        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="murad121@gmail.com" />
          <FieldError />
        </TextField>

        {/* PASSWORD (FIXED) */}
        <TextField
          isRequired
          name="password"
          type="password"

        >
          <Label>Password</Label>

          <Input placeholder="Enter password" />


          <FieldError />
        </TextField>

        {/* SUBMIT */}
        <Button color="primary" className="w-full font-semibold bg-[#06B6D4]" type="submit">
          Create Account
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
        Do not have an account?{" "}
        <Link
          href="/auth/register"
          className="text-[#4B4CFE] font-medium hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;