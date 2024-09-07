/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"; // importing daisyui correctly
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { // 'color' should be 'colors'
        bgColor: ' #ffffcc', // Use hex or valid CSS color names
        cardColor: '#f2f2f2',
        seconderyColor: '#99ffbb',
        primaryColor: ' #00e673', // LeafyGreen color as hex (or use 'green' for Tailwind's green)
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
