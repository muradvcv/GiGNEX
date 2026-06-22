"use client";

import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import { ArrowRight, BriefcaseBusiness, Users, DollarSign } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-blue-50" />

      <div className="absolute top-0 left-0 h-56 w-56 bg-violet-300/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 h-56 w-56 bg-blue-300/20 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <Chip
              size="sm"
              color="secondary"
              variant="flat"
              className="mb-4"
            >
              🚀 Freelance Marketplace
            </Chip>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Hire Experts
              <span className="block text-primary">
                Get Work Done Faster
              </span>
            </h1>

            <p className="mt-4 text-default-500 max-w-lg">
              Post tasks, receive proposals, hire freelancers,
              and pay securely from one platform.
            </p>

            <div className="flex gap-3 mt-6">
              <Button
                as={Link}
                href="/tasks"
                color="primary"
                endContent={<ArrowRight size={16} />}
              >
                Browse Tasks
              </Button>

              <Button
                as={Link}
                href="/dashboard/client"
                variant="bordered"
              >
                Post Task
              </Button>
            </div>

            <div className="flex gap-3 flex-wrap mt-6">
              <Chip variant="flat">10K+ Tasks</Chip>
              <Chip variant="flat">2.5K+ Freelancers</Chip>
              <Chip variant="flat">$150K Paid</Chip>
            </div>
          </div>

          {/* Right */}
          <div>
            <Card className="p-5 max-w-md mx-auto shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">
                  Platform Stats
                </h3>

                <Chip size="sm" color="success">
                  Live
                </Chip>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-default-100">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness size={18} />
                    <span>Open Tasks</span>
                  </div>
                  <span className="font-bold">125</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-default-100">
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>Freelancers</span>
                  </div>
                  <span className="font-bold">2.5K</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-default-100">
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} />
                    <span>Total Paid</span>
                  </div>
                  <span className="font-bold">$150K</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}