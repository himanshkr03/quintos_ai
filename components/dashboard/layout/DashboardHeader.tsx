// File: E:\quintos_ai\components\dashboard\layout\DashboardHeader.tsx

"use client";

import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div className="flex items-center gap-4 rounded-xl border bg-slate-50 px-4 py-2">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-xl p-2 hover:bg-slate-100">
          <Bell size={22} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          H
        </div>
      </div>
    </header>
  );
}