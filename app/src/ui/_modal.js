const theme = require('tailwindcss/defaultTheme')

const MODAL_STYLE_BASE = {
	BASIC: {
		'top': theme.spacing[8],
		'position': 'relative',
		'opacity': 0,
		'border-radius': theme.borderRadius.xl,
		'transition': '.2s ease-in-out'
	},

	ACTIVE: {
		'top': 0,
		'opacity': 1,
		'transition-delay': theme.transitionDelay[75]
	}
}


const MODAL_UTILITIES = {
	'.modal': { ...MODAL_STYLE_BASE.BASIC },

	'input[type=checkbox]:checked + .overlay > .modal, input[type=radio]:checked + .overlay > .modal': {
		...MODAL_STYLE_BASE.ACTIVE
	}
}


module.exports = { MODAL_UTILITIES }