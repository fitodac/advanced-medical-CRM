const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.badge': {},
	'.dot-badge': {}
}


const BASE = {
	BADGE: {
		'border-width': theme.borderWidth.DEFAULT,
		'font-size': theme.fontSize.xs[0],
		'font-weight': theme.fontWeight.medium,
		'line-height': theme.fontSize.xs[1],
		'padding': `${theme.spacing[0.5]} ${theme.spacing[2]} ${theme.spacing[1]}`,
		'border-radius': theme.borderRadius.DEFAULT,
		'user-select': 'none'
	},

	DOT_BADGE: {
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


const COMPONENTS = (addComponents, options) => {
	addComponents({ ['.badge']: { ...BASE.BADGE, ...options['.badge'] } })
	addComponents({ ['.dot-badge']: { ...BASE.DOT_BADGE, ...options['.dot-badge'] } })
}



module.exports = { OPTIONS, COMPONENTS }