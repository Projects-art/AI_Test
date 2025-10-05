export const lightTheme = {
  colors: {
    primary: "#4F46E5",
    secondary: "#10B981",
    background: "#FFFFFF",
    text: "#111827",
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  borderRadius: "12px",
  shadow: "0 4px 12px rgba(0,0,0,0.1)",
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    primary: "#6366F1",
    secondary: "#34D399",
    background: "#111827",
    text: "#F9FAFB",
  },
};
