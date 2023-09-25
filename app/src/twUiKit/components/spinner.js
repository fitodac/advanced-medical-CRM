const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.spinner': {},
	'.spinner::after': {},
	'.spinner.w-3::after': {},
	'.spinner.w-4::after': {},
	'.spinner.w-5::after': {},
	'.spinner.w-6::after': {}
}


const BASE = {
	DEFAULT: {
		'font-weight': theme.fontWeight.medium,
		'line-height': theme.fontSize.xs[1],
		'width': theme.spacing[10],
		'display': 'inline-grid',
		'place-content': 'center',
		'position': 'relative',
		'aspect-ratio': theme.aspectRatio.square
	},

	AFTER: {
		'content': '""',
		'border-left-color': 'inherit !important',
		'border-width': theme.borderWidth[4],
		'width': '100%',
		'position': 'absolute',
		'aspect-ratio': theme.aspectRatio.square,
		'user-select': 'none',
		'border-radius': theme.borderRadius.full,
		'animation': theme.animation.spin,

		W3: { 'border-width': theme.borderWidth[2] },
		W4: { 'border-width': theme.borderWidth[2] },
		W5: { 'border-width': theme.borderWidth[2] },
		W6: { 'border-width': theme.borderWidth[2] },
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.spinner']: {
			...BASE.DEFAULT,
			...options['.spinner'],

			['&::after']: { ...BASE.AFTER, ...options['.spinner::after'] },
			['&.w-3::after']: { ...BASE.AFTER.W3, ...options['.spinner.w-3::after'] },
			['&.w-4::after']: { ...BASE.AFTER.W4, ...options['.spinner.w-4::after'] },
			['&.w-5::after']: { ...BASE.AFTER.W5, ...options['.spinner.w-5::after'] },
			['&.w-6::after']: { ...BASE.AFTER.W6, ...options['.spinner.w-6::after'] }
		}
	})
}



module.exports = { OPTIONS, COMPONENTS }