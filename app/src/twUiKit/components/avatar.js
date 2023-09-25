const theme = require('tailwindcss/defaultTheme')


const OPTIONS = {
	'.avatar': {},
	'.avatar > img': {},
	'.avatar.rounded-full > img': {},
	'.avatar.avatar-squircle': {}
}


const BASE = {
	AVATAR: {
		'font-size': theme.fontSize.xs[0],
		'line-height': theme.fontSize.xs[1],
		'display': 'inline-grid',
		'place-content': 'center',
		'position': 'relative',
		'aspect-ratio': theme.aspectRatio.square,
		'user-select': 'none',
		'transition': theme.transitionProperty.all,
		'transition-duration': theme.transitionDuration[300],
		'vertical-align': 'top',

		ROUNDED: {
			IMAGE: { 'border-radius': theme.borderRadius.full }
		}
	},
	
	IMAGE: {
		'width': '100%',
		'height': '100%',
		'object-fit': 'cover',
		'pointer-events': 'none',
		'border-radius': theme.borderRadius.md
	},

	SQUIRCLE: {
		'mask-size': 'contain',
		'mask-repeat': 'no-repeat',
		'mask-position': 'center',
		'-webkit-mask-size': 'contain',
		'-webkit-mask-repeat': 'no-repeat',
		'-webkit-mask-position': 'center',

		'-webkit-mask-image': `url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==)`,
		'mask-image':`url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==)`
	}
}


const COMPONENTS = (addComponents, options) => {
	addComponents({
		['.avatar']: {
			...BASE.AVATAR,
			...options['.avatar'],

			['> img']: { ...BASE.IMAGE, ...options['.avatar > img'] },
			['&.rounded-full > img']: { ...BASE.AVATAR.ROUNDED.IMAGE, ...options['.avatar.rounded-full > img'] },
			['&.avatar-squircle']: { ...BASE.SQUIRCLE, ...options['.avatar.avatar-squircle'] }
		}
	})
}

module.exports = { OPTIONS, COMPONENTS }