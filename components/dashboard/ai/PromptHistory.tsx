// File: E:\quintos_ai\components\dashboard\ai\PromptHistory.tsx

const prompts = [
  "Generate a Python API",
  "Explain Quantum Computing",
  "Create a React Dashboard",
  "Summarize this PDF",
  "Generate SQL Query",
];

export default function PromptHistory() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Prompt History
      </h2>

      <div className="space-y-3">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            className="w-full rounded-xl border border-gray-200 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}