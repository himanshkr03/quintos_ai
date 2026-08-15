// config/theme.ts

export const theme = {
  colors: {
    primary: {
      light: "#60A5FA",
      DEFAULT: "#2563EB",
      dark: "#1D4ED8",
    },

    secondary: {
      light: "#A78BFA",
      DEFAULT: "#7C3AED",
      dark: "#6D28D9",
    },

    accent: {
      DEFAULT: "#06B6D4",
    },

    success: "#16A34A",
    warning: "#F59E0B",
    error: "#DC2626",

    background: "#FFFFFF",
    surface: "#F8FAFC",
    border: "#E2E8F0",

    text: {
      primary: "#0F172A",
      secondary: "#475569",
      muted: "#64748B",
      white: "#FFFFFF",
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "48px",
    "4xl": "64px",
    "5xl": "96px",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },

  shadow: {
    subtle: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
    card: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
    elevated: "0 20px 40px -15px rgba(37, 99, 235, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)",
  },

  container: {
    maxWidth: "1280px",
  },
} as const;

export type Theme = typeof theme;