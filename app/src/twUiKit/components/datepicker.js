const theme = require('tailwindcss/defaultTheme')

const OPTIONS = {
	'.datepicker': {},
	'.datepicker .datepicker:not(.active)': {},
	'.datepicker .datepicker-picker': {},
	'.datepicker .datepicker-header': {},
	'.datepicker .datepicker-controls .prev-button': {},
	'.datepicker .datepicker-controls .next-button': {},
	'.datepicker .datepicker-controls': {},
	'.datepicker .datepicker-controls .button': {},
	'.datepicker .datepicker-controls .button:focus': {},
	'.datepicker .datepicker-controls .button:active': {},
	'.datepicker .datepicker-controls .button[disabled]': {},
	'.datepicker .datepicker-main': {},
	'.datepicker .datepicker-main .datepicker-view': {},
	'.datepicker .datepicker-main .datepicker-view .days': {},
	'.datepicker .datepicker-main .datepicker-view .days .days-of-week': {},
	'.datepicker .datepicker-main .datepicker-view .days .dow': {},
	'.datepicker .datepicker-main .datepicker-view .months': {},
	'.datepicker .datepicker-main .datepicker-view .years': {},
	'.datepicker .datepicker-main .datepicker-grid': {},
	'.datepicker .datepicker-main .datepicker-grid .datepicker-cell': {},
	'.datepicker .datepicker-main .datepicker-grid .datepicker-cell:not(.day)': {},
	'.datepicker .datepicker-main .datepicker-grid .datepicker-cell:not(.disabled):hover': {},
	'.datepicker .datepicker-main .datepicker-grid .datepicker-cell.highlighted:not(.selected):not(.range):not(.today)': {},
	'.datepicker .datepicker-main .datepicker-grid .datepicker-cell.range-start:not(.range-end)': {},
	'.datepicker .datepicker-main .datepicker-grid .datepicker-cell.range-end:not(.range-start)': {},
	'.datepicker .datepicker-main .datepicker-grid .datepicker-cell.range': {},
	'.datepicker .datepicker-picker.datepicker-dropdown': {},
	'.datepicker .datepicker-picker.datepicker-dropdown.datepicker-orient-top': {},
	'.datepicker .datepicker-footer': {},
	'.datepicker .datepicker-title': {}
}


