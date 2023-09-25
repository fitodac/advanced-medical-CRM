const theme = require('tailwindcss/defaultTheme')
const { GLOBALS } = require('../utilities/utils')
const MEDIA = require('./mediaqueries')


const OPTIONS = {
	'.btn': {},
	'.btn-sm': {},
	'.btn-lg': {},
	'.btn.ghost': {},
	'.btn-icon': {},
	'.btn_icon > svg': {},
	'.btn.rounded': {},
	'.btn.block': {},
	'.btn-link': {},
	'.btn > [class^=ri-]': {},
	'.btn-group': {},
	'.btn-group > .btn': {},
	'.btn-group > .btn:first-child': {},
	'.btn-group > .btn:last-child': {},
	'.btn-group > label': {},
	'.btn-group-sm': {},
	'.btn-group-lg': {},
	'.btn-group-sm > .btn': {},
	'.btn-group-lg > .btn': {},
	'.btn-group-sm > .btn:first-child': {},
	'.btn-group-sm > .btn:last-child': {},
	'.btn-group-lg > .btn:first-child': {},
	'.btn-group-lg > .btn:last-child': {},
}


const BASE = {
	/// Button basics:
	BTN: {
		'border-width': theme.borderWidth.DEFAULT,
		'font-size': theme.fontSize.xs[0],
		'line-height': theme.lineHeight.none,
		'font-weight': theme.fontWeight.medium,
		'max-height': theme.spacing[10],
		'padding': `${theme.spacing[2.5]} ${theme.spacing[5]}`,
		'display': 'inline-flex',
		'justify-content': 'center',
		'align-items': 'center',
		'transition': theme.transitionProperty.all,
		'transition-duration': theme.transitionDuration[300],
		'border-radius': theme.borderRadius.md,
		'cursor': 'pointer',
		'overflow': 'hidden',
		'text-overflow': 'ellipsis',
		'white-space': 'nowrap',
		'user-select': 'none',
		...MEDIA.query('md', {'padding': `${GLOBALS.spacing.y} ${GLOBALS.spacing.x}`}),

		SM: {
			'font-size': theme.fontSize.xs[0],
			'padding': `${GLOBALS.spacing.sm.y} ${GLOBALS.spacing.sm.x}`
		},

		LG: {
			'padding': `${GLOBALS.spacing.lg.y} ${GLOBALS.spacing.lg.x}`,
			'max-height': theme.spacing[14],
		},

		GHOST: { 'border': 'transparent' },
		
		/// Button icon:
		ICON: {
			'width': theme.spacing[10],
			'height': theme.spacing[10],
			'padding': theme.spacing[0],
			'display': 'inline-grid',
			'place-content': 'center',

			SVG: { 'transition': theme.transitionProperty.all }
		},
		ROUNDED: { 'border-radius': theme.borderRadius.full },
		BLOCK: { 'text-align': 'center' }
	},

	LINK: {
		'border': 'none',
		'padding': 0
	},

	TOGGLER: { 'display': 'none' },

	/// Button group:
	GROUP: {
		GROUP: { 'display': 'inline-flex' },
		CHILDREN: {
			'font-size': theme.fontSize.sm[0],
			'border-radius': theme.borderRadius.none,
			'padding-left': theme.spacing[5],
			'padding-right': theme.spacing[5],
		},
		CHILDREN_FIRST: { 'border-radius': `${theme.borderRadius.md} 0 0 ${theme.borderRadius.md}` },
		CHILDREN_LAST: { 'border-radius': `0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0` },

		LABEL: {
			display: 'inline-flex',
			cursor: 'pointer',

			BTN: {
				'padding-left': theme.spacing[5],
				'padding-right': theme.spacing[5],
			}
		},

		SM: {
			BTN: {
				'font-size': theme.fontSize.xs[0],
				'padding': `${theme.spacing[1.5]} ${theme.spacing[3]}`,
			}
		},

		LG: {
			BTN: {
				'padding': `${GLOBALS.spacing.lg.y} ${GLOBALS.spacing.lg.x}`,
				'max-height': theme.spacing[14],

				FIRST_CHILD: { 'border-radius': `${theme.borderRadius.lg} 0 0 ${theme.borderRadius.lg}` },
				LAST_CHILD: { 'border-radius': `0 ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0` },
			}
		}
	},
	
	RI: { 'font-size': '1.2rem' }
}


