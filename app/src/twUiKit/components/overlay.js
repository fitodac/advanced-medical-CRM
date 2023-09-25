const theme = require('tailwindcss/defaultTheme')
const MEDIA = require('./mediaqueries')

const OPTIONS = {
	'.overlay': {},
	'input[type=checkbox]:checked + .overlay': {},
	'input[type=radio]:checked + .overlay': {}
}


const BASE = {
	OVERLAY: {
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
		'z-index': 99,
		...MEDIA.query('xl', {'padding': 0}),

		ACTIVE: {
			'opacity': 1,
			'visibility': 'visible',
			'pointer-events': 'auto'
		}
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({ ['.overlay']: { ...BASE.OVERLAY, ...options['.overlwy'] } })
	addComponents({ ['input[type=checkbox]:checked + .overlay']: { ...BASE.OVERLAY.ACTIVE, ...options['input[type=checkbox]:checked + .overlay'] } })
	addComponents({ ['input[type=radio]:checked + .overlay']: { ...BASE.OVERLAY.ACTIVE, ...options['input[type=radio]:checked + .overlay'] } })
}



module.exports = { OPTIONS, COMPONENTS }