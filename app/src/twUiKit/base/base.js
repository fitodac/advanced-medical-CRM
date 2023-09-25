const COLORS = require('../components/color')
const { GLOBALS } = require('../utilities/utils')

const BASE = (addBase) => {
	addBase({
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
	})
}


module.exports = { BASE, COLORS }