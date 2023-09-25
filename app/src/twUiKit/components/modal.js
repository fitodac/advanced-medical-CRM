const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.modal': {},
	'input[type=checkbox]:checked + .overlay > .modal': {},
	'input[type=radio]:checked + .overlay > .modal': {}
}


const BASE = {
	MODAL: {
		'top': theme.spacing[8],
		'position': 'relative',
		'opacity': 0,
		'border-radius': theme.borderRadius.xl,
		'transition': '.2s ease-in-out'
	},

	INPUT: {
		OVERLAY: {
			MODAL: {
				'top': 0,
				'opacity': 1,
				'transition-delay': theme.transitionDelay[75]
			}
		}
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({ ['.modal']: { ...BASE.MODAL, ...options['.modal'] } })
	addComponents({ ['input[type=checkbox]:checked + .overlay > .modal']: { ...BASE.INPUT.OVERLAY.MODAL, ...options['input[type=checkbox]:checked + .overlay > .modal'] } })
	addComponents({ ['input[type=radio]:checked + .overlay > .modal']: { ...BASE.INPUT.OVERLAY.MODAL, ...options['input[type=radio]:checked + .overlay > .modal'] } })
}



module.exports = { OPTIONS, COMPONENTS }