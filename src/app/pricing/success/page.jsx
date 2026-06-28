import { postPayment } from '@/lib/actions/payment'
import { stripe } from '@/lib/stripe'
import { CircleDollarSign } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    metadata,
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  console.log(metadata,'metaaaaaaaaaa');
  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    // api call kore data send
    await postPayment({...metadata,session_id})
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
          {/* Top Icon */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CircleDollarSign
                size={36}
                className="text-green-600"
              />
            </div>

            <h1 className="mt-4 text-2xl font-bold text-slate-800">
              Payment Successful
            </h1>

            <p className="mt-1 text-center text-sm text-slate-500">
              Your payment has been processed successfully.
            </p>
          </div>

          {/* Payment Info */}
          <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">From</span>
              <span className="font-semibold">
                {metadata.clientName}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">To</span>
              <span className="font-semibold">
                {metadata.freelancerName}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Amount</span>
              <span className="font-bold text-green-600">
                ${metadata.amount}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Session ID
              </span>

              <span className="max-w-[180px] truncate font-medium text-slate-700">
                {session_id || "N/A"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Status</span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Paid
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-3 text-center text-sm">
            <span className="font-semibold">
              {metadata.clientName}
            </span>{" "}
            paid{" "}
            <span className="font-bold text-green-600">
              ${metadata.amount}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {metadata.freelancerName}
            </span>
            .
          </div>

          {/* Button */}
          <Link
            href="/"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-700"
          >
            🏠 Back to Home
          </Link>
        </div>
      </section>
    );
  }
}