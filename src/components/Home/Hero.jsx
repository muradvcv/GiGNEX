"use client";

import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Users,
  DollarSign,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { motion } from "motion/react";
import PlatformStats from "./PlatformStats";

export default function Hero() {
  const { data: session, isPending } = useSession();

  return (
    <section className="relative overflow-hidden py-10 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-sky-50" />

      <motion.div
        className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl"
        animate={{
          x: [0, 25, 0],
          y: [0, -25, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
      />

      <motion.div
        className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
            }}
          >
            <Chip
              color="secondary"
              variant="flat"
              className="mb-5 font-medium"
            >
              🚀 Freelance Marketplace
            </Chip>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-gray-900 dark:text-white"
            >
              Hire Experts

              <span className="mt-2 block bg-gradient-to-r from-violet-600 via-primary to-sky-500 bg-clip-text text-transparent">
                Get Work Done Faster
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.45,
              }}
              className="mt-6 text-lg text-default-500 max-w-xl leading-8"
            >
              Connect with talented freelancers, receive competitive
              proposals, manage projects seamlessly, and pay securely —
              everything from one modern platform.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
              }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <div className="flex flex-wrap gap-4 mt-8">
                {!session?.user ? (
                  <>
                    <Link href="/public/browsetasks">
                      <Button
                        color="primary"
                        size="lg"
                        endContent={<ArrowRight size={18} />}
                      >
                        Browse Tasks
                      </Button>
                    </Link>

                    <Link href="/sign-in">
                      <Button variant="bordered" size="lg">
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : session.user.role === "freelancer" ? (
                  <>
                    <Link href="/public/browsetasks">
                      <Button
                        color="primary"
                        size="lg"
                        endContent={<ArrowRight size={18} />}
                      >
                        Browse Tasks
                      </Button>
                    </Link>

                    <Link href="/dashboard/freelancer">
                      <Button variant="bordered" size="lg">
                        Dashboard
                      </Button>
                    </Link>
                  </>
                ) : session.user.role === "client" ? (
                  <>
                    <Link href="/dashboard/client/task/new">
                      <Button
                        color="primary"
                        size="lg"
                        endContent={<ArrowRight size={18} />}
                      >
                        Post a Task
                      </Button>
                    </Link>

                    <Link href="/dashboard/client">
                      <Button variant="bordered" size="lg">
                        Dashboard
                      </Button>
                    </Link>
                  </>
                ) : session.user.role === "admin" ? (
                  <>
                    <Link href="/dashboard/admin">
                      <Button
                        color="primary"
                        size="lg"
                        endContent={<ArrowRight size={18} />}
                      >
                        Admin Dashboard
                      </Button>
                    </Link>

                    <Link href="/dashboard/admin/manage-users">
                      <Button variant="bordered" size="lg">
                        Manage Users
                      </Button>
                    </Link>
                  </>
                ) : null}
              </div>
            </motion.div>

            {/* Chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8,
              }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Chip color="secondary" variant="shadow" size="lg">
                10K+ Tasks
              </Chip>

              <Chip color="primary" variant="shadow" size="lg">
                2.5K Freelancers
              </Chip>

              <Chip color="success" variant="shadow" size="lg">
                $150K Paid
              </Chip>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
            }}
            whileHover={{
              scale: 1.03,
              y: -5,
            }}
          >
            <Card className="max-w-md mx-auto rounded-3xl border border-default-200 bg-white/80 backdrop-blur-xl shadow-2xl p-7">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl">
                  Platform Statistics
                </h3>

                <Chip color="success">
                  Live
                </Chip>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center rounded-2xl bg-default-100 p-4">
                  <div className="flex gap-3 items-center">
                    <BriefcaseBusiness
                      className="text-primary"
                      size={20}
                    />
                    <span>Open Tasks</span>
                  </div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="font-bold text-lg"
                  >
                    125
                  </motion.span>
                </div>

                <div className="flex justify-between items-center rounded-2xl bg-default-100 p-4">
                  <div className="flex gap-3 items-center">
                    <Users
                      className="text-primary"
                      size={20}
                    />
                    <span>Freelancers</span>
                  </div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="font-bold text-lg"
                  >
                    2.5K
                  </motion.span>
                </div>

                <div className="flex justify-between items-center rounded-2xl bg-default-100 p-4">
                  <div className="flex gap-3 items-center">
                    <DollarSign
                      className="text-success"
                      size={20}
                    />
                    <span>Total Paid</span>
                  </div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="font-bold text-lg"
                  >
                    $150K
                  </motion.span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>   
      </div>
    </section>
  );
}