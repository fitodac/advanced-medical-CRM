export default {
	bioimpedanciaElectrica: {
		key: 'bi',
		name: 'bi',
		label: 'Bioimpedancia eléctrica',
		options: [
			{
				key: 'bi__hydratation',
				name: 'bi__hydratation',
				label: {__html: 'Porcentaje de hidratación'},
				append: '%'
			},
			{
				key: 'bi__tbm',
				name: 'bi__tbm',
				label: {__html: 'TBW <br>(aguacorporal total)'},
				append: 'L'
			},
			{
				key: 'bi__ecw',
				name: 'bi__ecw',
				label: {__html: 'ECW <br>(agua extracelular)'},
				append: 'L'
			},
			{
				key: 'bi__icw',
				name: 'bi__icw',
				label: {__html: 'ICW <br>(agua intracelular)'},
				append: 'L'
			},
			{
				key: 'bi__ffm',
				name: 'bi__ffm',
				label: {__html: 'FFM <br>(masa magra)'},
				append: 'kg'
			},
			{
				key: 'bi__fm',
				name: 'bi__fm',
				label: {__html: 'FM <br>(masa grasa)'},
				append: 'kg'
			},
			{
				key: 'bi__bcm',
				name: 'bi__bcm',
				label: {__html: 'BCM <br>(masa celular, kg)'},
				append: 'kg'
			},
			{
				key: 'bi__bcm_h',
				name: 'bi__bcm_h',
				label: {__html: 'BCM/h† <br>(masa celular dividido entre altura)'},
				append: 'kg/m'
			},
			{
				key: 'bi__asmm',
				name: 'bi__asmm',
				label: {__html: 'ASMM <br>(masa celular apendicular, kg)'},
				append: 'kg'
			},
			{
				key: 'bi__smi',
				name: 'bi__smi',
				label: {__html: 'SMI <br>(Índice de masa muscular, kg)'},
				append: 'kg'
			},
			{
				key: 'bi__body_fat',
				name: 'bi__body_fat',
				label: {__html: 'Grasa corporal'},
				append: '%'
			},
			{
				key: 'bi__resistance',
				name: 'bi__resistance',
				label: {__html: 'Resistencia <br>(Xc/h, Ohm)'},
				append: 'Ohm/m'
			},
			{
				key: 'bi__reactance',
				name: 'bi__reactance',
				label: {__html: 'Reactancia <br>(Xc/h, Ohm)'},
				append: 'Ohm/m'
			},
			{
				key: 'bi__phase_angle',
				name: 'bi__phase_angle',
				label: {__html: 'Ángulo de fase (PA)'},
				append: 'deg'
			},
			{
				key: 'bi__standarized_phase_angle',
				name: 'bi__standarized_phase_angle',
				label: {__html: 'Ángulo de fase estandarizado* <br>(PA/talla en m<sup>2</sup>'},
				append: null
			}
		]
	},
	
	
	dexa: {
		key: 'dexa',
		name: 'dexa',
		label: 'DEXA',
		options: [
			{
				key: 'dexa__ffm',
				name: 'dexa__ffm',
				label: 'FFM (masa magra)',
				append: 'kg'
			},
			{
				key: 'dexa__fm',
				name: 'dexa__fm',
				label: 'FFM (masa grasa)',
				append: 'kg'
			}
		]
	},
	
	
	tc: {
		key: 'tc',
		name: 'tc',
		label: 'TC',
		options: [
			{
				key: 'tc__ffm',
				name: 'tc__ffm',
				label: 'FFM (masa magra)',
				append: 'kg'
			},
			{
				key: 'tc__fm',
				name: 'tc__fm',
				label: 'FFM (masa grasa)',
				append: 'kg'
			}
		]
	},
	
	
	ecography: {
		name: 'au',
		label: 'Ecografía nutricional',
		options: {
			abdominal: [
				{
					key: 'au__total_adipose_tissue',
					name: 'au__total_adipose_tissue',
					label: 'Tejido adiposo total',
					append: 'cm'
				},
				{
					key: 'au__superficial',
					name: 'au__superficial',
					label: 'Superficial',
					append: 'cm'
				},
				{
					key: 'au__preperitoneal',
					name: 'au__preperitoneal',
					label: 'Preperitoneal',
					append: 'cm'
				}
			],
			muscular: {
				areas: [
					{
						key: 'mu__area',
						name: 'mu__area',
						label: 'Área',
						append: 'cm2'
					}
				],
				circumferences: [
					{
						key: 'mu__circumference',
						name: 'mu__circumference',
						label: 'Circunferencia',
						append: 'cm'
					}
				],
				axies: [
					{
						key: 'mu__axes_xax',
						name: 'mu__axes_xax',
						label: 'X-ax',
						append: 'cm'
					},
					{
						key: 'mu__axes_yax',
						name: 'mu__axes_yax',
						label: 'Y-ax',
						append: 'cm'
					}
				],
				adiposeTissue: [
					{
						key: 'mu__adipose_tissue',
						name: 'mu__adipose_tissue',
						label: 'Tejido adiposo',
						append: 'cm'
					}
				]
			}
		}
	}
}