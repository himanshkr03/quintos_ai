import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  isLink?: boolean;
}

export default function Logo({ className = "", isLink = true }: LogoProps) {
  const content = (
    <div
      className={`relative inline-flex items-center justify-start shrink-0 h-[34px] sm:h-[36px] md:h-[42px] lg:h-[44px] overflow-hidden ${className}`}
    >
      <Image
        src="/logos/logo-horizontal.svg"
        alt="Quintos AI"
        width={300}
        height={200}
        className="h-full w-auto max-h-full object-contain object-left block select-none"
        style={{
          width: "auto",
          height: "100%",
          maxHeight: "100%",
        }}
        priority
      />
    </div>
  );

  if (!isLink) {
    return content;
  }

  return (
    <Link
      href="/"
      className="inline-flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 rounded-lg"
      aria-label="Quintos AI Homepage"
    >
      {content}
    </Link>
  );
}