const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
const toColorValue = require('tailwindcss/lib/util/toColorValue')
const scroll_bar = require('../components/scroll-bar')


const SCROLLBAR_SIZE_BASE = {
	'scrollbar-color': 'var(--scrollbar-thumb, initial) var(--scrollbar-track, initial)',
	'overflow': 'auto',

	...Object.fromEntries(scroll_bar.COMPONENTS.map(component => {
		const base = `&::-webkit-scrollbar-${component}`

		return [
			[base, {
				'background-color': `var(--scrollbar-${component})`,
				'border-radius': `var(--scrollbar-${component}-radius)`
			}],
			[`${base}:hover`, {
				'background-color': `var(--scrollbar-${component}-hover, var(--scrollbar-${component}))`
			}],
			[`${base}:active`, {
				'background-color': `var(--scrollbar-${component}-active, var(--scrollbar-${component}-hover, var(--scrollbar-${component})))`
			}]
		]
	}).flat())
}


const SCROLLBAR_SIZE_UTILITIES = (addUtilities) => {
	addUtilities({
		'.scrollbar': {
			...SCROLLBAR_SIZE_BASE,
			'scrollbar-width': 'auto',

			'&::-webkit-scrollbar': {
				display: 'block',
				width: 'var(--scrollbar-width, 6px)',
				height: 'var(--scrollbar-height, 6px)',
				maxHeight: '100px'
			}
		},

		'.scrollbar-thin': {
			...SCROLLBAR_SIZE_BASE,
			'scrollbar-width': 'thin',

			'&::-webkit-scrollbar': {
				display: 'block',
				width: '4px',
				height: '4px'
			}
		},

		'.scrollbar-none': {
			'scrollbar-width': 'none',

			'&::-webkit-scrollbar': {
				display: 'none'
			}
		}
	})
}


const ADD_COLOR_UTILITIES = ({ matchUtilities, theme }) => {
	const themeColors = flattenColorPalette.default(theme('colors'))
	const colors = Object.fromEntries(
		Object.entries(themeColors).map(([k, v]) => [k, toColorValue.default(v)])
	)

	scroll_bar.COMPONENTS.forEach(component => {
		matchUtilities(
			{
				[`scrollbar-${component}`]: value => {
					const color = toColorValue.default(value)
					return {
						[`--scrollbar-${component}`]: `${color} !important`
					}
				}
			},
			{
				values: colors,
				type: 'color'
			}
		)
	})
}


const ADD_ROUNDED_UTILITIES = ({ theme, matchUtilities }) => {
	scroll_bar.COMPONENTS.forEach(component => {
		matchUtilities(
			{
				[`scrollbar-${component}-rounded`]: value => ({
					[`--scrollbar-${component}-radius`]: value
				})
			},
			{
				values: theme('borderRadius')
			}
		)
	})
}



const ADD_SIZE_UTILITIES = ({ matchUtilities, theme }) => {
	['width', 'height'].forEach(dimension => {
		matchUtilities({
			[`scrollbar-${dimension[0]}`]: value => ({ [`--scrollbar-${dimension}`]: value })
		}, {
			values: theme(dimension)
		})
	})
}


module.exports = { SCROLLBAR_SIZE_UTILITIES, ADD_COLOR_UTILITIES, ADD_ROUNDED_UTILITIES, ADD_SIZE_UTILITIES }