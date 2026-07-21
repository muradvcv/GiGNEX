"use client";

import Link from "next/link";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full px-6">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <AlertCircle size={48} className="text-gray-400" strokeWidth={1.5} />
        </div>
        {/* Error Code */}
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-gray-500 tracking-wide mb-2">
            ERROR
          </p>
          <h1 className="text-5xl font-light text-gray-900">404</h1>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-3">
          Page Not Found
        </h2>
        {/* Description */}
        <p className="text-gray-600 text-center text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved. Let
          get you back on track.
        </p>

        {/* Actions */}
        <div className="space-y-3 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            <Home size={16} />
            Return to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6"></div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center">
          SkillSwap Freelance Platform
        </p>
      </div>
    </div>
  );
}