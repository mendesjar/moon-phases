/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          950: "rgba(4,0,53,1)",
        },
      },
      backgroundImage: {
        main: "radial-gradient(circle, rgba(8,0,116,1) 0%, rgba(4,0,53,1) 100%)",
      },
      boxShadow: {
        main: "inset 0px 0px 10px 0px rgba(255,255,255,1), inset 0px -24px 60px 0px rgba(255,255,255,0.22), inset 0px 8px 24px -16px rgba(255,255,255,0.15);",
      },
    },
  },
  plugins: [],
};
