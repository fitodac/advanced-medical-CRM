const theme = require('tailwindcss/defaultTheme')


const GLOBALS = {
	// textColor: 'rgb(71 85 105)', // slate-600
	textColor: 'rgb(100 116 139)', // slate-500
	fontSize: '15px',
	fontWeight: theme.fontWeight.light,
	lineHeight: '1.4',

	spacing: {
		DEFAULT: theme.spacing[3],
		y: theme.spacing[3],
		x: theme.spacing[7],
		sm: {
			x: theme.spacing[4],
			y: theme.spacing[1.5]
		},
		lg: {
			x: theme.spacing[10],
			y: theme.spacing[4],
		}
	},

	input: {
		borderColor: 'rgb(203 213 225)', // slate-300
		valid: {
			color: 'rgb(22 163 74)' // green-600
		},
		error: { 
			color: 'rgb(185 28 28)' // red-700 
		}
	},

	DARK: {
		textColor: 'rgb(241 245 249)', // slate-100
		borderColor: 'rgb(100 116 139)', // slate-500
	}
}


const FIELD_STYLE_BASE = {
	'border-width': theme.borderWidth.DEFAULT,
	'border-style': 'solid',
	'font-size': theme.fontSize.sm[0],
	'line-height': theme.fontSize.sm[1].lineHeight,
	'width': '100%',
	'max-height': theme.spacing[10],
	'padding': `${theme.spacing[2]} ${GLOBALS.spacing.DEFAULT}`,
	'border-radius': theme.borderRadius.md,
	'user-select': 'none',
}


module.exports = {
	GLOBALS,
	FIELD_STYLE_BASE
}