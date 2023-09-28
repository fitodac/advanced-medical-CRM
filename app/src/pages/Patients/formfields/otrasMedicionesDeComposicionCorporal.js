export default {
	bioimpedanciaElectrica: {
		name: 'bi',
		label: 'Bioimpedancia eléctrica',
		options: [
			{
				name: 'bi__hydratation',
				label: {__html: 'Porcentaje de hidratación'},
				append: '%'
			},
			{
				name: 'bi__tbm',
				label: {__html: 'TBW <br>(aguacorporal total)'},
				append: 'L'
			},
			{
				name: 'bi__ecw',
				label: {__html: 'ECW <br>(agua extracelular)'},
				append: 'L'
			},
			{
				name: 'bi__icw',
				label: {__html: 'ICW <br>(agua intracelular)'},
				append: 'L'
			},
			{
				name: 'bi__ffm',
				label: {__html: 'FFM <br>(masa magra)'},
				append: 'kg'
			},
			{
				name: 'bi__fm',
				label: {__html: 'FM <br>(masa grasa)'},
				append: 'kg'
			},
			{
				name: 'bi__bcm',
				label: {__html: 'BCM <br>(masa celular, kg)'},
				append: 'kg'
			},
			{
				name: 'bi__bcm_h',
				label: {__html: 'BCM/h† <br>(masa celular dividido entre altura)'},
				append: 'kg/m'
			},
			{
				name: 'bi__asmm',
				label: {__html: 'ASMM <br>(masa celular apendicular, kg)'},
				append: 'kg'
			},
			{
				name: 'bi__smi',
				label: {__html: 'SMI <br>(Índice de masa muscular, kg)'},
				append: 'kg'
			},
			{
				name: 'bi__body_fat',
				label: {__html: 'Grasa corporal'},
				append: '%'
			},
			{
				name: 'bi__resistance',
				label: {__html: 'Resistencia <br>(Xc/h, Ohm)'},
				append: 'Ohm/m'
			},
			{
				name: 'bi__reactance',
				label: {__html: 'Reactancia <br>(Xc/h, Ohm)'},
				append: 'Ohm/m'
			},
			{
				name: 'bi__phase_angle',
				label: {__html: 'Ángulo de fase (PA)'},
				append: 'deg'
			},
			{
				name: 'bi__standarized_phase_angle',
				label: {__html: 'Ángulo de fase estandarizado* <br>(PA/talla en m<sup>2</sup>'},
				append: null
			}
		]
	},
	
	
	dexa: [
		{
			name: 'dexa',
			label: 'DEXA',
			options: [
				{
					name: 'dexa__ffm',
					label: 'FFM (masa magra)',
					append: 'kg'
				},
				{
					name: 'dexa__fm',
					label: 'FFM (masa grasa)',
					append: 'kg'
				}
			]
		}
	],
	
	
	tc: [
		{
			name: 'tc',
			label: 'TC',
			options: [
				{
					name: 'tc__ffm',
					label: 'FFM (masa magra)',
					append: 'kg'
				},
				{
					name: 'tc__fm',
					label: 'FFM (masa grasa)',
					append: 'kg'
				}
			]
		}
	],
	
	
	ecography: [
		{
			name: 'au',
			label: 'Ecografía nutricional',
			options: {
				abdominal: [
					{
						name: 'au__total_adipose_tissue',
						label: 'Tejido adiposo total',
						append: 'cm'
					},
					{
						name: 'au__superficial',
						label: 'Superficial',
						append: 'cm'
					},
					{
						name: 'au__preperitoneal',
						label: 'Preperitoneal',
						append: 'cm'
					}
				],
				muscular: {
					areas: [
						{
							name: 'mu__area',
							label: 'Área',
							append: 'cm2'
						}
					],
					circumferences: [
						{
							name: 'mu__circumference',
							label: 'Circunferencia',
							append: 'cm'
						}
					],
					axies: [
						{
							name: 'mu__axes_xax',
							label: 'X-ax',
							append: 'cm'
						},
						{
							name: 'mu__axes_yax',
							label: 'Y-ax',
							append: 'cm'
						}
					],
					adiposeTissue: [
						{
							name: 'mu__adipose_tissue',
							label: 'Tejido adiposo',
							append: 'cm'
						}
					]
				}
			}
		}
	]
}