export default [
	{
		key: 'nti__parental_nutrition',
		name: 'nti__parental_nutrition',
		value: 'y',
		label: {__html: 'Nutrición parenteral'}
	},
	{
		key: 'nti__dietary_modifications',
		name: 'nti__dietary_modifications',
		value: 'y',
		label: {__html: 'Modificaciones dietéticas'}
	},
	{
		key: 'nti__son',
		name: 'nti__son',
		value: 'y',
		label: {__html: `SON, tipo de fórmula <br>
											<small>(Seleccione la definición que aplica. Si se pautan diferentes dietas, puede señalar varias)</small>`},
		options: [
			{
				key: 'nti__son__type_1',
				name: 'nti__son__option',
				value: 'Hipercalórica/Hperproteica con ingrediente Músculo Específico (HBM y/o Leucina)',
				label: 'Hipercalórica/Hperproteica con ingrediente Músculo Específico (HBM y/o Leucina)'
			},
			{
				key: 'nti__son__type_2',
				name: 'nti__son__option',
				value: 'Hipercalórica/Hiperproteica sin ingrediente Músculo Específico (HMB y/o Leucina)',
				label: 'Hipercalórica/Hiperproteica sin ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__son__type_3',
				name: 'nti__son__option',
				value: 'Normo calórica/Normoproteica sin ingrediente Músculo Específico (HMB y/o Leucina)',
				label: 'Normo calórica/Normoproteica sin ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__son__type_4',
				name: 'nti__son__option',
				value: 'Específica para Diabético Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)',
				label: 'Específica para Diabético Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__son__type_5',
				name: 'nti__son__option',
				value: 'Especifica para diabético normo calórica/normoproteica sin ingrediente Músculo Específico (HMB y Leucina)',
				label: 'Especifica para diabético normo calórica/normoproteica sin ingrediente Músculo Específico (HMB y Leucina)'
			},
			{
				key: 'nti__son__type_6',
				name: 'nti__son__option',
				value: 'Fórmulas peptídicas',
				label: 'Fórmulas peptídicas'
			},
			{
				key: 'nti__son__type_7',
				name: 'nti__son__option',
				value: 'Específica para paciente nefrópata',
				label: 'Específica para paciente nefrópata'
			},
			{
				key: 'nti__son__type_8',
				name: 'nti__son__option',
				value: 'Otras',
				label: 'Otras (especifique)'
			}
		]
	},
	{
		key: 'nti__en',
		name: 'nti__en',
		value: 'y',
		label: {__html: 'Nutrición enteral, tipo de fórmula'},
		options: [
			{
				key: 'nti__en__option_1',
				name: 'nti__en__option',
				value: 'y',
				label: 'Hipercalórica/Hiperproteica con ingrediente Músculo Especifico (HMB y/o Leucina)'
			},
			{
				key: 'nti__en__option_2',
				name: 'nti__en__option',
				value: 'y',
				label: 'Hipercalórica/Hiperproteica sin ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__en__option_3',
				name: 'nti__en__option',
				value: 'y',
				label: 'Normo calórica/Normoproteica sin ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__en__option_4',
				name: 'nti__en__option',
				value: 'y',
				label: 'Específica para Diabético Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__en__option_5',
				name: 'nti__en__option',
				value: 'y',
				label: 'Especifica para diabético normo calórica/normoproteica sin ingrediente Músculo Específico (HMB y Leucina)'
			},
			{
				key: 'nti__en__option_6',
				name: 'nti__en__option',
				value: 'y',
				label: 'Fórmulas peptídicas'
			},
			{
				key: 'nti__en__option_7',
				name: 'nti__en__option',
				value: 'y',
				label: 'Específica para paciente nefrópata'
			},
			{
				key: 'nti__en__option_8',
				name: 'nti__en__option',
				value: 'Otras',
				label: 'Otras (especifique)'
			},
		]
	},
]