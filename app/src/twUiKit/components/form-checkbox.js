const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.input-checkbox': {},
	'.input-checkbox input': {},
	'.input-checkbox input + span': {},
	'.input-checkbox input + span::before': {},
	'.input-checkbox.input-lg input + span::before': {},
	'.input-checkbox input:disabled + span::before': {},
	'.input-checkbox.toggler input + span::before': {},
	'.input-checkbox.toggler input:checked + span::before': {},
	'.input-checkbox.checked input + span::before': {},
	'.input-checkbox.checked input:checked + span::before': {},

}


const BASE = {
	CHECKBOX: {
		'font-size': theme.fontSize.sm[0],
		'font-weight': theme.fontWeight.normal,
		'line-height': theme.fontSize.sm[1].lineHeight,
		'display': 'inline-flex',
		'align-items': 'center',
		'gap': theme.spacing[2],
		'cursor': 'pointer',

		INPUT: { 
			'display': 'none',

			DISABLED: {
				SPAN: {
					BEFORE: { 'cursor': 'auto' }
				}
			}
		},
		SPAN: {
			'line-height': theme.fontSize.sm[1].lineHeight,
			'display': 'flex',
			'align-items': 'center',
			'gap': theme.spacing[2],
			'transition': theme.transitionProperty.all,
			'user-select': 'none',

			BEFORE: {
				'content': '""',
				'background-repeat': 'no-repeat',
				'background-position': 'center',
				'border-width': '1px',
				'width': theme.spacing[5],
				'height': theme.spacing[5],
				'display': 'flex',
				'transition': theme.transitionProperty.all,
				'border-radius': theme.borderRadius.md
			}
		},
		INPUT_LG: {
			SPAN: {
				BEFORE: {
					'width': theme.spacing[7],
					'height': theme.spacing[7],
					'border-radius': theme.borderRadius.lg
				}
			}
		},

		TOGGLER: {
			SPAN: {
				BEFORE: {
					'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='12' height='14'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm' fill='white'/%3E%3C/svg%3E")`,
					'background-position': '3px center',
					'background-size': '11px',
					'width': theme.spacing[10],
					'height': theme.spacing[5],
					'border-radius': theme.borderRadius.full
				}
			},
			CHECKED: {
				SPAN: {
					BEFORE: { 'background-position': 'calc(100% - 2px) center' }
				}
			},
		},

		// Checked
		CHECKED: {
			SPAN: {
				BEFORE: {
					'width': theme.spacing[6],
					'height': theme.spacing[6],
					'border-radius': theme.borderRadius.full
				}
			},
			CHECKED: {
				SPAN: {
					BEFORE: { 'background-size': '70%' }
				}
			}
		}
	}
}



const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.input-checkbox']: {
			...BASE.CHECKBOX,
			...options['.input-checkbox'],

			['input']: { ...BASE.CHECKBOX.INPUT, ...options['.input-checkbox input'] },
			['input + span']: {
				...BASE.CHECKBOX.SPAN,
				...options['.input-checkbox input + span'],

				['&::before']: { ...BASE.CHECKBOX.SPAN.BEFORE, ...options['.input-checkbox input + span::before'] }
			},
			['&.input-lg input + span::before']: { ...BASE.CHECKBOX.INPUT_LG.SPAN.BEFORE, ...options['.input-checkbox.input-lg input + span::before'] },
			['input:disabled + span::before']: { ...BASE.CHECKBOX.INPUT.DISABLED.SPAN.BEFORE, ...options['.input-checkbox input:disabled + span::before'] },

			// Toggler
			['&.toggler']: {
				['input + span::before']: { ...BASE.CHECKBOX.TOGGLER.SPAN.BEFORE, ...options['.input-checkbox.toggler input + span::before'] },
				['input:checked + span::before']: { ...BASE.CHECKBOX.TOGGLER.CHECKED.SPAN.BEFORE, ...options['.input-checkbox.toggler input:checked + span::before'] }
			},

			['&.checked']: {
				['input + span::before']: { ...BASE.CHECKBOX.CHECKED.SPAN.BEFORE, ...options['.input-checkbox.checked input + span::before'] },
				['input:checked + span::before']: { ...BASE.CHECKBOX.CHECKED.CHECKED.SPAN.BEFORE, ...options['.input-checkbox.checked input:checked + span::before'] }
			}
		}
	})
}



module.exports = { OPTIONS, COMPONENTS }