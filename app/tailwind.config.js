/** @type {import('tailwindcss').Config} */

import twUiKit from './src/twUiKit/'


export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
  theme: {
    extend: {
			colors: {
				primary: {
					DEFAULT: '#34569d'
				},
				secondary: {
					DEFAULT: '#cead2d'
				},
				teal: {
					DEFAULT: '#00a6af'
				}
			}
		},
  },
  plugins: [
		twUiKit({
			'.tabs .tabs-content .tab-body': {
				'padding': 0
			}
		})
	],
}

