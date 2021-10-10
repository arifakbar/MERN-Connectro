module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        screen2: "87vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
