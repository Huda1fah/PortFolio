/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        animation: {
          'spin-slow': 'spin 10s linear infinite',
          'pulse-slow': 'pulse 3s ease-in-out infinite',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }