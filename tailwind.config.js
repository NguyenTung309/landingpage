/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00C9A7',
        dark: '#0D1117',
        card: '#1A1F2C',
      },
      borderRadius: {
        'card': '12px',
        'button': '24px',
      }
    },
  },
  plugins: [],
}
