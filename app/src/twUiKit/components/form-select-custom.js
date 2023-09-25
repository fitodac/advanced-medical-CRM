const theme = require('tailwindcss/defaultTheme')
const { GLOBALS, FIELD_STYLE_BASE } = require('../utilities/utils')


const OPTIONS = {
	'.choices': {},
	'.choices:focus': {},
	'.choices:last-child': {},
	'.choices.is-open': {},
	'.choices.is-disabled .choices__inner': {},
	'.choices.is-disabled .choices__input': {},
	'.choices [hidden]': {},
	'.choices[data-type=select-one]': {},
	'.choices[data-type=select-one] .choicesinput': {},
	'.choices[data-type=select-one] .choicesbutton': {},
	'.choices[data-type=select-one] .choicesbutton:focus': {},
	'.choices[data-type=select-one] .choices__button:hover': {},
	'.choices[data-type=select-one] .choicesitem[data-value=\'\'] .choicesbutton': {},
	'.choices[data-type=select-one].is-open::after': {},
	'.choices[data-type*=select-one][dir=rtl]::after': {},
	'.choices[data-type*=select-one][dir=rtl] .choices__button': {},
	'.choices[data-type*=select-multiple] .choices__inner': {},
	'.choices[data-type*=text] .choices__inner': {},
	'.choices[data-type*=select-multiple] .choices__button': {},
	'.choices[data-type*=text] .choices__button': {},
	'.choices[data-type*=select-multiple] .choices__button:hover': {},
	'.choices[data-type*=select-multiple] .choices__button:focus': {},
	'.choices[data-type*=text] .choices__button:hover': {},
	'.choices[data-type*=text] .choices__button:focus': {},
	'.choices input[type=search]': {},
	'.choices .choices__inner': {},
	'.choices [data-type*=select-one] .choices__inner': {},
	'.choices .is-open .choices__inner': {},
	'.choices.is-flipped.is-open .choices__inner': {},
	'.choices .choices__list': {},
	'.choices .choices__list--single': {},
	'.choices [dir=rtl] .choices__list--single': {},
	'.choices .choices__list--single .choices__item': {},
	'.choices .choices__list--multiple': {},
	'.choices .choices__list--multiple .choices__item': {},
	'.choices .choices__list--multiple .choices__item[data-deletable]': {},
	'.choices [dir=rtl] .choices__list--multiple .choices__item': {},
	'.choices .choices__list--dropdown': {},
	'.choices .choices__list[aria-expanded]': {},
	'.choices .is-active.choices__list--dropdown': {},
	'.choices .is-active.choices__list[aria-expanded]': {},
	'.choices .is-flipped .choices__list--dropdown': {},
	'.choices .is-flipped .choices__list[aria-expanded]': {},
	'.choices .choices__list--dropdown .choices__list': {},
	'.choices .choices__list[aria-expanded] .choices__list': {},
	'.choices .choices__list--dropdown .choices__item': {},
	'.choices .choices__list[aria-expanded] .choices__item': {},
	'.choices [dir=rtl] .choices__list--dropdown .choices__item': {},
	'.choices [dir=rtl] .choices__list[aria-expanded] .choices__item': {},
	'.choices__list--dropdown .choices__item--selectable': {},
	'.choices__list[aria-expanded] .choices__item--selectable': {},
	'.choices__list--dropdown .choices__item--selectable::after': {},
	'.choices__list[aria-expanded] .choices__item--selectable::after': {},
	'.choices [dir=rtl] .choices__list--dropdown .choices__item--selectable': {},
	'.choices [dir=rtl] .choices__list[aria-expanded] .choices__item--selectable': {},
	'.choices [dir=rtl] .choices__list--dropdown .choices__item--selectable::after': {},
	'.choices [dir=rtl] .choices__list[aria-expanded] .choices__item--selectable::after': {},
	'.choices__list--dropdown .choices__item--selectable.is-highlighted::after': {},
	'.choices__list[aria-expanded] .choices__item--selectable.is-highlighted::after': {},
	'.choices__item': {},
	'.choices__item--selectable': {},
	'.choices__item--disabled': {},
	'.choices__heading': {},
	'.choices__button': {},
	'.choices__button:focus': {},
	'.choices__input': {},
	'.choices__input:focus': {},
	'.choices__input::-webkit-search-decoration': {},
	'.choices__input::-webkit-search-cancel-button': {},
	'.choices__input::-webkit-search-results-button': {},
	'.choices__input::-webkit-search-results-decoration': {},
	'.choices__input::-ms-clear': {},
	'.choices__input::-ms-reveal': {},
	'[dir=rtl] .choices__input': {},
	'.choices__placeholder': {}
}


