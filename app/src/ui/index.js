const plugin = require('tailwindcss/plugin')
const colors = require('./_color')

const GLOBALS = require('./_utils')
const { BUTTON_UTILITIES } = require('./_button')
const { FORM_INPUT_UTILITIES } = require('./_form-input')
const { FORM_SELECT_UTILITIES } = require('./_form-select')
const { FORM_CHECKBOX_UTILITIES } = require('./_form-checkbox')
const { FORM_RADIO_BUTTON_UTILITIES } = require('./_form-radiobutton')
const { CONTENT_UTILITIES } = require('./_content')
const { TABLE_UTILITIES } = require('./_table')
const { LIST_GROUP_UTILITIES } = require('./_list-group')
const { BADGE_UTILITIES } = require('./_badge')
const { SPINNER_UTILITIES } = require('./_spinner')
const { AVATAR_UTILITIES } = require('./_avatar')
const { TABS_UTILITIES } = require('./_tabs')
const { MODAL_UTILITIES } = require('./_modal')
const { OVERLAY_UTILITIES } = require('./_overlay')
const { TOAST_UTILITIES } = require('./_toast')


const {
  BASE_STYLES,
  SCROLLBAR_SIZE_UTILITIES,
  addColorUtilities
} = require('./_scrollbar')

const { addVariantOverrides } = require('./variants')


module.exports = plugin.withOptions((options = {}) => tailwind => {
		tailwind.addBase({
			':root': {
				'--tw-ui-text-color': GLOBALS.textColor,
				'--tw-ui-font-size': GLOBALS.fontSize,
				'--tw-ui-font-weight': GLOBALS.fontWeight,
				'--tw-ui-line-height': GLOBALS.lineHeight,
				'--tw-ui-input-border-color': GLOBALS.input.borderColor,
				'--tw-ui-input-valid-color': GLOBALS.input.valid.color,
				'--tw-ui-input-error-color': GLOBALS.input.error.color,
				// dark
				'--tw-ui-dark-text-color': GLOBALS.DARK.textColor,
				'--tw-ui-dark-border-color': GLOBALS.DARK.borderColor,
			}
		});
		tailwind.addUtilities(BUTTON_UTILITIES);
		tailwind.addUtilities(FORM_INPUT_UTILITIES);
		tailwind.addUtilities(FORM_SELECT_UTILITIES);
		tailwind.addUtilities(FORM_CHECKBOX_UTILITIES);
		tailwind.addUtilities(FORM_RADIO_BUTTON_UTILITIES);
		tailwind.addUtilities(CONTENT_UTILITIES);
		tailwind.addUtilities(TABLE_UTILITIES);
		tailwind.addUtilities(LIST_GROUP_UTILITIES);
		tailwind.addComponents(BADGE_UTILITIES);
		tailwind.addComponents(AVATAR_UTILITIES);
		tailwind.addComponents(SPINNER_UTILITIES);
		tailwind.addComponents(TABS_UTILITIES);
		tailwind.addComponents(MODAL_UTILITIES);
		tailwind.addComponents(OVERLAY_UTILITIES);
		tailwind.addComponents(TOAST_UTILITIES);

		tailwind.addBase(BASE_STYLES);
		tailwind.addUtilities(SCROLLBAR_SIZE_UTILITIES);
		addColorUtilities(tailwind);
		addVariantOverrides(tailwind);

		// if( options.nocompatible ){
		// 	addRoundedUtilities(tailwind);
		// 	addSizeUtilities(tailwind);
		// }

		return function ({ addVariant, addComponents, theme, prefix }) {
			addComponents({
				// ...buttons
			})
		}
	},
	() => {
		return {
			theme: { 
				extend: {
					colors: colors,
					fontSize: {
						xxs: '9px'
					}
				}
			},
		}
	}
)