module.exports = {
  purge: ["./src/**/*.js", "./src/*.html"],
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
