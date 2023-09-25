const theme = require('tailwindcss/defaultTheme')
const { GLOBALS, FIELD_STYLE_BASE } = require('../utilities/utils')


const OPTIONS = {
	'input': {},
	'input:focus': {},
	'input:placeholder': {},
	'.input-group': {},
	'.input-group > .btn': {},
	'.input-group > input': {},
	'.input-group > select': {},
	'.input-group-inset': {},
	'.input-group-inset > input': {},
	'.input-group-inset > input:first-child': {},
	'.input-group-inset > input:last-child': {},
	'.input-group-inset > .btn': {}
}


const BASE = {
	INPUT: {
		...FIELD_STYLE_BASE,

		FOCUS: { 'outline-style': 'none' },
		PLACEHOLDER: {
			'color': 'var(--tw-global-text-color)',
			'opacity': '.4'
		}
	},

	GROUP: {
		DEFAULT: {
			'display': 'inline-flex',
			'align-items': 'center',
			'column-gap': theme.spacing[1.5],
			'width': '100%',

			BTN: {
				'padding-left': theme.spacing[4],
				'padding-right': theme.spacing[4],
			},
			INPUT: {
				'height': 'fit-content',
				'flex': 1,
			}
		},

		INSET: {
			'border-width': theme.borderWidth.DEFAULT,
			'width': '100%',
			'padding': theme.spacing[2],
			'display': 'inline-flex',
			'align-items': 'center',
			'column-gap': theme.spacing[1.5],
			'border-radius': theme.borderRadius.lg,

			BTN: {
				'padding': `${theme.spacing[1]} ${theme.spacing[3]}`
			},
			INPUT: {
				'background': 'transparent',
				'border': 'none',
				'padding': 0,
				'flex': 1,
				'border-radius': 0,

				FIRTST_CHILD: { 'padding': `0 0 0 ${GLOBALS.spacing.DEFAULT}` },
				LAST_CHILD: { 'padding': `0 ${GLOBALS.spacing.DEFAULT} 0 0` },
			}
		}
	}
}


const TYPES = [
	'[type=text]',
	'[type=password]',
	'[type=email]',
	'[type=number]',
	'[type=tel]',
	'[type=search]',
	'[type=url]',
	'[type=date]',
	'[type=time]',
	'[type=datetime-local]',
	'[type=week]',
	'[type=color]'
]


const COMPONENTS = (addComponents, options) => {
	TYPES.forEach(e => {
		addComponents({
			[`input${e}`]: {
				...BASE.INPUT,
				...options['input'],

				['&:focus, &:focus-visible']: {...BASE.INPUT.FOCUS, ...options['input:focus']},
				'&::placeholder': {...BASE.INPUT.PLACEHOLDER, ...options['input:placeholder']}
			}
		})
	})

	addComponents({
		['.input-group']: {
			...BASE.GROUP.DEFAULT,
			...options['.input-group'],

			['& > .btn']: {
				...BASE.GROUP.DEFAULT.BTN,
				...options['.input-group > .btn']
			},

			['& > input, & > select']: {
				...BASE.GROUP.DEFAULT.INPUT,
				...options['.input-group > input'],
				...options['.input-group > select']
			}
		}
	})
	
	addComponents({
		['.input-group-inset']: {
			...BASE.GROUP.INSET,
			...options['.input-group-inset'],

			['& > input']: {
				...BASE.GROUP.INSET.INPUT, 
				...options['.input-group-inset > input'],
				
				['&:first-child']: {...BASE.GROUP.INSET.INPUT.FIRTST_CHILD, ...options['.input-group-inset > input:first-child']},
				['&:last-child']: {...BASE.GROUP.INSET.INPUT.LAST_CHILD,  ...options['.input-group-inset > input:last-child']},
			},

			['& > .btn']: {...BASE.GROUP.INSET.BTN, ...options['.input-group-inset > .btn']}
		}
	})
}



module.exports = { OPTIONS, COMPONENTS }