const BASE = {
	DATEPICKER: {
		'max-width': 'min-content',

		NOT: {
			ACTIVE: { 'display': 'none' }
		},
		DATE_PICKER: {
			'display': 'grid',
			'user-select': 'none',
			'border-radius': theme.borderRadius.md,

			HEADER: { 
				'display': 'flex',

				CONTROLS: {
					BTN_PREV: {
						'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z' fill='rgba(71,85,105,1)'%3E%3C/path%3E%3C/svg%3E")`,
						'background-size': '20px',
						'background-position': 'center',
						'background-repeat': 'no-repeat',
						'font-size': 0,
						'text-indent': '-100vw',
						'height': '100%',
						'padding': 0
					},
					BTN_NEXT: {
						'background-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z' fill='rgba(71,85,105,1)'%3E%3C/path%3E%3C/svg%3E")`,
						'background-size': '20px',
						'background-position': 'center',
						'background-repeat': 'no-repeat',
						'font-size': 0,
						'text-indent': '-100vw',
						'height': '100%',
						'padding': 0
					}
				}
			},

			CONTROLS: {
				'display': 'flex',
				'flex': 1,

				BTN: {
					'display': 'inline-flex',
					'position': 'relative',
					'align-items': 'center',
					'justify-content': 'center',
					'margin': 0,
					'box-shadow': 'none',
					'cursor': 'pointer',
					'padding': 'calc(0.375em - 1px) 0.75em',
					'height': '2.25em',
					'vertical-align': 'top',
					'text-align': 'center',
					'line-height': theme.lineHeight.normal,
					'white-space': 'nowrap',
					'font-size': '1rem',
					'font-weight': '500',
					'flex': 1,

					FOCUS: { 'outline': 'none' },
					DISABLED: { 'cursor': 'not-allowed' }
				}
			},

			MAIN: {
				'flex': 'auto',
				'padding': '2px',

				VIEW: {
					'align-items': 'stretch',
					'width': '15.75rem',
					'display': 'flex',

					DAYS: {
						'display': 'flex',
						'flex-direction': 'column',
						'flex': 'auto',

						DAYS_OF_WEEK: { 'display': 'flex' },
						DOW: {
							'height': '1.5rem',
							'font-size': '0.875rem',
							'font-weight': 700,
							'flex-basis': '14.2857142857%'
						},
						MONTHS:{
							'display': 'grid',
							'grid-template-columns': 'repeat(3, minmax(0, 1fr))'
						},
						YEARS: {
							'display': 'grid',
							'grid-template-columns': 'repeat(3, minmax(0, 1fr))'
						}
					}
				}
			},

			GRID: {
				'display': 'grid',
				'grid-template-columns': 'repeat(7, minmax(0, 1fr))',
				'flex-wrap': 'wrap',
				'flex': 'auto',

				CELL: {
					'height': '2.25rem',

					NOT: {
						DAY: {
							'flex-basis': '25%',
							'height': '3.5rem'
						},
						DISABLED: {
							HOVER: { 'cursor': 'pointer' }
						}
					},
					HIGHLIGHTED: {
						NOT: {
							TODAY: {
								'border-radius': 0,
								'background-color': 'hsl(0, 0%, 96%)'
							}
						}
					},
					RANGE_START: { 'border-radius': '4px 0 0 4px' },
					RANGE_END: { 'border-radius': '0 4px 4px 0' },
					RANGE: { 'border-radius': 0 }
				}
			}
		},
		DROPDOWN: {
			'position': 'absolute',
			'z-index': 20,

			ORIENTED_TOP: {
				'padding-top': 0,
				'padding-bottom': '4px'
			}
		},
		FOOTER: { 'box-shadow': 'inset 0 1px 1px rgba(10, 10, 10, 0.1)' },
		TITLE: {
			'font-weight': '600',
			'text-align': 'center',
			'padding': '0.375rem 0.75rem',
			'box-shadow': 'inset 0 -1px 1px rgba(10, 10, 10, 0.1)',
		}
	}
}



