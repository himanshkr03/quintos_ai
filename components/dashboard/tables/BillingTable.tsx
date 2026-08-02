// File: E:\quintos_ai\components\dashboard\tables\BillingTable.tsx

const invoices = [
  {
    id: "#INV-1001",
    amount: "$29.00",
    date: "01 Aug 2026",
    status: "Paid",
  },
  {
    id: "#INV-1002",
    amount: "$29.00",
    date: "01 Jul 2026",
    status: "Paid",
  },
  {
    id: "#INV-1003",
    amount: "$29.00",
    date: "01 Jun 2026",
    status: "Paid",
  },
];

export default function BillingTable() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Billing History
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th className="py-3 text-left">Invoice</th>
              <th className="py-3 text-left">Amount</th>
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b last:border-none"
              >
                <td className="py-4">{invoice.id}</td>
                <td className="py-4">{invoice.amount}</td>
                <td className="py-4">{invoice.date}</td>
                <td className="py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}