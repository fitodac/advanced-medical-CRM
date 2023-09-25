const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.table': {},
	'.table > thead': {},
	'.table > thead > tr': {},
	'.table > thead > tr > th': {},
	'.table > tbody > tr': {},
	'.table > tbody > tr > td': {},
	'.table > tfoot': {},
	'.table-bordered > tbody > tr > td': {},
	'.table-compact > thead > tr > th': {},
	'.table-compact > tbody > tr > td': {},
}


const BASE = {
	TABLE: {
		'width': '100%',

		HEAD: {
			'user-select': 'none',

			TR: {},
			TH: {
				'font-weight': theme.fontWeight.medium,
				'text-align': 'left',
				'padding': theme.spacing[3],
				'vertical-align': 'top'
			}
		},
		BODY: {
			TD: {
				'padding': theme.spacing[3],
				'vertical-align': 'top'
			}
		},
		FOOTER: {},
		BORDERED: {
			BODY: {
				TD: { 'border-top-width': '1px' }
			}
		},
		COMPACT: {
			THEAD: {
				TH: {
					'font-size': theme.fontSize.sm[0],
					'line-height': theme.fontSize.sm[1].lineHeight,
					'padding': `${theme.spacing[1.5]} ${theme.spacing[3]}`
				}
			},
			BODY: {
				TD: {
					'font-size': theme.fontSize.sm[0],
					'line-height': theme.fontSize.sm[1].lineHeight,
					'padding': `${theme.spacing[1.5]} ${theme.spacing[3]}`
				}
			}
		}
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['table.table']: {
			...BASE.TABLE,
			...options['.table'],

			['> thead']: {
				...BASE.TABLE.HEAD, 
				...options['.table > thead'],

				['> tr']: { ...BASE.TABLE.HEAD.TR, ...options['.table > thead > tr'] },
				['> tr > th']: { ...BASE.TABLE.HEAD.TH, ...options['.table > thead > tr > th'] },
			},

			['> tbody']: {
				['> tr']: { ...BASE.TABLE.BODY.TR, ...options['.table > tbody > tr'] },
				['> tr > td']: { ...BASE.TABLE.BODY.TD, ...options['.table > tbody > tr > td'] }
			},

			['> tfoot']: { ...BASE.TABLE.FOOTER, ...options['.table > tfoot'] }
		}
	})

	addComponents({
		['table.table.table-bordered']: {
			['> tbody']: {
				['> tr > td']: { ...BASE.TABLE.BORDERED.BODY.TD, ...options['.table-bordered > tbody > tr > td'] }
			}
		}
	})

	addComponents({
		['table.table.table-compact']: {
			['> thead']: {
				['> tr > th']: { ...BASE.TABLE.COMPACT.THEAD.TH, ...options['.table-compact > thead > tr > th'] }
			},

			['> tbody']: {
				['> tr > td']: { ...BASE.TABLE.COMPACT.BODY.TD, ...options['.table-compact > tbody > tr > td'] }
			}
		}
	})
}



module.exports = { OPTIONS, COMPONENTS }