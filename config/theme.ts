// config/theme.ts

export const theme = {
  colors: {
    primary: {
      light: "#60A5FA",
      DEFAULT: "#2563EB",
      dark: "#1D4ED8",
    },

    secondary: {
      light: "#C084FC",
      DEFAULT: "#9333EA",
      dark: "#7E22CE",
    },

    accent: {
      DEFAULT: "#06B6D4",
    },

    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",

    background: "#FFFFFF",
    surface: "#F8FAFC",

    border: "#E5E7EB",

    text: {
      primary: "#111827",
      secondary: "#6B7280",
      muted: "#9CA3AF",
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
    sm: "0 2px 8px rgba(0,0,0,0.06)",
    md: "0 8px 24px rgba(0,0,0,0.10)",
    lg: "0 20px 60px rgba(0,0,0,0.15)",
  },

  container: {
    maxWidth: "1280px",
  },
} as const;

export type Theme = typeof theme;