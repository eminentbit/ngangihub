// components/Settings/SettingsPayment.tsx
import { CreditCard } from "lucide-react";

export default function SettingsPayment() {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Add payment methods to make contributions to your groups.
      </p>
      <div className="space-y-4 mb-6">
        <div className="border dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-md">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expires 12/2025
              </p>
            </div>
          </div>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs rounded-full">
            Default
          </span>
        </div>
        <button
          type="button"
          className="btn btn-secondary w-full flex items-center justify-center gap-2"
          onClick={() => alert("Opening payment method form...")}
        >
          <CreditCard className="h-4 w-4" />
          <span>Add New Payment Method</span>
        </button>
      </div>
    </div>
  );
}