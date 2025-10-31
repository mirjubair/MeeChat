/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      colors: {
        'code-bg': '#0b0f14',
        'code-panel': '#0f1720',
        'accent': '#00e6a8',
        'muted': '#7b8a94'
      }
    }
  },
  plugins: []
};
