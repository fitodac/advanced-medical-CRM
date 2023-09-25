const theme = require('tailwindcss/defaultTheme')


const CONTENT_UTILITIES = {
	'.content': {
		'& h1': { fontSize: theme.fontSize['5xl'], lineHeight: 1 },
		'& h2': { fontSize: theme.fontSize['4xl'], lineHeight: 1 },
		'& h3': { fontSize: theme.fontSize['3xl'], lineHeight: 1 },
		'& h4': { fontSize: theme.fontSize['2xl'], lineHeight: 1 },
		'& h5': { fontWeight: theme.fontWeight.bold },

		'& p + p': { marginTop: theme.spacing[8] },

		'& ul': { listStyleType: 'disc' },
		'& ol': { listStyleType: 'decimal' },

		'& code': { 
			'font-size': theme.fontSize.sm[0],
			'line-height': 1,
			'letter-spacing': theme.letterSpacing.tight
		},

		'& pre': {
			'font-size': theme.fontSize.sm[0],
			'letter-spacing': theme.letterSpacing.tight,
			'white-space': 'pre',
			'padding': `${theme.spacing[3]} ${theme.spacing[5]}`,
			'border-radius': theme.borderRadius.lg,
		}
	}
}


module.exports = { CONTENT_UTILITIES }