const theme = require('tailwindcss/defaultTheme')

const OVERLAY_STYLE_BASE = {
	BASIC: {
		'padding': theme.spacing[6],
		'display': 'grid',
		'place-content': 'center',
		'top': 0,
		'right': 0,
		'bottom': 0,
		'left': 0,
		'position': 'fixed',
		'opacity': 0,
		'visibility': 'hidden',
		'transition': '.2s ease-in-out',
		'pointer-events': 'none',
		'will-change': 'opacity',
		'z-index': 99
	},

	ACTIVE: {
		'opacity': 1,
		'visibility': 'visible',
		'pointer-events': 'auto'
	}
}


const OVERLAY_UTILITIES = {
	'.overlay': { ...OVERLAY_STYLE_BASE.BASIC },

	'input[type=checkbox]:checked + .overlay, input[type=radio]:checked + .overlay': {
		...OVERLAY_STYLE_BASE.ACTIVE
	},

	'@media (min-width: 1536px)': {
		'.overlay': { 'padding': 0 }
	}
}


module.exports = { OVERLAY_UTILITIES }