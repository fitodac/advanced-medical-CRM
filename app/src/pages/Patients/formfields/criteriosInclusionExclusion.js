export default {
	criteriosDeInclusion: [
		{ 
			key: 'Personas con antecedentes de una enfermedad crónica',
			text: 'Personas con antecedentes de una enfermedad crónica',
			options: [
				{
					key: 'inclusion_q1_1',
					name: 'inclusion_q1',
					value: 'y', 
					label: 'Sí'
				}, 
				{
					key: 'inclusion_q1_2',
					name: 'inclusion_q1',
					value: '', 
					label: 'No'
				}
			]
		},
		{ 
			key: 'Edad ›18 años',
			text: 'Edad ›18 años',
			options: [
				{
					key: 'inclusion_q2_1',
					name: 'inclusion_q2',
					value: 'y', 
					label: 'Sí'
				}, 
				{
					key: 'inclusion_q2_2',
					name: 'inclusion_q2',
					value: '', 
					label: 'No'
				}
			]
		},
		{ 
			key: 'Accede a formar parte del estudio y firma el consentimiento informado',
			text: 'Accede a formar parte del estudio y firma el consentimiento informado',
			options: [
				{
					key: 'inclusion_q3_1',
					name: 'inclusion_q3',
					value: 'y', 
					label: 'Sí'
				}, 
				{
					key: 'inclusion_q3_2',
					name: 'inclusion_q3',
					value: '', 
					label: 'No'
				}
			]
		}
	],
	
	criteriosDeExclusion: [
		{
			key: 'criterios_exclusion',
			text: 'Personas que no accedan a formar parte del registro y no firmen el consentimiento informado',
			options: [
				{
					key: 'exclusion_q1_1',
					name: 'exclusion_q1',
					value: 'y', 
					label: 'Sí'
				}, 
				{
					key: 'exclusion_q1_2',
					name: 'exclusion_q1',
					value: '', 
					label: 'No'
				}
			]
		},
		{
			key: 'Personas sin diagnóstico de enfermedad crónica',
			text: 'Personas sin diagnóstico de enfermedad crónica',
			options: [
				{
					key: 'exclusion_q2_1',
					name: 'exclusion_q2',
					value: 'y', 
					label: 'Sí'
				}, 
				{
					key: 'exclusion_q2_2',
					name: 'exclusion_q2',
					value: '', 
					label: 'No'
				}
			]
		},
		{
			key: 'Personas con trastornos de la conducta alimentaria',
			text: 'Personas con trastornos de la conducta alimentaria',
			options: [
				{
					key: 'exclusion_q3_1',
					name: 'exclusion_q3',
					value: 'y', 
					label: 'Sí'
				}, 
				{
					key: 'exclusion_q3_2',
					name: 'exclusion_q3',
					value: '', 
					label: 'No'
				}
			]
		},
		{
			key: 'Personas con esperanza de vida inferior a 6 meses',
			text: 'Personas con esperanza de vida inferior a 6 meses',
			options: [
				{
					key: 'exclusion_q4_1',
					name: 'exclusion_q4',
					value: 'y', 
					label: 'Sí'
				}, 
				{
					key: 'exclusion_q4_2',
					name: 'exclusion_q4',
					value: '', 
					label: 'No'
				}
			]
		},
		{
			key: 'Demencia conocida u otros ajenos a un trastorno neurológico o psiquiátrico significativo, o cualquier otra condición psicológica que pueda interferir con el desarrollo del estudio',
			text: 'Demencia conocida u otros ajenos a un trastorno neurológico o psiquiátrico significativo, o cualquier otra condición psicológica que pueda interferir con el desarrollo del estudio',
			options: [
				{
					key: 'exclusion_q5_1',
					name: 'exclusion_q5',
					value: 'y', 
					label: 'Sí'
				}, 
				{
					key: 'exclusion_q5_2',
					name: 'exclusion_q5',
					value: '', 
					label: 'No'
				}
			]
		}
	]
}