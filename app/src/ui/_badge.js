const theme = require('tailwindcss/defaultTheme')
const GLOBALS = require('./_utils')


const BADGE_STYLE_BASE = {
	DEFAULT: {
		'border-width': theme.borderWidth.DEFAULT,
		'font-size': theme.fontSize.xs[0],
		'font-weight': theme.fontWeight.medium,
		'line-height': theme.fontSize.xs[1],
		'padding': `${theme.spacing[0.5]} ${theme.spacing[2]} ${theme.spacing[1]}`,
		'border-radius': theme.borderRadius.DEFAULT,
		'user-select': 'none'
	},

	DOT: {
		'color': 'transparent',
		'font-size': 0,
		'width': theme.spacing[3],
		'height': theme.spacing[3],
		'right': `-${theme.spacing[0.5]}`,
		'top': `-${theme.spacing[0.5]}`,
		'position': 'absolute',
		'overflow': 'hidden',
		'border-radius': theme.borderRadius.full
	}
}

const BADGE_UTILITIES = {
	'.badge': { ...BADGE_STYLE_BASE.DEFAULT },
	'.dot-badge': { ...BADGE_STYLE_BASE.DOT }
}


module.exports = { BADGE_UTILITIES }