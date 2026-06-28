import Link from "next/link";
import { XCircle, RotateCcw } from "lucide-react";

export default function CancelPaymentPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        <XCircle
          size={80}
          className="mx-auto text-red-500"
        />

        <h1 className="mt-6 text-3xl font-bold text-slate-800">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-slate-600">
          Your payment was cancelled. No money has been
          charged to your account.
        </p>

        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">
            ❌ The payment process was not completed.
          </p>

          <p className="mt-2 text-sm text-red-700">
            You can try again whenever you are ready.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard/client/tasks"
            className="flex-1 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Tasks
          </Link>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw size={18} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}