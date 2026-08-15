import { User, Mail, Shield, Building } from "lucide-react";

export const metadata = {
  title: "Profile | Quintos AI",
  description: "Manage your Quintos AI account profile and preferences.",
};

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your personal information, contact email, and workspace roles.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-md">
            H
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Himanshu Rajak</h2>
            <p className="text-sm text-gray-500">Lead AI Engineer • Administrator</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-gray-500">Full Name</span>
              <p className="text-sm font-semibold text-gray-900">Himanshu Rajak</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-gray-500">Email Address</span>
              <a
                href="mailto:contact.quintosresearch@gmail.com"
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors block"
              >
                contact.quintosresearch@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-gray-500">Organization</span>
              <p className="text-sm font-semibold text-gray-900">Quintos AI Enterprise</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <span className="text-xs font-medium text-gray-500">Access Level</span>
              <p className="text-sm font-semibold text-gray-900">Workspace Owner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}