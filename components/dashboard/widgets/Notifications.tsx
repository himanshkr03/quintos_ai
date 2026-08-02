// File: E:\quintos_ai\components\dashboard\widgets\Notifications.tsx

import {
  Bell,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const notifications = [
  {
    title: "API Usage Updated",
    type: "success",
  },
  {
    title: "New AI Model Available",
    type: "info",
  },
  {
    title: "Billing Due in 3 Days",
    type: "warning",
  },
];

export default function Notifications() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Bell className="text-blue-600" />

        <h2 className="text-xl font-bold">
          Notifications
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.title}
            className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
          >
            {notification.type === "success" && (
              <CheckCircle className="text-green-600" size={20} />
            )}

            {notification.type === "warning" && (
              <AlertTriangle className="text-orange-500" size={20} />
            )}

            {notification.type === "info" && (
              <Bell className="text-blue-600" size={20} />
            )}

            <p>{notification.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}