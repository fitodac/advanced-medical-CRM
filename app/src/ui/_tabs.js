const theme = require('tailwindcss/defaultTheme')

const TABS_STYLE_BASE = {
	NAV: {
		'white-space': 'nowrap',
		'display': 'block',
		'position': 'relative',
		'overflow-x': 'auto',
		'z-index': theme.zIndex[10],
		'-ms-overflow-style': 'none',  /* IE and Edge */
		'scrollbar-width': 'none'
	},

	ITEM: {
		'border-bottom-width': '1px',
		'font-weight': theme.fontWeight.normal,
		'padding': theme.spacing[4],
		'display': 'inline-flex',
		'align-items': 'center',
		'position': 'relative',
		'user-select': 'none',
		'cursor': 'pointer'
	},

	CONTENT: {
		'border-top-width': '1px',
		'top': '-1px',
		'position': 'relative'
	},

	BODY: {
		'padding': theme.spacing[4],
		'display': 'none'
	},

	VERTICAL: {
		'display': 'grid',
		'grid-template-columns': theme.gridTemplateColumns[4],

		ITEM: {
			'border-bottom': 'none',
			'padding': `${theme.spacing[3]} ${theme.spacing[4]}`,
			'display': 'flex'
		},

		CONTENT: {
			'border-top': 'none',
			'top': '0',
			'grid-column': theme.gridColumn['span-3']
		},

		BODY: {
			'padding': `0 ${theme.spacing[7]} ${theme.spacing[7]}`,
		}
	}
}


const TABS_UTILITIES = {
	'.tabs': {

		'.tabs-nav': {
			...TABS_STYLE_BASE.NAV,
			'&::-webkit-scrollbar': { 'display': 'none' },

			'.tab-item': {
				...TABS_STYLE_BASE.ITEM
			}
		},

		'> input[type=radio]': {
			'position': 'absolute',
			'display': 'none'
		},

		'.tabs-content': {
			...TABS_STYLE_BASE.CONTENT,

			'.tab-body': { ...TABS_STYLE_BASE.BODY }
		},


		'&.tabs-vertical': {
			...TABS_STYLE_BASE.VERTICAL,

			'.tabs-nav': {
				'.tab-item': { ...TABS_STYLE_BASE.VERTICAL.ITEM }
			},

			'.tabs-content': { 
				...TABS_STYLE_BASE.VERTICAL.CONTENT,

				'.tab-body': { ...TABS_STYLE_BASE.VERTICAL.BODY }
			},

			// Left
			'input[type=radio] + .tabs-nav .tab-item': { 'border-right-width': '1px' },
			'.tabs-nav + .tabs-content': {
				'border-left-width': '1px',
				'left': '-1px'
			},

			// Right
			'.tabs-content + .tabs-nav .tab-item': { 'border-left-width': '1px' },
			'input[type=radio] + .tabs-content': {
				'border-right-width': '1px',
				'right': '-1px'
			}
		}
	}
}

for(let i = 1; i < 21; i++){
	TABS_UTILITIES['.tabs'][`> input[type=radio]:checked:nth-child(${i}) ~ .tabs-content .tab-body:nth-child(${i})`] = {
		'display': 'block'
	}
}


module.exports = { TABS_UTILITIES }