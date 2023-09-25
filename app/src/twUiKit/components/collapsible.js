const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.collapsible': {}
}


const BASE = {
	COLLAPSIBLE: {
		'border-width': '1px',
		'width': '100%',
		'position': 'relative',
		'overflow': 'hidden',
		'border-radius': theme.borderRadius.lg,

		INPUT: {
			'position': 'absolute',
			'display': 'none',

			CHECKED: {
				HEAD: { 'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z'%3E%3C/path%3E%3C/svg%3E");` },
				CONTENT: { 'max-height': theme.spacing[80] }
			}
		},
		HEAD: {
			'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z'%3E%3C/path%3E%3C/svg%3E");`,
			'background-size': '20px',
			'background-repeat': 'no-repeat',
			'background-position': 'calc(100% - 10px) 10px',
			'line-height': theme.lineHeight.normal,
			'padding': `${theme.spacing[3]} ${theme.spacing[5]}`,
			'display': 'block',
			'cursor': 'pointer'
		},
		CONTENT: {
			'line-height': theme.lineHeight.tight,
			'max-height': 0,
			'transition-property': 'all',
			'transition-timing-function': theme.transitionTimingFunction['in-out'],
			'transition-duration': theme.transitionDuration[200],
			'overflow': 'auto',
		}
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.collapsible']: {
			...BASE.COLLAPSIBLE,
			...options['.collapsible'],

			['[type=checkbox]']: {
				...BASE.COLLAPSIBLE.INPUT,

				['&:checked ~ .collapsible-head']: { ...BASE.COLLAPSIBLE.INPUT.CHECKED.HEAD },
				['&:checked ~ .collapsible-content']: { ...BASE.COLLAPSIBLE.INPUT.CHECKED.CONTENT }
			},
			['[type=radio]']: {
				...BASE.COLLAPSIBLE.INPUT,

				['&:checked ~ .collapsible-head']: { ...BASE.COLLAPSIBLE.INPUT.CHECKED.HEAD },
				['&:checked ~ .collapsible-content']: { ...BASE.COLLAPSIBLE.INPUT.CHECKED.CONTENT }
			},
		}
	})
	
	addComponents({
		['.collapsible-head']: {
			...BASE.COLLAPSIBLE.HEAD
		}
	})
	
	addComponents({
		['.collapsible-content']: {
			...BASE.COLLAPSIBLE.CONTENT
		}
	})
}


module.exports = { OPTIONS, COMPONENTS }