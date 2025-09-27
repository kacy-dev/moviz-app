// // // /** @type {import('tailwindcss').Config} */
// // // module.exports = {
// // //   content: [],
// // //   theme: {
// // //     extend: {},
// // //   },
// // //   plugins: [],
// // // }


// // /** @type {import('tailwindcss').Config} */
// // module.exports = {
// //   // NOTE: Update this to include the paths to all files that contain Nativewind classes.
// //   content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
// //   presets: [require("nativewind/preset")],
// //   theme: {
// //     extend: {},
// //   },
// //   plugins: [],
// // }

//     /** @type {import('tailwindcss').Config} */
//     module.exports = {
//       content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
//       presets: [require("nativewind/preset")],
//       theme: {
//         extend: {},
//       },
//       plugins: [],
//     };



// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primary: {
            light: "#6ee7b7",
            default: "#10b981",
            dark: "#065f46",
            deep: "#0D1F29",
            fair: "#23AA48",
            ligh: "#EEA925",
            lig: "#F8E4BC",
            li: "#FDE9C0",
          },
          accent: {
            light: "#840B10",
            DEFAULT: "#97374E",
            dark: "#4c0519",
            ligh: "#8C2239",
            ll: "#840B10"
          },
          gray: {
            100: "#f5f6f7",
            200: "#e4e4e7",
            300: "#d4d4d8",
            400: "#a1a1aa",
            500: "#71717a",
            600: "#52525b",
            700: "#3f3f46",
            800: "#27272a",
            900: "#18181b"
          }
        },
        fontSize: {
          xs: ["12px", { lineHeight: "18px" }],
          sm: ["14px", { lineHeight: "20px" }],
          base: ["16px", { lineHeight: "24px" }],
          md: ["15px", { lineHeight: "22px" }],
          lg: ["20px", { lineHeight: "28px" }],
          xl: ["30px", { lineHeight: "36px" }],
          "2xl": ["40px", { lineHeight: "48px" }]
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800
        }
      }
    },
    plugins: []
  };