module.exports = {
  purge: ["./src/**/*.js"],
  darkMode: false,
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
