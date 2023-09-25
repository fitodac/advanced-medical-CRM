const theme = require('tailwindcss/defaultTheme')
const GLOBALS = require('./_utils');


const COMPONENTS = [
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
];

const FIELD_STYLE_BASE = {
	'border-width': theme.borderWidth.DEFAULT,
	'border-style': 'solid',
	'font-size': theme.fontSize.sm[0],
	'line-height': theme.fontSize.sm[1].lineHeight,
	'width': '100%',
	'max-height': theme.spacing[10],
	'padding': `${theme.spacing[2]} ${GLOBALS.spacing.DEFAULT}`,
	'border-radius': theme.borderRadius.md,
	'user-select': 'none'
}

const INPUT_GROUP = {
	DEFAULT: {
		'display': 'inline-flex',
		'align-items': 'center',
		'column-gap': theme.spacing[1.5],
		'width': '100%'
	},
	INSET: {
		'border-width': theme.borderWidth.DEFAULT,
		'width': '100%',
		'padding': theme.spacing[2],
		'display': 'inline-flex',
		'align-items': 'center',
		'column-gap': theme.spacing[1.5],
		'border-radius': theme.borderRadius.lg,
	}
}


const FORM_INPUT_UTILITIES = {
	...Object.fromEntries(COMPONENTS.map(component => {
		return [
			[`input${component}`, {
				...FIELD_STYLE_BASE,
				'&:focus': {
					'outline-style': 'none'
				},
				'&::placeholder': {
					'color': 'var(--tw-global-text-color)',
					'opacity': '.4'
				}
			}]
		]
	}).flat()),
	'.input-group': {
		...INPUT_GROUP.DEFAULT,
		'& > .btn': {
			'padding-left': theme.spacing[4],
			'padding-right': theme.spacing[4],
		},
		'& > input, & > select': {
			'height': 'fit-content',
			'flex': 1,
		}
	},
	'.input-group-inset': {
		...INPUT_GROUP.INSET,
		'& > input': {
			'background': 'transparent',
			'border': 'none',
			'padding': 0,
			'flex': 1,
			'border-radius': 0
		},
		'& > input:first-child': { 'padding': `0 0 0 ${GLOBALS.spacing.DEFAULT}` },
		'& > input:last-child': { 'padding': `0 ${GLOBALS.spacing.DEFAULT} 0 0` },
		'& > .btn': {
			'padding': `${theme.spacing[1]} ${theme.spacing[3]}`
		}
	}
}


module.exports = { 
	FORM_INPUT_UTILITIES,
	FIELD_STYLE_BASE
}