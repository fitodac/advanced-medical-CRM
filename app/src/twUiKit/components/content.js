const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.content h1': {},
	'.content h2': {},
	'.content h3': {},
	'.content h4': {},
	'.content h5': {},
	'.content p + p': {},
	'.content ul': {},
	'.content ol': {},
	'.content code': {},
	'.content pre': {},
}


const BASE = {
	H1: { fontSize: theme.fontSize['5xl'], lineHeight: 1 },
	H2: { fontSize: theme.fontSize['4xl'], lineHeight: 1 },
	H3: { fontSize: theme.fontSize['3xl'], lineHeight: 1 },
	H4: { fontSize: theme.fontSize['2xl'], lineHeight: 1 },
	H5: { fontWeight: theme.fontWeight.bold },

	P_P: { marginTop: theme.spacing[8] },

	UL: { listStyleType: 'disc' },
	OL: { listStyleType: 'decimal' },
	
	CODE: {
		'font-size': theme.fontSize.sm[0],
		'line-height': 1,
		'letter-spacing': theme.letterSpacing.tight
	},

	PRE: {
		'font-size': theme.fontSize.sm[0],
		'letter-spacing': theme.letterSpacing.tight,
		'white-space': 'pre',
		'padding': `${theme.spacing[3]} ${theme.spacing[5]}`,
		'border-radius': theme.borderRadius.lg,
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.content']: {
			['h1']: {...BASE.H1, ...options['.content h1']},
			['h2']: {...BASE.H2, ...options['.content h2']},
			['h3']: {...BASE.H3, ...options['.content h3']},
			['h4']: {...BASE.H4, ...options['.content h4']},
			['h5']: {...BASE.H5, ...options['.content h5']},
			['p + p']: {...BASE.P_P, ...options['.content p+p']},
			['ul']: {...BASE.UL, ...options['.content ul']},
			['ol']: {...BASE.OL, ...options['.content ol']},
			['code']: {...BASE.CODE, ...options['.content code']},
			['pre']: {...BASE.PRE, ...options['.content pre']}
		}
	})
}


module.exports = { OPTIONS, COMPONENTS }