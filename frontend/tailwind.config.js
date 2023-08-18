/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: "#00EAD3",
        "teal-600": "#0d9488",
        "teal-400": "#2dd4bf",
        pink: "#F54298",
        "pink-300": "#F06292",
        "pink-700": "#be185d",
        "pine-green": "#00695E",
        "regal-blue": "#004069",
        "light-primary": "var(--background-light-primary, #FFF);",
      },
      fontFamily: {
        satoshi: ["Quicksand", "Pacifico"],
        pacifico: ["Pacifico", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      typography: (theme) => ({
        default: {
          css: {
            fontFamily: {
              pacifico: "pacifico, sans-serif",
              quicksand: "quicksand, sans-serif",
            },
            fontFeatureSettings: {
              pacifico: "'clig' off, 'liga' off",
              quicksand: "'clig' off, 'liga' off",
            },
          },
        },
      }),
      letterSpacing: {
        widest: ".298px",
      },
      lineHeight: {
        loose: "98px",
      },
      boxShadow: {
        "3xl":
          "0px 5px 5px 0px rgba(2, 3, 3, 0.04), 0px 3px 14px 0px rgba(2, 3, 3, 0.02), 0px 8px 10px 0px rgba(2, 3, 3, 0.03)",
      },
      height: {
        "229": "229.978px",
        "113.12": "113.12px",
        "550": "550px",
      },
      width: {
        "500": "500px",
      },
      borderRadius: {
        "1337.728": "1337.728px"
      },
      backgroundColor: {
        'kid': 'rgba(255, 255, 255, 0.80)',
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(50% 50.00% at 50% 50.00%, #00EAD3 0%, rgba(0, 234, 211, 0.00) 100%)",
        kid: "url(/assets/kid.svg)",
        ellipse: "url(/assets/bg_ellipse.png)",
        flower: "url(/assets/bg_flower.png)",
        education: "url('/assets/education.svg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities, addComponents }) {
      addComponents({
        ".card": {
          width: "248px",
          height: "248px",
          borderRadius: "0.6rem",
          backgroundColor: "var(--background-light-primary, #FFF);",
          boxShadow:
            "0px 5px 5px 0px rgba(2, 3, 3, 0.04), 0px 3px 14px 0px rgba(2, 3, 3, 0.02), 0px 8px 10px 0px rgba(2, 3, 3, 0.03);",
        },
        ".text": {
          fontFamily: "quicksand",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: "500px",
          lineHeight: "normal",
          letterSpacing: "0.393px",
        },
      });
    }),
  ],
};
