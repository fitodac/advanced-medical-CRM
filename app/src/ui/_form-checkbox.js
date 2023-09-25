const theme = require('tailwindcss/defaultTheme')
const GLOBALS = require('./_utils')


const FORM_CHECKBOX_UTILITIES = {
	'.input-checkbox': {
		'font-size': theme.fontSize.sm[0],
		'font-weight': theme.fontWeight.normal,
		'line-height': theme.fontSize.sm[1].lineHeight,
		'display': 'inline-flex',
		'align-items': 'center',
		'gap': theme.spacing[2],
		'cursor': 'pointer',

		'input': { 'display': 'none' },

		'input + span': {
			'line-height': theme.fontSize.sm[1].lineHeight,
			'display': 'flex',
			'align-items': 'center',
			'gap': theme.spacing[2],
			'transition': theme.transitionProperty.all,
			'user-select': 'none'
		},

		'input + span::before': {
			'content': '""',
			'background-repeat': 'no-repeat',
			'background-position': 'center',
			'border-width': '1px',
			'width': theme.spacing[5],
			'height': theme.spacing[5],
			'display': 'flex',
			'transition': theme.transitionProperty.all,
			'border-radius': theme.borderRadius.md
		},

		'&.input-lg input + span::before': {
			'width': theme.spacing[7],
			'height': theme.spacing[7],
			'border-radius': theme.borderRadius.lg
		},

		'input:disabled + span::before': { 'cursor': 'auto' },

		// Toggler
		'&.toggler input + span::before': {
			'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='14'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm' fill='white'/%3E%3C/svg%3E")`,
			'background-position': '3px center',
			'background-size': '11px',
			'width': theme.spacing[10],
			'height': theme.spacing[5],
			'border-radius': theme.borderRadius.full
		},

		'&.toggler input:checked + span::before': {
			'background-position': 'calc(100% - 2px) center'
		},

		// Check
		'&.check input + span::before': {
			'width': theme.spacing[6],
			'height': theme.spacing[6],
			'border-radius': theme.borderRadius.full
		},

		'&.check input:checked + span::before': {
			'background-size': '70%'
		}
	}
}


module.exports = { 
	FORM_CHECKBOX_UTILITIES
}