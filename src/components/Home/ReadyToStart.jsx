"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowRight, LayoutDashboard, LogIn } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function ReadyToStart() {
  const { data: session } = useSession();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 px-8 py-14 md:px-14">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-white">
                Ready to get started?
              </h2>

              <p className="mt-4 text-white/85">
                Join SkillSwap and connect with clients and freelancers around
                the world.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {!session ? (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-cyan-600 transition hover:scale-105 hover:bg-cyan-50"
                >
                  Get Started
                </Link>
              ) : (
                <Link
                  href="/public/browsetasks"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-cyan-600 transition hover:scale-105 hover:bg-cyan-50"
                >
                  Browse Tasks
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}