const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.datepicker']: { 
			...BASE.DATEPICKER,
			...options['.datepicker'],

			['&:not(.active)']: { ...BASE.DATEPICKER.NOT.ACTIVE, ...options['.datepicker .datepicker:not(.active)'] },

			['.datepicker-picker']: {
				...BASE.DATEPICKER.DATE_PICKER,
				...options['.datepicker .datepicker-picker'],

				['.datepicker-header']: {
					...BASE.DATEPICKER.DATE_PICKER.HEADER,
					...options['.datepicker .datepicker-header'],

					['.datepicker-controls']: {
						['.button']: {
							['&.prev-button']: { ...BASE.DATEPICKER.DATE_PICKER.HEADER.CONTROLS.BTN_PREV, ...options['.datepicker .datepicker-controls .prev-button'] },
							['&.next-button']: { ...BASE.DATEPICKER.DATE_PICKER.HEADER.CONTROLS.BTN_NEXT, ...options['.datepicker .datepicker-controls .next-button'] }
						}
					}
				},

				['.datepicker-controls']: {
					...BASE.DATEPICKER.DATE_PICKER.CONTROLS,
					...options['.datepicker .datepicker-controls'],
					
					['.button']: {
						...BASE.DATEPICKER.DATE_PICKER.CONTROLS.BTN,
						...options['.datepicker .datepicker-controls .button'],

						['&:focus']: { ...BASE.DATEPICKER.DATE_PICKER.CONTROLS.BTN.FOCUS, ...options['.datepicker .datepicker-controls .button:focus'] },
						['&:active']: { ...BASE.DATEPICKER.DATE_PICKER.CONTROLS.BTN.FOCUS, ...options['.datepicker .datepicker-controls .button:active'] },
						['&[disabled]']: { ...BASE.DATEPICKER.DATE_PICKER.CONTROLS.BTN.DISABLED, ...options['.datepicker .datepicker-controls .button[disabled]'] }
					}
				},

				['.datepicker-main']: {
					...BASE.DATEPICKER.DATE_PICKER.MAIN,
					...options['.datepicker .datepicker-main'],

					['.datepicker-view']: { 
						...BASE.DATEPICKER.DATE_PICKER.MAIN.VIEW,
						...options['.datepicker .datepicker-main .datepicker-view'],

						['.days']: {
							...BASE.DATEPICKER.DATE_PICKER.MAIN.VIEW.DAYS,
							...options['.datepicker .datepicker-main .datepicker-view .days'],

							['.days-of-week']: { ...BASE.DATEPICKER.DATE_PICKER.MAIN.VIEW.DAYS.DAYS_OF_WEEK, ...options['.datepicker .datepicker-main .datepicker-view .days .days-of-week'] },
							['.dow']: { ...BASE.DATEPICKER.DATE_PICKER.MAIN.VIEW.DAYS.DOW, ...options['.datepicker .datepicker-main .datepicker-view .days .dow'] },
						},

						['.months']: { ...BASE.DATEPICKER.DATE_PICKER.MAIN.VIEW.DAYS.MONTHS, ...options['.datepicker .datepicker-main .datepicker-view .months'] },
						['.years']: { ...BASE.DATEPICKER.DATE_PICKER.MAIN.VIEW.DAYS.YEARS, ...options['.datepicker .datepicker-main .datepicker-view .years'] }
					},

					['.datepicker-grid']: {
						...BASE.DATEPICKER.DATE_PICKER.GRID,
						...options['.datepicker .datepicker-main .datepicker-grid'],

						['.datepicker-cell']: {
							...BASE.DATEPICKER.DATE_PICKER.GRID.CELL,
							...options['.datepicker .datepicker-main .datepicker-grid .datepicker-cell'],

							['&:not(.day)']: { ...BASE.DATEPICKER.DATE_PICKER.GRID.CELL.NOT.DAY, ...options['.datepicker .datepicker-main .datepicker-grid .datepicker-cell:not(.day)'] },
							['&:not(.disabled):hover']: { ...BASE.DATEPICKER.DATE_PICKER.GRID.CELL.NOT.DISABLED.HOVER, ...options['.datepicker .datepicker-main .datepicker-grid .datepicker-cell:not(.disabled):hover'] },
							['&.highlighted:not(.selected):not(.range):not(.today)']: { ...BASE.DATEPICKER.DATE_PICKER.GRID.CELL.HIGHLIGHTED.NOT.TODAY, ...options['.datepicker .datepicker-main .datepicker-grid .datepicker-cell.highlighted:not(.selected):not(.range):not(.today)'] },
							['&.range-start:not(.range-end)']: { ...BASE.DATEPICKER.DATE_PICKER.GRID.CELL.RANGE_START, ...options['.datepicker .datepicker-main .datepicker-grid .datepicker-cell.range-start:not(.range-end)'] },
							['&.range-end:not(.range-start)']: { ...BASE.DATEPICKER.DATE_PICKER.GRID.CELL.RANGE_END, ...options['.datepicker .datepicker-main .datepicker-grid .datepicker-cell.range-end:not(.range-start)'] },
							['&.range']: { ...BASE.DATEPICKER.DATE_PICKER.GRID.CELL.RANGE, ...options['.datepicker .datepicker-main .datepicker-grid .datepicker-cell.range'] },
						}
					}
				},

			},

			['&.datepicker-dropdown']: {
				...BASE.DATEPICKER.DROPDOWN,
				...options['.datepicker .datepicker-picker.datepicker-dropdown'],

				['&.datepicker-orient-top']: { ...BASE.DATEPICKER.DROPDOWN.ORIENTED_TOP, ...options['.datepicker .datepicker-picker.datepicker-dropdown.datepicker-orient-top'] }
			},

			['.datepicker-footer']: { ...BASE.DATEPICKER.FOOTER, ...options['.datepicker .datepicker-footer'] },
			['.datepicker-title']: { ...BASE.DATEPICKER.TITLE, ...options['.datepicker .datepicker-title'] }
		}
	})
}



module.exports = { OPTIONS, COMPONENTS }