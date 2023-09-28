export default {
	criteriosDeInclusion: [
		{ 
			text: 'Personas con antecedentes de una enfermedad crónica',
			options: [
				{value: 'Sí', label: 'Sí'}, 
				{value: 'No', label: 'No'}
			]
		},
		{ 
			text: 'Edad ›18 años',
			options: [
				{value: 'Sí', label: 'Sí'}, 
				{value: 'No', label: 'No'}
			]
		},
		{ 
			text: 'Accede a formar parte del estudio y firma el consentimiento informado',
			options: [
				{value: 'Sí', label: 'Sí'}, 
				{value: 'No', label: 'No'}
			]
		}
	],
	
	criteriosDeExclusion: [
		{
			text: 'Personas que no accedan a formar parte del registro y no firmen el consentimiento informado',
			options: [
				{value: 'Sí', label: 'Sí'}, 
				{value: 'No', label: 'No'}
			]
		},
		{
			text: 'Personas sin diagnóstico de enfermedad crónica',
			options: [
				{value: 'Sí', label: 'Sí'}, 
				{value: 'No', label: 'No'}
			]
		},
		{
			text: 'Personas con trastornos de la conducta alimentaria',
			options: [
				{value: 'Sí', label: 'Sí'}, 
				{value: 'No', label: 'No'}
			]
		},
		{
			text: 'Personas con esperanza de vida inferior a 6 meses',
			options: [
				{value: 'Sí', label: 'Sí'}, 
				{value: 'No', label: 'No'}
			]
		},
		{
			text: 'Demencia conocida u otros ajenos a un trastorno neurológico o psiquiátrico significativo, o cualquier otra condición psicológica que pueda interferir con el desarrollo del estudio',
			options: [
				{value: 'Sí', label: 'Sí'}, 
				{value: 'No', label: 'No'}
			]
		}
	]
}