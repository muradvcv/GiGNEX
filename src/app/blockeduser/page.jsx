import Link from "next/link";

export default function BlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🚫</div>

        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Account Blocked
        </h1>

        <p className="text-gray-600 mb-6">
          Your account has been blocked by the administrator.
          Please contact support for more information.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-cyan-500 text-white rounded-xl font-medium hover:bg-cyan-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}