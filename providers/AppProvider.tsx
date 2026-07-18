"use client";

import { ReactNode } from "react";

import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: AppProviderProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}