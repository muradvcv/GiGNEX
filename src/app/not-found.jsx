"use client";

import Link from "next/link";
import { SearchX, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-50 ">
      <div className="max-w-xl w-full text-center">
        {/* Icon */}
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-cyan-100 shadow-lg">
          <SearchX size={56} className="text-cyan-600" />
        </div>

        {/* 404 */}
        <h1 className="mt-8 text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-500 to-blue-800 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
          Oops! Page Not Found
        </h2>

        <p className="mt-4 text-gray-500 text-lg leading-relaxed">
          The page youre looking for doesnt exist, has been removed,
          or is temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-white font-semibold shadow-md hover:bg-cyan-600 transition-all duration-300"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-sm text-gray-400">
          SkillSwap • Freelance Micro-Task Platform
        </div>
      </div>
    </div>
  );
}