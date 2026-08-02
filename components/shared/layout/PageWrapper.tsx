import { ReactNode } from "react";
import clsx from "clsx";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({
  children,
  className,
}: PageWrapperProps) {
  return (
    <main
      className={clsx(
        "min-h-screen bg-white py-24",
        className
      )}
    >
      {children}
    </main>
  );
}