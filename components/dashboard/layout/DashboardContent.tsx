// File: E:\quintos_ai\components\dashboard\layout\DashboardContent.tsx

import { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
}

export default function DashboardContent({
  children,
}: DashboardContentProps) {
  return (
    <section className="space-y-8">
      {children}
    </section>
  );
}