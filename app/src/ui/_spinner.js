const theme = require('tailwindcss/defaultTheme')


const SPINNER_STYLE_BASE = {
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
		'animation': theme.animation.spin
	}
}

const SPINNER_UTILITIES = {
	'.spinner': {
		...SPINNER_STYLE_BASE.DEFAULT,

		'&::after': {
			...SPINNER_STYLE_BASE.AFTER
		},

		'&.w-3::after, &.w-4::after, &.w-5::after, &.w-6::after': {
			'border-width': theme.borderWidth[2]
		},

		'&:not([class*=border-l-])': {},
	}
}


module.exports = { SPINNER_UTILITIES }