const theme = require('tailwindcss/defaultTheme')
const GLOBALS = require('./_utils')


const BUTTON_STYLE_BASE = {
	/// Button basics:
	BTN: {
		'border-width': theme.borderWidth.DEFAULT,
		'font-size': theme.fontSize.xs[0],
		'line-height': theme.lineHeight.none,
		'font-weight': theme.fontWeight.medium,
		'max-height': theme.spacing[10],
		'padding': `${GLOBALS.spacing.y} ${GLOBALS.spacing.x}`,
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
		'user-select': 'none'
	},

	/// Button icon:
	ICON: {
		'width': theme.spacing[10],
		'height': theme.spacing[10],
		'padding': theme.spacing[0],
		'display': 'inline-grid',
		'place-content': 'center'
	},

	/// Button group:
	BTN_GROUP: {
		'display': 'inline-flex'
	},
	BTN_GROUP_CHILDREN: {
		'font-size': theme.fontSize.sm[0],
		'border-radius': theme.borderRadius.none
	},
	BTN_GROUP_CHILDREN_FIRST: { 'border-radius': `${theme.borderRadius.md} 0 0 ${theme.borderRadius.md}` },
	BTN_GROUP_CHILDREN_LAST: { 'border-radius': `0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0` },

	LINK: {
		'border': 'none',
		'padding': 0
	}
}


const BUTTON_UTILITIES = {
	'.btn': {
		...BUTTON_STYLE_BASE.BTN,

		'&.btn-sm': {
			'font-size': theme.fontSize.xs[0],
			'padding': `${GLOBALS.spacing.sm.y} ${GLOBALS.spacing.sm.x}`
		},

		'&.btn-lg': {
			'padding': `${GLOBALS.spacing.lg.y} ${GLOBALS.spacing.lg.x}`,
			'max-height': theme.spacing[14],
		},

		'&.ghost': { 'border': 'transparent' },

		'&.btn-icon': {
			...BUTTON_STYLE_BASE.ICON,

			'svg': { 'transition': theme.transitionProperty.all }
		},

		'&.rounded-full': { 'border-radius': theme.borderRadius.full },

		'&.btn-link': { ...BUTTON_STYLE_BASE.LINK },

		'> [class^=ri-]': { 'font-size': '1.2rem' }
	},

	'.btn-group': {
		...BUTTON_STYLE_BASE.BTN_GROUP,

		'> .btn': {
			...BUTTON_STYLE_BASE.BTN,
			...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN,
			'padding-left': theme.spacing[5],
			'padding-right': theme.spacing[5],
			'&:first-child': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN_FIRST},
			'&:last-child': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN_LAST}
		},

		// Checkbox
		'> label': {
			display: 'inline-flex',
			cursor: 'pointer',

			'> [type=checkbox], > [type=radio]': { display: 'none' },
			'> .btn': {
				...BUTTON_STYLE_BASE.BTN,
				...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN,
				'padding-left': theme.spacing[5],
				'padding-right': theme.spacing[5],
			},
			'&:first-child > .btn': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN_FIRST},
			'&:last-child > .btn': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN_LAST}
		},

		// Dropdown
		'> .dropdown > .btn-toggler > .btn': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN},
		'> .dropdown:first-child > .btn-toggler > .btn': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN_FIRST},
		'> .dropdown:last-child > .btn-toggler > .btn': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN_LAST}

	},
	'.btn-group-sm': {
		...BUTTON_STYLE_BASE.BTN_GROUP,
		'& > .btn': {
			...BUTTON_STYLE_BASE.BTN,
			...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN,
			'font-size': theme.fontSize.xs[0],
			'padding': `${theme.spacing[1.5]} ${theme.spacing[3]}`,
			'&:first-child': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN_FIRST},
			'&:last-child': {...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN_LAST}
		}
	},
	'.btn-group-lg': {
		...BUTTON_STYLE_BASE.BTN_GROUP,
		'& > .btn': {
			...BUTTON_STYLE_BASE.BTN,
			...BUTTON_STYLE_BASE.BTN_GROUP_CHILDREN,
			'padding': `${GLOBALS.spacing.lg.y} ${GLOBALS.spacing.lg.x}`,
			'max-height': theme.spacing[14],
			'&:first-child': { 'border-radius': `${theme.borderRadius.lg} 0 0 ${theme.borderRadius.lg}` },
			'&:last-child': { 'border-radius': `0 ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0` }
		}
	},

	'.btn-toggler': {

		'> [type=checkbox], > [type=radio]': { 'display': 'none' }
	}
}


module.exports = { BUTTON_UTILITIES }