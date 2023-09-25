const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.input-radio': {},
	'.input-radio input': {},
	'.input-radio input + span': {},
	'.input-radio input + span::before': {},
	'.input-radio.input-lg input + span::before': {},
	'.input-radio input:disabled + span::before': {},
	'.input-radio.toggler input + span::before': {},
	'.input-radio.toggler input:checked + span::before': {},
	'.input-radio.checked input + span::before': {},
	'.input-radio.checked input:checked + span::before': {},
}


const BASE = {
	RADIO: {
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
			'transition': '.3s ease-in-out',
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
				'border-radius': theme.borderRadius.full,
				'transition': '.3s ease-in-out'
			}
		},
		INPUT_LG: {
			SPAN: {
				BEFORE: {
					'width': theme.spacing[7],
					'height': theme.spacing[7]
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
					BEFORE: {
						'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath fill='white' d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' stroke='white' stroke-width='1' stroke-linecap='round' /%3E%3C/svg%3E")`,
						'background-size': '74%'
					}
				}
			}
		}
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.input-radio']: {
			...BASE.RADIO,
			...options['.input-radio'],

			['input']: { ...BASE.RADIO.INPUT, ...options['.input-radio input'] },
			['input + span']: {
				...BASE.RADIO.SPAN,
				...options['.input-radio input + span'],

				['&::before']: { ...BASE.RADIO.SPAN.BEFORE, ...options['.input-radio input + span::before'] }
			},
			['&.input-lg input + span::before']: { ...BASE.RADIO.INPUT_LG.SPAN.BEFORE, ...options['.input-radio.input-lg input + span::before'] },

			// Toggler
			['&.toggler']: {
				['input + span::before']: { ...BASE.RADIO.TOGGLER.SPAN.BEFORE, ...options['.input-radio.toggler input + span::before'] },
				['input:checked + span::before']: { ...BASE.RADIO.TOGGLER.CHECKED.SPAN.BEFORE, ...options['.input-radio.toggler input:checked + span::before'] }
			},

			['&.check']: {
				['input + span::before']: { ...BASE.RADIO.CHECKED.SPAN.BEFORE, ...options['.input-radio.checked input + span::before'] },
				['input:checked + span::before']: { ...BASE.RADIO.CHECKED.CHECKED.SPAN.BEFORE, ...options['.input-radio.checked input:checked + span::before'] }
			}
		}
	})
}


module.exports = { OPTIONS, COMPONENTS }