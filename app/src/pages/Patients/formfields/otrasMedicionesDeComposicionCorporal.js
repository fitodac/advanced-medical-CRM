export default {
	bioimpedanciaElectrica: [
		{
			name: 'bi',
			label: 'Bioimpedancia eléctrica',
			options: [
				{
					name: 'bi__hydratation',
					label: 'Porcentaje de hidratación',
					append: '%'
				},
				{
					name: 'bi__tbm',
					label: 'TBW (aguacorporal total)',
					append: 'L'
				},
				{
					name: 'bi__ecw',
					label: 'ECW (agua extracelular)',
					append: 'L'
				},
				{
					name: 'bi__icw',
					label: 'ICW (agua intracelular)',
					append: 'L'
				},
				{
					name: 'bi__ffm',
					label: 'FFM (masa magra)',
					append: 'kg'
				},
				{
					name: 'bi__fm',
					label: 'FM (masa grasa)',
					append: 'kg'
				},
				{
					name: 'bi__bcm',
					label: 'BCM (masa celular, kg)',
					append: 'kg'
				},
				{
					name: 'bi__bcm_h',
					label: 'BCM/h† (masa celular dividido entre altura)',
					append: 'kg/m'
				},
				{
					name: 'bi__asmm',
					label: 'ASMM (masa celular apendicular, kg)',
					append: 'kg'
				},
				{
					name: 'bi__smi',
					label: 'SMI (Índice de masa muscular, kg)',
					append: 'kg'
				},
				{
					name: 'bi__body_fat',
					label: 'Grasa corporal',
					append: '%'
				},
				{
					name: 'bi__resistance',
					label: 'Resistencia (Xc/h, Ohm)',
					append: 'Ohm/m'
				},
				{
					name: 'bi__reactance',
					label: 'Reactancia (Xc/h, Ohm)',
					append: 'Ohm/m'
				},
				{
					name: 'bi__phase_angle',
					label: 'Ángulo de fase (PA)',
					append: 'deg'
				},
				{
					name: 'bi__standarized_phase_angle',
					label: 'Ángulo de fase estandarizado* (PA/talla en m2)',
					append: null
				}
			]
		}
	],
	
	
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
							name: '',
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