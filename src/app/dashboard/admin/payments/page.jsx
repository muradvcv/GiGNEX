import { getAllPaymentdata } from "@/lib/actions/admin";

export default async function AdminPaymentsHistoryPage({
  searchParams,
}) {
  const params = await searchParams;

  const search = (params?.search || "")
    .toString()
    .trim()
    .toLowerCase();

  const res = await getAllPaymentdata();
  const payments = res?.data || [];

  const filteredPayments = payments.filter((payment) => {
    if (!search) return true;

    const clientEmail = (
      payment.clientEmail || ""
    ).toLowerCase();

    const freelancerEmail = (
      payment.freelancerEmail || ""
    ).toLowerCase();

    return (
      clientEmail.includes(search) ||
      freelancerEmail.includes(search)
    );
  });

  const totalRevenue = filteredPayments.reduce(
    (sum, payment) =>
      sum + Number(payment.amount || 0),
    0
  );

  const totalPayments = filteredPayments.length;

  const avgPayment =
    totalPayments > 0
      ? totalRevenue / totalPayments
      : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Payment History
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and monitor all platform payments
          </p>
        </div>

        <form
          method="GET"
          className="flex gap-2"
        >
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by email..."
            className="w-full lg:w-96 px-4 py-3 border rounded-xl"
          />

          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white rounded-xl"
          >
            Search
          </button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500 text-sm">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ${totalRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500 text-sm">
            Total Payments
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {totalPayments}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500 text-sm">
            Average Payment
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            ${avgPayment.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            Transactions History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  Client Email
                </th>

                <th className="px-4 py-3 text-left">
                  Freelancer Email
                </th>

                <th className="px-4 py-3 text-left">
                  Task ID
                </th>

                <th className="px-4 py-3 text-left">
                  Amount
                </th>

                <th className="px-4 py-3 text-left">
                  Payment Date
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    {payment.clientEmail ? (
                      payment.clientEmail
                    ) : (
                      <span className="text-red-500 italic">
                        Email Not Found
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {payment.freelancerEmail ? (
                      payment.freelancerEmail
                    ) : (
                      <span className="text-red-500 italic">
                        Email Not Found
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-xs">
                      {payment.taskId}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-semibold text-green-600">
                    ${payment.amount}
                  </td>

                  <td className="px-4 py-4">
                    {payment.paidAt
                      ? new Date(
                        payment.paidAt
                      ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-500"
                  >
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}