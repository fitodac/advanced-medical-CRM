const colorShade = (hex, type) => {
	const colorHEX = hex.replace('#','').match(/.{1,2}/g)
	const tint = ({
		100: 14,
		200: 13,
		300: 12,
		400: 11,
		600: 9,
		700: 8,
		800: 7,
		900: 6,
	})[type]

  var colorRGB = [
		parseInt(colorHEX[0], 16),
		parseInt(colorHEX[1], 16),
		parseInt(colorHEX[2], 16)
  ]

	return `rgb(${tint*colorRGB[0]/(10)}, ${tint*colorRGB[1]/10}, ${tint*colorRGB[2]/10})`
}


const colors = {
	primary: 		{ 
		50: '#D1EBFF',
		DEFAULT: '#2196F3' 
	},
	secondary: 	{ 
		50: '#F9DBFE',
		DEFAULT: '#9C27B0' 
	},
	alt: 				{ 
		50: '#FFF6DD',
		DEFAULT: '#FFC107' 
	}
}


for( let i = 100; i <= 900; i += 100 ){
	if( i !== 500 ) colors.primary[i] = colorShade(colors.primary.DEFAULT, i)
}

for( let i = 100; i <= 900; i += 100 ){
	if( i !== 500 ) colors.secondary[i] = colorShade(colors.secondary.DEFAULT, i)
}

for( let i = 100; i <= 900; i += 100 ){
	if( i !== 500 ) colors.alt[i] = colorShade(colors.alt.DEFAULT, i)
}


module.exports = colors