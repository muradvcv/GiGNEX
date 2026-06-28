import { getPaymentByClient } from "@/lib/actions/payment";
import { getUserForServer } from "@/lib/user/getuser";
import { Card } from "@heroui/react";

const ClientPayment = async () => {
  const session = await getUserForServer();
  const clientId = session?.user?.id;

  if (!clientId) {
    return (
      <div className="text-center text-red-500 mt-10">
        User not found / not logged in
      </div>
    );
  }

  const result = await getPaymentByClient(clientId);
  const payments = result?.data || [];

  const totalAmount = payments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/*  TOP CARDS */}
      <div className="grid grid-cols-1">
        <Card className="p-6 border border-cyan-200 bg-cyan-50 shadow-sm rounded-xl">

          {/* TOP TITLE */}
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-cyan-600 font-medium">
                Payment Overview
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                Your Earnings Dashboard
              </h2>
            </div>

            {/* ICON DOT */}
            <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
              <span className="text-cyan-600 font-bold">$</span>
            </div>

          </div>

          {/* STATS ROW */}
          <div className="grid grid-cols-2 gap-6 mt-6">

            {/* LEFT */}
            <div className="bg-white p-4 rounded-lg border border-cyan-100">
              <p className="text-xs text-gray-500">Total Payments</p>
              <h3 className="text-2xl font-bold text-cyan-600 mt-1">
                {payments.length}
              </h3>
            </div>

            {/* RIGHT */}
            <div className="bg-white p-4 rounded-lg border border-cyan-100">
              <p className="text-xs text-gray-500">Total Earned</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                ${totalAmount}
              </h3>
            </div>

          </div>

          {/* FOOTER TEXT */}
          <p className="text-xs text-gray-500 mt-4">
            All your payment statistics in one place
          </p>

        </Card>
      </div>

      {/*  TABLE */}
      <Card className="shadow-xl border border-gray-100 rounded-2xl">

        {/* HEADER */}
        <div className="border-b px-6 py-4 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">
            💰 Payment History
          </h2>
        </div>

        <div className="p-4">
          {payments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No payment history found.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg">

              <table className="w-full text-sm text-left border-collapse">

                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                    <th className="p-3">#</th>
                    <th className="p-3">Task ID</th>
                    <th className="p-3">Freelancer</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Paid At</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{payment.taskId}</td>
                      <td className="p-3">{payment.freelancerName}</td>
                      <td className="p-3">{payment.freelancerEmail}</td>
                      <td className="p-3 font-bold text-green-600">
                        ${payment.amount}
                      </td>
                      <td className="p-3">
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                          Paid
                        </span>
                      </td>
                      <td className="p-3">
                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ClientPayment;