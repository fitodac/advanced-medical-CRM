const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.list-group': {},
	'.list-group .list-group-item': {},
	'.list-group .list-group-item:not(:first-child)': {},
	'.list-group .list-group-head': {},
	'.list-group .list-group-head + .list-group-item': {},
	'.list-group.striped': {},
}


const BASE = {
	LIST_GROUP: {
		'display': 'grid',
		
		ITEM: {
			'line-height': theme.lineHeight.tight,
			'padding': `${theme.spacing[2]} ${theme.spacing[4]}`,
			'display': 'flex',
			'transition': theme.transitionProperty.all,

			NOT: {
				FIRST_CHILD: { 'border-top-width': theme.borderWidth.DEFAULT }
			}
		},
		HEAD: {
			'font-size': theme.fontSize.sm,
			'font-weight': theme.fontWeight.semibold,
			'padding': `${theme.spacing[1]} ${theme.spacing[4]}`,
			'user-select': 'none',

			ITEM: { 'border': 'none' }
		}
	},
	LIST_GROUP_STRIPED: { 
		ITEM: { 'border': 'none' }
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.list-group']: {
			...BASE.LIST_GROUP,
			...options['.list-group'],

			['.list-group-item']: { 
				...BASE.LIST_GROUP.ITEM,
				...options['.list-group .list-group-item'],

				['&:not(:first-child)']: { ...BASE.LIST_GROUP.ITEM.NOT.FIRST_CHILD, ...options['.list-group .list-group-item:not(:first-child)'] }
			},

			['.list-group-head']: { 
				...BASE.LIST_GROUP.HEAD,
				...options['.list-group .list-group-head'],

				['& + .list-group-item']: { ...BASE.LIST_GROUP.HEAD.ITEM, ...options['.list-group .list-group-head + .list-group-item'] }
			},
			['&.striped']: { ...BASE.LIST_GROUP_STRIPED.ITEM, ...options['.list-group.striped'] }
		}
	})
}



module.exports = { OPTIONS, COMPONENTS }