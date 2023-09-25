const theme = require('tailwindcss/defaultTheme')

const minWidth = '180px'

const LIST_GROUP_STYLE_BASE = {
	LIST: {
		'display': 'grid'
	},

	ITEM: {
		'line-height': theme.lineHeight.tight,
		'padding': `${theme.spacing[2]} ${theme.spacing[4]}`,
		'display': 'flex',
		'transition': theme.transitionProperty.all
	},

	HEAD: {
		'font-size': theme.fontSize.sm,
		'font-weight': theme.fontWeight.semibold,
		'padding': `${theme.spacing[1]} ${theme.spacing[4]}`,
		'user-select': 'none'
	}
}


const LIST_GROUP_UTILITIES = {
	'.list-group': {
		...LIST_GROUP_STYLE_BASE.LIST,

		// Item
		'.list-group-item': {
			...LIST_GROUP_STYLE_BASE.ITEM,
		},

		'.list-group-item:not(:first-child)': {
			'border-top-width': theme.borderWidth.DEFAULT
		},


		// Head
		'.list-group-head': {
			...LIST_GROUP_STYLE_BASE.HEAD,
		},
		'.list-group-head + .list-group-item': { 'border': 'none' },

		// Striped
		'&.striped': {
			'.list-group-item': { 'border': 'none' }
		},
	}
}


module.exports = { LIST_GROUP_UTILITIES }