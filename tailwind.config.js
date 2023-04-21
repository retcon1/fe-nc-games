/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts}"],
  important: "#root",
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        light: "#F2EFF0",
        dark: "#231E24",
      },
      colors: {
        "body-color-light": "#231E24",
        "body-color-dark": "#F2EFF0",
        "light-accent": "#8DA0A1",
        "dark-accent": "#B17A4C",
        primary: "#C46E18",
        info: "#231E24",
        success: "#709C3F",
        warning: "#ED8B07",
        danger: "#F44336",
      },
    },
  },
  plugins: [],
};
