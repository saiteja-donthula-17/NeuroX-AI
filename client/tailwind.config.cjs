/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }) {
      const colors = theme("colors");
      const variables = {};

      // Flatten color palette to generate CSS variables
      Object.entries(colors).forEach(([color, value]) => {
        if (typeof value === "object") {
          Object.entries(value).forEach(([shade, hex]) => {
            variables[`--${color}-${shade}`] = hex;
          });
        } else {
          variables[`--${color}`] = value;
        }
      });

      // Add CSS variables to the :root selector
      addBase({
        ":root": variables,
      });
    },
  ],
};