const BASE = {
	CHOICES: {
		'position': 'relative',
		'overflow': 'hidden',

		FOCUS: { 'outline': 'none' },
		IS_ACTIVE: {
			LIST_DROPDOWN: { 'visibility': 'visible' }
		},
		LAST_CHILD: { 'margin-bottom': 0 },
		IS_OPEN: { 
			'overflow': 'visible',

			INNER: { 'border-radius': `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0` }
		},
		DISABLED: {
			INNER: { 
				'cursor': 'not-allowed',
				'-webkit-user-select': 'none',
				'user-select': 'none'
			},
		},
		HIDDEN: { 'display': 'none !important' },
		SELECT_ONE: { 
			'cursor': 'pointer',

			INPUT: {
				'display': 'block', 
				'width': '100%', 
				'padding': '10px', 
				'border-bottom-width': '1px',  
				'margin': '0',
			},
			BUTTON: {
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

				HOVER: { opacity: '1' }
			},
			CHOICES_ITEM: {
				BUTTON: { display: 'none' }
			},
			IS_OPEN: {
				AFTER: { 'margin-top': '-7.5px' }
			},
			RTL: {
				BUTTON: {
					'right': 'auto',
					'left': '0',
					'margin-left': '25px',
					'margin-right': '0'
				},
				AFTER: {
					'left': '11.5px', 
					'right': 'auto'
				}
			}
		},
		SELECT_MULTIPLE: {
			INNER: { 'cursor': 'text' },
			BUTTON: {
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

				HOVER: { 'opacity': '1' }
			}
		},
		SEARCH: { 'display': 'none' },
		INNER: {
			...FIELD_STYLE_BASE,
			'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
			'background-position': 'right 0.5rem center',
			'background-repeat': 'no-repeat',
			'background-size': '1.5em',
			'padding': `${theme.spacing[2.5]} ${theme.spacing[7]} ${theme.spacing[2.5]} ${GLOBALS.spacing.DEFAULT}`
		},
		IS_FLIPPED: {
			INNER: { 'border-radius': '0 0 2.5px 2.5px' },
			LIST_DROPDOWN: {
				'top': 'auto',
				'bottom': '100%',
				'margin-top': '0',
				'margin-bottom': '-1px',
				'border-radius': '0.25rem 0.25rem 0 0'
			}
		},
		ITEM: {
			'cursor': 'default',

			SELECTABLE: { 'cursor': 'pointer' },
			DISABLED: {
				'cursor': 'not-allowed',
				'--webkit-user-select': 'none',
				'user-select': 'none',
				'opacity': '0.5'
			},
		},
		LIST: {
			'margin': 0,
			'padding-left': 0,
			'list-style': 'none',
			'border-radius': `0 0 ${theme.borderRadius.md} ${theme.borderRadius.md}`
		},
		LIST_SINGLE: {
			'font-size': theme.fontSize.sm[0],
			'line-height': 1,
			'padding': 0,
			'display': 'inline-block',
			'width': '100%',

			ITEM: { 'width': '100%' }
		},
		LIST_MULTIPLE: {
			'display': 'inline-flex',
			'gap': '6px',

			ITEM: {
				'border-radius': '999px',
				'padding': `${theme.spacing[1]} ${theme.spacing[3]}`,
				'font-size': '12px',
				'font-weight': theme.fontWeight.medium,
				'line-height': theme.lineHeight.tight,
				'border-width': '1px',
				'word-break': 'break-all',
				'box-sizing': 'border-box',
				'white-space': 'nowrap',

				DELETEABLE: { 'padding-right': '5px' }
			}
		},
		LIST_DROPDOWN: {
			'width': '100%',
			'top': '100%',
			'position': 'absolute',
			'margin-top': '-1px',
			'visibility': 'hidden',
			'overflow': 'hidden',
			'z-index': 1,
			'word-break': 'break-all',
			'will-change': 'visibility',

			ITEM: {
				'position': 'relative',
				'padding': '10px',
				'font-size': '14px',

				SELECTABLE: {
					'padding-right': '100px',

					AFTER: {
						'content': 'attr(data-select-text)',
						'font-size': '12px',
						'opacity': 0,
						'position': 'absolute',
						'right': '10px',
						'top': '50%',
						'transform': 'translateY(-50%)'
					},
					IS_HIGHLIGHTED: {
						AFTER: { 'opacity': '0.5' }
					}
				}
			},
			LIST: {
				'position': 'relative',
				'max-height': '300px',
				'overflow': 'auto',
				'--webkit-overflow-scrolling': 'touch',
				'will-change': 'scroll-position'
			}
		},
		RTL: {
			INPUT: {
				'padding-right': '2px',
				'padding-left': '0'
			},
			LIST_SINGLE: {
				'padding-right': '4px',
				'padding-left': '16px'
			},
			LIST_MULTIPLE: {
				ITEM: {
					'margin-right': '0',
					'margin-left': '3.75px'
				}
			},
			LIST_DROPDOWN: {
				ITEM: {
					'text-align': 'right',
					
					SELECTABLE: {
						'text-align': 'right',
						'padding-left': '100px',
						'padding-right': '10px',

						AFTER: {
							'right': 'auto',
							'left': '10px'
						}
					}
				}
			}
		},
		HEADING: {
			'font-weight': '600',
			'font-size': '12px',
			'padding': '10px',
			'color': 'gray'
		},
		BUTTON: {
			'text-indent': '-9999px',
			'--webkit-appearance': 'none',
			'appearance': 'none',
			'border': 0,
			'background-color': 'transparent',
			'background-repeat': 'no-repeat',
			'background-position': 'center',
			'cursor': 'pointer',

			FOCUS: { 'outline': 'none' }
		},
		INPUT: {
			'display': 'inline-block',
			'vertical-align': 'baseline',
			'font-size': '14px',
			'margin-bottom': '5px',
			'border': '0',
			'border-radius': '0',
			'max-width': '100%',
			'padding': '4px 0 4px 2px',

			FOCUS: { 'outline': '0' },
			WEBKIT: {
				SEARCH: { 'display': 'none' }
			},
			MS: {
				INPUT: {
					'display': 'none',
					'width': '0',
					'height': '0'
				}
			}
		}

	}
}



