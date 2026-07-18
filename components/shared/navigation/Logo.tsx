import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
        Q
      </div>

      <div className="flex flex-col">
        <span className="font-space-grotesk text-xl font-bold">
          Quintos AI
        </span>

        <span className="text-xs text-gray-500">
          Intelligence • Innovation
        </span>
      </div>
    </Link>
  );
}