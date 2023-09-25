const theme = require('tailwindcss/defaultTheme')
const GLOBALS = require('./_utils');
const { FIELD_STYLE_BASE } = require('./_form-input')

const FORM_SELECT_UTILITIES = {
	'select': {
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

		'&:focus': {
			'outline-style': 'none'
		},

		'&.input-valid': {
			'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${GLOBALS.input.valid.color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
		},
		'&.input-error': {
			'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${GLOBALS.input.error.color}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
		}
	},

	// Choices
	'.choices': {
		'position': 'relative',
		'overflow': 'hidden',

		'&:focus': { 'outline': 'none' },
		'&:last-child': { 'margin-bottom': 0 },
		'&.is-open': { 'overflow': 'visible' },

		'&.is-disabled .choices__inner, &.is-disabled .choices__input': {
			'cursor': 'not-allowed',
			'-webkit-user-select': 'none',
			'user-select': 'none',
		},

		'& [hidden]': { 'display': 'none !important', }, 
		'&[data-type=select-one]': { 'cursor': 'pointer', }, 
		'&[data-type=select-one] .choicesinput': { 
			'display': 'block', 
			'width': '100%', 
			'padding': '10px', 
			'border-bottom-width': '1px',  
			'margin': '0', 
		}, 
		'&[data-type*=select-one] .choicesbutton': { 
			'background-image': `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==")`, 
			'padding': 0, 
			'background-size': '8px', 
			'position': 'absolute', 
			'top': '50%', 
			'right': '0', 
			'margin-top': '-10px', 
			'margin-right': '25px', 
			'height': '20px', 
			'width': '20px', 
			'border-radius': '10em', 
			'opacity': '0.25', 
		}, 
		'&[data-type=select-one] .choices__button:hover, &[data-type=select-one] .choicesbutton:focus': { opacity: '1', }, 
		'&[data-type=select-one] .choicesitem[data-value=\'\'] .choicesbutton': { display: 'none', }, 
		'&[data-type=select-one].is-open::after': { 'margin-top': '-7.5px' }, 
		'&[data-type*=select-one][dir=rtl]::after': { 
			'left': '11.5px', 
			'right': 'auto', },
		'[data-type*=select-one][dir=rtl] .choices__button': {
			'right': 'auto',
			'left': '0',
			'margin-left': '25px',
			'margin-right': '0'
    },
    '&[data-type*=select-multiple] .choices__inner, &[data-type*=text] .choices__inner': { 'cursor': 'text' },
    '&[data-type*=select-multiple] .choices__button, &[data-type*=text] .choices__button': {
			'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
			'background-size': '8px',
			'padding-left': '16px',
			'border-left-width': '1px',
			'width': '8px',
			'line-height': '1',
			'margin-top': '0',
			'margin-right': '-4px',
			'margin-bottom': '0',
			'margin-left': '8px',
			'position': 'relative',
			'display': 'inline-block',
			'border-radius': '0',
			'opacity': '0.75',
    },
    '[data-type*=select-multiple] .choices__button:hover, &[data-type*=select-multiple] .choices__button:focus, .choices[data-type*=text] .choices__button:hover, .choices[data-type*=text] .choices__button:focus': { 'opacity': '1' },
		'input[type=search]': { 'display': 'none' },
    '.choices__inner, &[data-type*=select-one] .choices__inner': {
			...FIELD_STYLE_BASE,
			'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
			'background-position': 'right 0.5rem center',
			'background-repeat': 'no-repeat',
			'background-size': '1.5em',
			'padding': `${theme.spacing[2.5]} ${theme.spacing[7]} ${theme.spacing[2.5]} ${GLOBALS.spacing.DEFAULT}`
    },
    '&.is-open .choices__inner': { 
			'border-radius': `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0` 
		},
    '.is-flipped.is-open .choices__inner': { 'border-radius': '0 0 2.5px 2.5px' },
    '.choices__list': {
			'margin': 0,
			'padding-left': 0,
			'list-style': 'none',
			'border-radius': `0 0 ${theme.borderRadius.md} ${theme.borderRadius.md}`
    },
    '.choices__list--single': {
			'font-size': theme.fontSize.sm[0],
			'line-height': 1,
			'padding': 0,
			'display': 'inline-block',
			'width': '100%'
    },
    '[dir=rtl] .choices__list--single': {
			'padding-right': '4px',
			'padding-left': '16px'
    },
    '.choices__list--single .choices__item': { 'width': '100%' },
    '.choices__list--multiple': { 
			'display': 'inline-flex',
			'gap': '6px'
		},
    '.choices__list--multiple .choices__item': {
			'border-radius': '999px',
			'padding': `${theme.spacing[1]} ${theme.spacing[3]}`,
			'font-size': '12px',
			'font-weight': theme.fontWeight.medium,
			'line-height': theme.lineHeight.tight,
			'border-width': '1px',
			'word-break': 'break-all',
			'box-sizing': 'border-box',
			'white-space': 'nowrap'
    },
    '.choices__list--multiple .choices__item[data-deletable]': {'padding-right': '5px' },
    "[dir=rtl] .choices__list--multiple .choices__item": {
			'margin-right': '0',
			'margin-left': '3.75px'
    },
    '.choices__list--dropdown, .choices__list[aria-expanded]': {
			'width': '100%',
			'top': '100%',
			'position': 'absolute',
			'margin-top': '-1px',
			'visibility': 'hidden',
			'overflow': 'hidden',
			'z-index': 1,
			'word-break': 'break-all',
			'will-change': 'visibility'
    },
    '.is-active.choices__list--dropdown, .is-active.choices__list[aria-expanded]': { 'visibility': 'visible' },
    '.is-flipped .choices__list--dropdown, .is-flipped .choices__list[aria-expanded]': {
			'top': 'auto',
			'bottom': '100%',
			'margin-top': '0',
			'margin-bottom': '-1px',
			'border-radius': '0.25rem 0.25rem 0 0'
    },
    '.choices__list--dropdown .choices__list, .choices__list[aria-expanded] .choices__list': {
			'position': 'relative',
			'max-height': '300px',
			'overflow': 'auto',
			'--webkit-overflow-scrolling': 'touch',
			'will-change': 'scroll-position'
    },
    '.choices__list--dropdown .choices__item, .choices__list[aria-expanded] .choices__item': {
			'position': 'relative',
			'padding': '10px',
			'font-size': '14px'
    },
    "[dir=rtl] .choices__list--dropdown .choices__item, [dir=rtl] .choices__list[aria-expanded] .choices__item": { 'text-align': 'right' },
    '@media (min-width: 640px)': {
			'.choices__list--dropdown .choices__item--selectable, .choices__list[aria-expanded] .choices__item--selectable': { 'padding-right': '100px' },
			'.choices__list--dropdown .choices__item--selectable::after, .choices__list[aria-expanded] .choices__item--selectable::after': {
				'content': 'attr(data-select-text)',
				'font-size': '12px',
				'opacity': 0,
				'position': 'absolute',
				'right': '10px',
				'top': '50%',
				'transform': 'translateY(-50%)'
			},
			'[dir=rtl] .choices__list--dropdown .choices__item--selectable, [dir=rtl] .choices__list[aria-expanded] .choices__item--selectable': {
				'text-align': 'right',
				'padding-left': '100px',
				'padding-right': '10px'
			},
			'[dir=rtl] .choices__list--dropdown .choices__item--selectable::after, [dir=rtl] .choices__list[aria-expanded] .choices__item--selectable::after': {
				'right': 'auto',
				'left': '10px'
			}
    },
    '.choices__list--dropdown .choices__item--selectable.is-highlighted::after, .choices__list[aria-expanded] .choices__item--selectable.is-highlighted::after': { 'opacity': '0.5' },
    '.choices__item': { 'cursor': 'default' },
    '.choices__item--selectable': { 'cursor': 'pointer' },
    '.choices__item--disabled': {
			'cursor': 'not-allowed',
			'--webkit-user-select': 'none',
			'user-select': 'none',
			'opacity': '0.5'
    },
		'&[data-type*=select-multiple] .choices__button, &[data-type*=text] .choices__button': {
			'position': 'relative',
			'display': 'inline-block',
			'margin': '0 -4px 0 8px',
			'padding-left': '16px',
			'background-image': `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==")`,
			'background-size': '8px',
			'width': '8px',
			'line-height': 1,
			'opacity': '.75',
			'border-radius': 0
		},
		'&[data-type*=select-multiple] .choices__inner': { 
			'height': '2.5rem',
			'padding': `${theme.spacing[1.5]} ${GLOBALS.spacing.DEFAULT}` 
		},
    '.choices__heading': {
			'font-weight': '600',
			'font-size': '12px',
			'padding': '10px',
			'color': 'gray'
    },
    '.choices__button': {
			'text-indent': '-9999px',
			'--webkit-appearance': 'none',
			'appearance': 'none',
			'border': 0,
			'background-color': 'transparent',
			'background-repeat': 'no-repeat',
			'background-position': 'center',
			'cursor': 'pointer'
    },
    '.choices__button:focus': { 'outline': 'none' },
    '.choices__input': {
			'display': 'inline-block',
			'vertical-align': 'baseline',
			'font-size': '14px',
			'margin-bottom': '5px',
			'border': '0',
			'border-radius': '0',
			'max-width': '100%',
			'padding': '4px 0 4px 2px'
    },
    '.choices__input:focus': { 'outline': '0' },
    '.choices__input::-webkit-search-decoration, .choices__input::-webkit-search-cancel-button, .choices__input::-webkit-search-results-button, .choices__input::-webkit-search-results-decoration': { 'display': 'none' },
    '.choices__input::-ms-clear, .choices__input::-ms-reveal': {
			'display': 'none',
			'width': '0',
			'height': '0'
    },
    "[dir=rtl] .choices__input": {
			'padding-right': '2px',
			'padding-left': '0'
    },
    '.choices__placeholder': {}
	}
}


module.exports = { FORM_SELECT_UTILITIES }