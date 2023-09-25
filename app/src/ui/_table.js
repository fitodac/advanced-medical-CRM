const theme = require('tailwindcss/defaultTheme')

const TABLE_STYLE_BASE = {
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
		TR: {
		},
		TD: {
			'padding': theme.spacing[3],
			'vertical-align': 'top'
		}
	},
	FOOTER: {},
}


const TABLE_UTILITIES = {
	'table.table': {
		'width': '100%',
		// 'border-width': theme.borderWidth.DEFAULT,

		'> thead': {
			...TABLE_STYLE_BASE.HEAD,

			'tr': {...TABLE_STYLE_BASE.HEAD.TR},
			'tr th': {...TABLE_STYLE_BASE.HEAD.TH}
		},

		'> tbody': {
			...TABLE_STYLE_BASE.BODY,

			'tr': {...TABLE_STYLE_BASE.BODY.TR},
			'tr td': {...TABLE_STYLE_BASE.BODY.TD},
		},

		'> tfoot': {
			...TABLE_STYLE_BASE.FOOTER,
		},


		// Table bordered
		'&.table-bordered': {
			'> tbody': {
				'> tr > td': { 'border-top-width': '1px' }
			}
		},


		// Table compact
		'&.table-compact': {
			'> thead': {
				'> tr > th': { 
					'font-size': theme.fontSize.sm[0],
					'line-height': theme.fontSize.sm[1].lineHeight,
					'padding': `${theme.spacing[1.5]} ${theme.spacing[3]}`,
				}
			},

			'> tbody': {
				'> tr > td': { 
					'font-size': theme.fontSize.sm[0],
					'line-height': theme.fontSize.sm[1].lineHeight,
					'padding': `${theme.spacing[1.5]} ${theme.spacing[3]}`,
				}
			}
		},

	}
}


module.exports = { TABLE_UTILITIES }