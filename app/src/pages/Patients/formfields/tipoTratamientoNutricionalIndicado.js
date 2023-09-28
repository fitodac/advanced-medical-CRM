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
				key: 'nti__son__hc_with_smi',
				name: 'nti__son__hc_with_smi',
				value: 'y',
				label: 'Hipercalórica/Hperproteica con ingrediente Músculo Específico (HBM y/o Leucina)'
			},
			{
				key: 'nti__son__hc_without_smi',
				name: 'nti__son__hc_without_smi',
				value: 'y',
				label: 'Hipercalórica/Hiperproteica sin ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__son__nc_without_smi',
				name: 'nti__son__nc_without_smi',
				value: 'y',
				label: 'Normo calórica/Normoproteica sin ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__son__diabetics_hypercaloric',
				name: 'nti__son__diabetics_hypercaloric',
				value: 'y',
				label: 'Específica para Diabético Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__son__normal_normoprotein_without_msi',
				name: 'nti__son__normal_normoprotein_without_msi',
				value: 'y',
				label: 'Especifica para diabético normo calórica/normoproteica sin ingrediente Músculo Específico (HMB y Leucina)'
			},
			{
				key: 'nti__son__peptide_formulas',
				name: 'nti__son__peptide_formulas',
				value: 'y',
				label: 'Fórmulas peptídicas'
			},
			{
				key: 'nti__son__snp',
				name: 'nti__son__snp',
				value: 'y',
				label: 'Específica para paciente nefrópata'
			},
		]
	},
	{
		key: 'nti__en',
		name: 'nti__en',
		value: '',
		label: {__html: 'Nutrición enteral, tipo de fórmula'},
		options: [
			{
				key: 'nti__en__hypercaloric_with_msi',
				name: 'nti__en__hypercaloric_with_msi',
				value: 'y',
				label: 'Hipercalórica/Hiperproteica con ingrediente Músculo Especifico (HMB y/o Leucina)'
			},
			{
				key: 'nti__en__hypercaloric_without_msi',
				name: 'nti__en__hypercaloric_without_msi',
				value: 'y',
				label: 'Hipercalórica/Hiperproteica sin ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__en__caloric_without_msi',
				name: 'nti__en__caloric_without_msi',
				value: 'y',
				label: 'Normo calórica/Normoproteica sin ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__en__specific_diabetics_with_smi',
				name: 'nti__en__specific_diabetics_with_smi',
				value: 'y',
				label: 'Específica para Diabético Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)'
			},
			{
				key: 'nti__en__normal_calorie_without_smi',
				name: 'nti__en__normal_calorie_without_smi',
				value: 'y',
				label: 'Especifica para diabético normo calórica/normoproteica sin ingrediente Músculo Específico (HMB y Leucina)'
			},
			{
				key: 'nti__en__peptide_formulas',
				name: 'nti__en__peptide_formulas',
				value: 'y',
				label: 'Fórmulas peptídicas '
			},
			{
				key: 'nti__en__snp',
				name: 'nti__en__snp',
				value: 'y',
				label: 'Específica para paciente nefrópata '
			},
		]
	},
]