const theme = require('tailwindcss/defaultTheme')
const { GLOBALS, FIELD_STYLE_BASE } = require('../utilities/utils')


const OPTIONS = {
	'select': {},
	'select:focus': {},
	'select.input-valid': {},
	'select.input-error': {}
}


const BASE = {
	SELECT: {
		...FIELD_STYLE_BASE,
		'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
		'background-position': 'right 0.5rem center',
		'background-repeat': 'no-repeat',
		'background-size': '1.5em',
		'padding': `${theme.spacing[2]} ${theme.spacing[7]} ${theme.spacing[2]} ${GLOBALS.spacing.DEFAULT}`,
		'cursor': 'pointer',

		'-webkit-print-color-adjust': 'exact',
		'color-adjust': 'exact',
		'print-color-adjust': 'exact',
		'-webkit-appearance': 'none',
		'-moz-appearance': 'none',
		'appearance': 'none',

		FOCUS: { 'outline-style': 'none' },
		VALID: { 'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${GLOBALS.input.valid.color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` },
		ERROR: { 'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${GLOBALS.input.error.color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['select']: {
			...BASE.SELECT,
			...options['select'],

			['&:focus, &:focus-visible']: { ...BASE.SELECT.FOCUS, ...options['select:focus'] },
			['&.input-valid']: { ...BASE.SELECT.VALID, ...options['select.input-valid'] },
			['&.input-error']: { ...BASE.SELECT.ERROR, ...options['select.input-error'] }
		}
	})
}


module.exports = { OPTIONS, COMPONENTS }