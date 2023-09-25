const MEDIA = {

	mediaQueries: {
		'sm': 'min-width: 640px',
    'md': 'min-width: 768px',
    'lg': 'min-width: 1024px',
    'xl': 'min-width: 1280px',
    '2xl': 'min-width: 1536px',
    'short': 'max-height: 600px',
    'tall': 'min-height: 800px',
	},

	query: (mq, styles = {}) => {
		if( null === mq ) throw new Error('The TailwindCSS media query className is required, for example "md"')
		return {[`@media (${MEDIA.mediaQueries[mq]})`]: {...styles}}
	}

}

module.exports = MEDIA