const COMPONENTS = (addComponents, options) => {
	
	addComponents({
		['.btn']: {
			...BASE.BTN, 
			...options['.btn'],
			
			['&.btn-sm']: {...BASE.BTN.SM, ...options['.btn-sm']},
			['&.btn-lg']: {...BASE.BTN.LG, ...options['.btn-lg']},
			['&.ghost']: {...BASE.BTN.GHOST, ...options['.btn.ghost']},
			['&.btn-icon']: {
				...BASE.BTN.ICON, 
				...options['.btn-icon'],

				['svg']: {...BASE.BTN.ICON.SVG, ...options['.btn_icon > svg']}
			},
			['&.rounded-full']: {...BASE.BTN.ROUNDED, ...options['.btn.rounded']},
			['&.btn-link']: {...BASE.LINK, ...options['.btn-link']},
			['> [class^=ri-]']: {...BASE.RI, ...options['.btn > [class^=ri-]']},
			['&.block']: {...BASE.BTN.BLOCK, ...options['.btn.block']},
		}
	})

	addComponents({
		['.btn-group']: {
			...BASE.GROUP.GROUP,
			...options['.btn-group'],

			['> .btn']: {
				...BASE.GROUP.CHILDREN,
				...options['.btn-group > .btn'],

				['&:first-child']: {...BASE.GROUP.CHILDREN_FIRST, ...options['.btn-group > .btn:first-child']},
				['&:last-child']: {...BASE.GROUP.CHILDREN_LAST, ...options['.btn-group > .btn:last-child']}
			},

			['> label']: {
				...BASE.GROUP.LABEL,
				...options['.btn-group > label'],

				['> [type=checkbox], > [type=radio]']: { display: 'none' },
				['> .btn']: {
					...BASE.GROUP.CHILDREN,
					...BASE.GROUP.LABEL.BTN,
					...options['.btn-group > .btn'],
				},
				['&:first-child > .btn']: {...BASE.GROUP.CHILDREN_FIRST, ...options['.btn-group > .btn:first-child']},
				['&:last-child > .btn']: {...BASE.GROUP.CHILDREN_LAST, ...options['.btn-group > .btn:last-child']},
			},

			['> .dropdown > .btn-toggler > .btn']: {...BASE.GROUP.CHILDREN, ...options['.btn-group > .btn']},
			['> .dropdown:first-child > .btn-toggler > .btn']: {...BASE.GROUP.CHILDREN_FIRST, ...options['.btn-group > .btn:first-child']},
			['> .dropdown:last-child > .btn-toggler > .btn']: {...BASE.GROUP.CHILDREN_LAST, ...options['.btn-group > .btn:last-child']}

		}
	})

	addComponents({
		['.btn-group-sm']: {
			...BASE.GROUP.GROUP,
			...options['.btn-group-sm'],

			['& > .btn']: {
				...BASE.GROUP.CHILDREN,
				...BASE.GROUP.SM.BTN,
				...options['.btn-group-sm > .btn'],

				['&:first-child']: {...BASE.GROUP.CHILDREN_FIRST, ...options['.btn-group-sm > .btn:first-child']},
				['&:last-child']: {...BASE.GROUP.CHILDREN_LAST, ...options['.btn-group-sm > .btn:last-child']},
			}
		}
	})
	
	addComponents({
		['.btn-group-lg']: {
			...BASE.GROUP.GROUP,
			...options['.btn-group-lg'],

			['& > .btn']: {
				...BASE.GROUP.CHILDREN,
				...BASE.GROUP.LG.BTN,
				...options['.btn-group-lg > .btn'],

				['&:first-child']: {...BASE.GROUP.LG.BTN.FIRST_CHILD, ...options['.btn-group-lg > .btn:first-child']},
				['&:last-child']: {...BASE.GROUP.LG.BTN.LAST_CHILD, ...options['.btn-group-lg > .btn:last-child']},
			}
		}
	})

	addComponents({
		['.btn-toggler']: {
			['> [type=checkbox], > [type=radio]']: { display: 'none' }
		}
	})

}


module.exports = { OPTIONS, COMPONENTS }