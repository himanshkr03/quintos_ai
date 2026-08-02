// File: E:\quintos_ai\components\dashboard\ai\RecentChats.tsx

const chats = [
  "AI Medical Assistant",
  "Resume Analyzer",
  "Financial Chatbot",
  "Research Assistant",
  "Customer Support Bot",
];

export default function RecentChats() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Recent Chats
      </h2>

      <div className="space-y-3">
        {chats.map((chat) => (
          <div
            key={chat}
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-500 hover:bg-slate-50"
          >
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
}