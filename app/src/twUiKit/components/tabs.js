const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.tabs .tabs-nav': {},
	'.tabs .tabs-nav::-webkit-scrollbar': {},
	'.tabs .tabs-nav .tab-item': {},
	'.tabs > input[type=radio]': {},
	'.tabs .tabs-content': {},
	'.tabs .tabs-content .tab-body': {},
	'.tabs.tabs-vertical': {},
	'.tabs-vertical': {},
	'.tabs-vertical .tabs-nav .tab-item': {},
	'.tabs-vertical .tabs-content': {},
	'.tabs-vertical .tabs-content .tab-body': {},
	'.tabs-vertical input[type=radio] + .tabs-nav .tab-item': {},
	'.tabs-vertical .tabs-nav + .tab-content': {},
	'.tabs-vertical .tabs-content + .tabs-nav .tab-item': {},
	'.tabs-vertical input[type=radio] + .tabs-content': {},
}


const BASE = {
	TABS: {
		NAV: {
			'white-space': 'nowrap',
			'display': 'block',
			'position': 'relative',
			'overflow-x': 'auto',
			'z-index': theme.zIndex[10],
			'-ms-overflow-style': 'none',  /* IE and Edge */
			'scrollbar-width': 'none',

			SCROLLBAR: { 'display': 'none' },
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
		},
		RADIO: {
			'position': 'absolute',
			'display': 'none'
		},


		CONTENT: {
			'border-top-width': '1px',
			'top': '-1px',
			'position': 'relative',

			BODY: {
				'padding': theme.spacing[4],
				'display': 'none'
			},
		},


		VERTICAL: {
			'display': 'grid',
			'grid-template-columns': theme.gridTemplateColumns[4],
			NAV: {
				ITEM: {
					'border-bottom': 'none',
					'padding': `${theme.spacing[3]} ${theme.spacing[4]}`,
					'display': 'flex'
				},
			},
			NAV_TAB_CONTENT: {
				'border-left-width': '1px',
				'left': '-1px'
			},
			CONTENT: {
				'border-top': 'none',
				'top': '0',
				'grid-column': theme.gridColumn['span-3'],

				BODY: {
					'padding': `0 ${theme.spacing[7]} ${theme.spacing[7]}`,
				},
				NAV: {
					ITEM: { 'border-left-width': '1px' }
				}
			},
			RADIO: {
				NAV: {
					ITEM: { 'border-right-width': '1px' }
				},
				CONTENT: {
					'border-right-width': '1px',
					'right': '-1px'
				}
			}
		}
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.tabs']: {
			['.tabs-nav']: {
				...BASE.TABS.NAV,
				...options['.tabs .tabs-nav'],

				['&::-webkit-scrollbar']: { ...BASE.TABS.NAV.SCROLLBAR, ...options['.tabs .tabs-nav::-webkit-scrollbar'] },

				['.tab-item']: { ...BASE.TABS.NAV.ITEM, ...options['.tabs .tabs-nav .tab-item'] }
			},

			['> input[type=radio]']: { ...BASE.TABS.RADIO, ...options['.tabs > input[type=radio]'] },

			['.tabs-content']: {
				...BASE.TABS.CONTENT,
				...options['.tabs .tabs-content'],
				
				['.tab-body']: { ...BASE.TABS.CONTENT.BODY, ...options['.tabs .tabs-content .tab-body'] }
			},

			['&.tabs-vertical']: {
				...BASE.TABS.VERTICAL,
				...options['.tabs-vertical'],

				['.tabs-nav']: {
					['.tab-item']: { ...BASE.TABS.VERTICAL.NAV.ITEM, ...options['.tabs-vertical .tabs-nav .tab-item'] },
				},

				['.tabs-content']: {
					...BASE.TABS.VERTICAL.CONTENT,
					...options['.tabs-vertical .tabs-content'],

					['.tab-body']: { ...BASE.TABS.VERTICAL.CONTENT.BODY, ...options['.tabs-vertical .tabs-content .tab-body'] }
				},

				// Left
				['input[type=radio] + .tabs-nav .tab-item']: { ...BASE.TABS.VERTICAL.RADIO.NAV.ITEM, ...options['.tabs-vertical input[type=radio] + .tabs-nav .tab-item'] },
				['.tabs-nav + .tab-content']: { ...BASE.TABS.VERTICAL.NAV_TAB_CONTENT, ...options['.tabs-vertical .tabs-nav + .tab-content'] },

				// Right
				['.tabs-content + .tabs-nav .tab-item']: { ...BASE.TABS.VERTICAL.CONTENT.NAV.ITEM, ...options['.tabs-vertical .tabs-content + .tabs-nav .tab-item'] },
				['input[type=radio] + .tabs-content']: { ...BASE.TABS.VERTICAL.RADIO.CONTENT, ...options['.tabs-vertical input[type=radio] + .tabs-content'] }
			}
		}
	})

	for(let i = 1; i < 21; i++){
		addComponents({
			[`.tabs > input[type=radio]:checked:nth-child(${i}) ~ .tabs-content .tab-body:nth-child(${i})`]: { 'display': 'block' }
		})
	}
}



module.exports = { OPTIONS, COMPONENTS }