const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.choices']: {
			
			['&:focus']: { ...BASE.CHOICES.FOCUS, ...options['.choices:focus'] },
			['&:last-child']: { ...BASE.CHOICES.LAST_CHILD, ...options['.choices:last-child'] },
			['&.is-open']: { ...BASE.CHOICES.IS_OPEN, ...options['.choices.is-open'] },
			['&.is-disabled .choices__inner']: { ...BASE.CHOICES.DISABLED.INNER, ...options['.choices.is-disabled .choices__inner'] },
			['&.is-disabled .choices__input']: { ...BASE.CHOICES.DISABLED.INNER, ...options['.choices.is-disabled .choices__input'] },
			['& [hidden]']: { ...BASE.CHOICES.HIDDEN, ...options['.choices [hidden]'] },
			['&[data-type=select-one]']: { 
				...BASE.CHOICES.SELECT_ONE, 
				...options['.choices[data-type=select-one]'],
				
				['.choicesinput']: { ...BASE.CHOICES.SELECT_ONE.INPUT, ...options['.choices[data-type=select-one] .choicesinput'] },
				['.choicesbutton']: { 
					...BASE.CHOICES.SELECT_ONE.BUTTON, 
					...options['.choices[data-type=select-one] .choicesbutton'],

					['&:focus']: { ...BASE.CHOICES.SELECT_ONE.BUTTON.HOVER, ...options['.choices[data-type=select-one] .choicesbutton:focus'] }
				},
				['.choices__button:hover']: { ...BASE.CHOICES.SELECT_ONE.BUTTON.HOVER, ...options['.choices[data-type=select-one] .choices__button:hover'] },
				['.choicesitem[data-value=\'\'] .choicesbutton']: { ...BASE.CHOICES.SELECT_ONE.CHOICES_ITEM.BUTTON, ...options['.choices[data-type=select-one] .choicesitem[data-value=\'\'] .choicesbutton'] },
				['&[dir=rtl]::after']: { ...BASE.CHOICES.SELECT_ONE.RTL.AFTER, ...options['.choices[data-type*=select-one][dir=rtl]::after'] },
				['&.is-open::after']: { ...BASE.CHOICES.SELECT_ONE.IS_OPEN.AFTER, ...options['.choices[data-type=select-one].is-open::after'] },
				['&[dir=rtl] .choices__button']: { ...BASE.CHOICES.SELECT_ONE.RTL.BUTTON, ...options['.choices[data-type*=select-one][dir=rtl] .choices__button'] },
			},
			['&[data-type*=select-multiple]']: {
				['.choices__inner']: { ...BASE.CHOICES.SELECT_MULTIPLE.INNER, ...options['.choices[data-type*=select-multiple] .choices__inner'] },
				['.choices__button']: { ...BASE.CHOICES.SELECT_MULTIPLE.BUTTON, ...options['.choices[data-type*=select-multiple] .choices__button'] },
				['choices__button:hover']: { ...BASE.CHOICES.SELECT_MULTIPLE.BUTTON.HOVER, ...options['.choices[data-type*=select-multiple] .choices__button:hover'] },
				['.choices__button:focus']: { ...BASE.CHOICES.SELECT_MULTIPLE.BUTTON.HOVER, ...options['.choices[data-type*=select-multiple] .choices__button:focus'] },
			},
			['&[data-type*=text]']: {
				['.choices__inner']: { ...BASE.CHOICES.SELECT_MULTIPLE.INNER, ...options['.choices[data-type*=text] .choices__inner'] },
				['.choices__button']: { ...BASE.CHOICES.SELECT_MULTIPLE.BUTTON, ...options['.choices[data-type*=text] .choices__button'] },
				['.choices__button:hover']: { ...BASE.CHOICES.SELECT_MULTIPLE.BUTTON.HOVER, ...options['.choices[data-type*=text] .choices__button:hover'] },
				['.choices__button:focus']: { ...BASE.CHOICES.SELECT_MULTIPLE.BUTTON.HOVER, ...options['.choices[data-type*=text] .choices__button:focus'] },
			},
			['input[type=search]']: { ...BASE.CHOICES.SEARCH, ...options['.choices input[type=search]'] },
			['.choices__inner']: { ...BASE.CHOICES.INNER, ...options['.choices .choices__inner'] },
			['&[data-type*=select-one] .choices__inner']: { ...BASE.CHOICES.INNER, ...options['.choices [data-type*=select-one] .choices__inner'] },
			['&.is-open']: {
				['.choices__inner']: { ...BASE.CHOICES.IS_OPEN.INNER, ...options['.choices .is-open .choices__inner'] }
			},
			['&.is-flipped.is-open']: { 
				['.choices__inner']: { ...BASE.CHOICES.IS_FLIPPED.INNER, ...options['.choices.is-flipped.is-open .choices__inner'] }
			},
			['.choices__list']: { 
				...BASE.CHOICES.LIST, 
				...options['.choices .choices__list'],

				['&[aria-expanded]']: { 
					...BASE.CHOICES.LIST_DROPDOWN, 
					...options['.choices .choices__list[aria-expanded]'],

					['.choices__list']: { ...BASE.CHOICES.LIST_DROPDOWN.LIST, ...options['.choices .choices__list[aria-expanded] .choices__list'] },
					['.choices__item']: { ...BASE.CHOICES.LIST_DROPDOWN.ITEM, ...options['.choices .choices__list[aria-expanded] .choices__item'] },
				},
			},
			['.choices__list--single']: { 
				...BASE.CHOICES.LIST_SINGLE, 
				...options['.choices .choices__list--single'], 
				
				['.choices__item']: { ...BASE.CHOICES.LIST_SINGLE.ITEM, ...options['.choices .choices__list--single .choices__item'] },
			},
			['[dir=rtl]']: {
				['.choices__list--single']: { ...BASE.CHOICES.RTL.LIST_SINGLE, ...options['.choices [dir=rtl] .choices__list--single'] },
				['.choices__list--multiple .choices__item']: { ...BASE.CHOICES.RTL.LIST_MULTIPLE.ITEM, ...options['.choices [dir=rtl] .choices__list--multiple .choices__item'] },
				['.choices__list--dropdown .choices__item']: { ...BASE.CHOICES.RTL.LIST_DROPDOWN.ITEM, ...options['.choices [dir=rtl] .choices__list--dropdown .choices__item'] },
				['.choices__list[aria-expanded] .choices__item']: { ...BASE.CHOICES.RTL.LIST_DROPDOWN.ITEM, ...options['.choices [dir=rtl] .choices__list[aria-expanded] .choices__item'] },
				['.choices__input']: { ...BASE.CHOICES.RTL.INPUT, ...options['[dir=rtl] .choices__input'] },
			},
			['.choices__list--multiple']: {
				...BASE.CHOICES.LIST_MULTIPLE,
				...options['.choices .choices__list--multiple'],

				['.choices__item']: { ...BASE.CHOICES.LIST_MULTIPLE.ITEM, ...options['.choices .choices__list--multiple .choices__item'] },
				['.choices__item[data-deletable]']: { ...BASE.CHOICES.LIST_MULTIPLE.ITEM.DELETEABLE, ...options['.choices .choices__list--multiple .choices__item[data-deletable]'] },
			},
			['.choices__list--dropdown']: { 
				...BASE.CHOICES.LIST_DROPDOWN, 
				...options['.choices .choices__list--dropdown'],
				
				['.choices__item--selectable.is-highlighted::after']: { ...BASE.CHOICES.LIST_DROPDOWN.ITEM.SELECTABLE.IS_HIGHLIGHTED.AFTER, ...options['.choices .choices__list--dropdown .choices__item--selectable.is-highlighted::after'] },
				['.choices__item']: { ...BASE.CHOICES.LIST_DROPDOWN.ITEM, ...options['.choices .choices__list--dropdown .choices__item'] },
				['.choices__list']: { ...BASE.CHOICES.LIST_DROPDOWN.LIST, ...options['.choices .choices__list--dropdown .choices__list'] },
			},
			['.is-active.choices__list--dropdown']: { ...BASE.CHOICES.IS_ACTIVE.LIST_DROPDOWN, ...options['.choices .is-active.choices__list--dropdown'] },
			['.is-active.choices__list[aria-expanded]']: { ...BASE.CHOICES.IS_ACTIVE.LIST_DROPDOWN, ...options['.choices .is-active.choices__list[aria-expanded]'] },
			['.is-flipped .choices__list--dropdown']: { ...BASE.CHOICES.IS_FLIPPED.LIST_DROPDOWN, ...options['.choices .is-flipped .choices__list--dropdown'] },
			['.is-flipped .choices__list[aria-expanded]']: { ...BASE.CHOICES.IS_FLIPPED.LIST_DROPDOWN, ...options['.choices .is-flipped .choices__list[aria-expanded]'] },
			['@media (min-width: 640px)']: {
				['.choices__list--dropdown .choices__item--selectable']: { ...BASE.CHOICES.LIST_DROPDOWN.ITEM.SELECTABLE, ...options['.choices .choices__list--dropdown .choices__item--selectable'] },
				['.choices__list[aria-expanded] .choices__item--selectable']: { ...BASE.CHOICES.LIST_DROPDOWN.ITEM.SELECTABLE, ...options['.choices__list[aria-expanded] .choices__item--selectable'] },
				['.choices__list--dropdown .choices__item--selectable::after']: { ...BASE.CHOICES.LIST_DROPDOWN.ITEM.SELECTABLE.AFTER, ...options['.choices .choices__list--dropdown .choices__item--selectable::after'] },
				['.choices__list[aria-expanded] .choices__item--selectable::after']: { ...BASE.CHOICES.LIST_DROPDOWN.ITEM.SELECTABLE.AFTER, ...options['.choices__list[aria-expanded] .choices__item--selectable::after'] },
				['[dir=rtl] .choices__list--dropdown .choices__item--selectable']: { ...BASE.CHOICES.RTL.LIST_DROPDOWN.ITEM.SELECTABLE, ...options['.choices [dir=rtl] .choices__list--dropdown .choices__item--selectable'] },
				['[dir=rtl] .choices__list[aria-expanded] .choices__item--selectable']: { ...BASE.CHOICES.RTL.LIST_DROPDOWN.ITEM.SELECTABLE, ...options['.choices [dir=rtl] .choices__list[aria-expanded] .choices__item--selectable'] },
				['[dir=rtl] .choices__list--dropdown .choices__item--selectable::after']: { ...BASE.CHOICES.RTL.LIST_DROPDOWN.ITEM.SELECTABLE.AFTER, ...options['.choices [dir=rtl] .choices__list--dropdown .choices__item--selectable::after'] },
				['[dir=rtl] .choices__list[aria-expanded] .choices__item--selectable::after']: { ...BASE.CHOICES.RTL.LIST_DROPDOWN.ITEM.SELECTABLE.AFTER, ...options['.choices [dir=rtl] .choices__list[aria-expanded] .choices__item--selectable::after'] },
			},
			['.choices__list[aria-expanded] .choices__item--selectable.is-highlighted::after']: { ...BASE.CHOICES.LIST_DROPDOWN.ITEM.SELECTABLE.IS_HIGHLIGHTED.AFTER, ...options['.choices__list[aria-expanded] .choices__item--selectable.is-highlighted::after'] },
			['.choices__item']: { ...BASE.CHOICES.ITEM, ...options['.choices__item'] },
			['.choices__item--selectable']: { ...BASE.CHOICES.ITEM.SELECTABLE, ...options['.choices__item--selectable'] },
			['.choices__item--disabled']: { ...BASE.CHOICES.ITEM.DISABLED, ...options['.choices__item--disabled'] },
			['.choices__heading']: { ...BASE.CHOICES.HEADING, ...options['.choices__heading'] },
			['.choices__button']: { ...BASE.CHOICES.BUTTON, ...options['.choices__button'] },
			['.choices__button:focus']: { ...BASE.CHOICES.BUTTON.FOCUS, ...options['.choices__button:focus'] },
			['.choices__input']: { 
				...BASE.CHOICES.INPUT, 
				...options['.choices__input'],

				['&:focus']: { ...BASE.CHOICES.INPUT.FOCUS, ...options['.choices__input:focus'] },
				['&::-webkit-search-decoration']: { ...BASE.CHOICES.INPUT.WEBKIT.SEARCH, ...options['.choices__input::-webkit-search-decoration'] },
				['&::-webkit-search-cancel-button']: { ...BASE.CHOICES.INPUT.WEBKIT.SEARCH, ...options['.choices__input::-webkit-search-cancel-button'] },
				['&::-webkit-search-results-button']: { ...BASE.CHOICES.INPUT.WEBKIT.SEARCH, ...options['.choices__input::-webkit-search-results-button'] },
				['&::-webkit-search-results-decoration']: { ...BASE.CHOICES.INPUT.WEBKIT.SEARCH, ...options['.choices__input::-webkit-search-results-decoration'] },
				['&::-ms-clear']: { ...BASE.CHOICES.INPUT.MS.INPUT, ...options['.choices__input::-ms-clear'] },
				['&::-ms-reveal']: { ...BASE.CHOICES.INPUT.MS.INPUT, ...options['.choices__input::-ms-reveal'] },
			},
			['.choices__placeholder']: { ...options['.choices__placeholder'] }
		}
	})
}

module.exports = { OPTIONS, COMPONENTS }