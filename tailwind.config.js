module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkest: "#1e2428",
        grayest: "#828689",
        light: "#f1f1f2",
      },
    },
  },
  variants: {},
  plugins: [],
};
