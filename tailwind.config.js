/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-stone-200',
    'bg-stone-600',
    'bg-yellow-300',
    'bg-yellow-500',
  ],
  plugins: [],
};
