export default [
	{ 
		key: 'patient_current_situation_1',
		name: 'patient_current_situation',
		value: 'Alta', 
		label: {__html: 'Alta'}
	},
	{
		key: 'patient_current_situation_2',
		name: 'patient_current_situation',
		value: 'Reingreso', 
		label: {__html: 'Reingreso'}
	},
	{
		key: 'patient_current_situation_3',
		name: 'patient_current_situation',
		value: 'Deceso', 
		label: {__html: 'Deceso'}
	},
	{
		key: 'patient_current_situation_4',
		name: 'patient_current_situation',
		value: 'No acude a control', 
		label: {__html: `<span class="block">No acude a control</span>
										<span class="text-xs block">(contactar telefónicamente para descartar cualquier otra circunstancia)</span>`}
	}
]