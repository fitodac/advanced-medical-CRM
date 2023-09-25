const theme = require('tailwindcss/defaultTheme')

const TOAST_STYLE_BASE = {
	BASIC: {
		'border-width': '1px',
		'font-size': theme.fontSize.sm,
		'font-weight': theme.fontWeight.normal,
		'max-width': '300px',
		'padding': `${theme.spacing[2]} ${theme.spacing[3]}`,
		'position': 'fixed',
		'opacity': 0,
		'visibility': 'hidden',
		'border-radius': theme.borderRadius.md,
		'will-change': 'opacity',
		'transition': '.2s ease-in-out',
		'pointer-events': 'none',
		'z-index': 99
	},

	POSITION: {
		'right': theme.spacing[2],
		'bottom': theme.spacing[2],
	},

	ACTIVE: {
		'opacity': 1,
		'visibility': 'visible',
		'pointer-events': 'auto'
	}
}


const TOAST_UTILITIES = {
	'.toast': { 
		...TOAST_STYLE_BASE.BASIC,
		
		'&:not([class*=top-]):not([class*=left-]):not([class*=right-])': { ...TOAST_STYLE_BASE.POSITION }
	},

	'input[type=checkbox]:checked + .toast, input[type=radio]:checked + .toast': {
		...TOAST_STYLE_BASE.ACTIVE
	}
}


module.exports = { TOAST_UTILITIES }