import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
        src="/logos/logo-horizontal.svg"
        alt="Quintos AI"
        width={180}
        height={30}
        priority
      />
    </Link>
  );
}