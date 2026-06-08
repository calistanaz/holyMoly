/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        card2: "var(--card2)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textTertiary: "var(--text-tertiary)",

        borderPrimary: "var(--border-primary)",
        borderSecondary: "var(--border-secondary)",

        iconPrimary: "var(--icon-primary)",

        accent: "var(--accent)",
      },
    },
  },
  
  plugins: [],
};
