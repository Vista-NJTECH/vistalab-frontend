/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-light": "#82C3EC",
        "theme-dark": "#3173E9",
      },
      backgroundImage: {
        work: "url('../data/images/work.png')",
      },
    },
  },
  plugins: [],
};
