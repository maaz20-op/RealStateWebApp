const token = (n) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"), surface: token("surface"), ink: token("ink"),
        muted: token("muted"), line: token("line"),
        accent: token("accent"), "accent-ink": token("accent-ink"),
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: { lift: "0 18px 40px -22px rgb(var(--ink) / 0.35)" },
    },
  },
  plugins: [],
};
