/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        ShohojPay: {
          primary: "#414CDA",

          secondary: "#7233F0",

          accent: "#07c417",

          neutral: "#241E2A",

          "base-100": "#F1F1F1",

          info: "#728ADA",

          success: "#23E792",

          warning: "#F7C655",

          error: "#EC5569",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
