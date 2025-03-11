/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'plusjakarta': ['PlusJakartaSans', 'sans-serif'], // Define Tailwind utility class
      },
    },
  },
  plugins: [],
};
