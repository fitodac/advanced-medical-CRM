/** @type {import('tailwindcss').Config} */

import twUiKit from './src/twUiKit/'


export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [twUiKit],
}

