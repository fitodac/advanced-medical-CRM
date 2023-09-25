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
	],

	antecedentesMedicos: [
		{ value: 'Diabetes', label: 'Diabetes' },
		{ value: 'EPOC', label: 'EPOC' },
		{ value: 'Insuficiencia cardíaca', label: 'Insuficiencia cardíaca' },
		{ value: 'Cáncer, incluyendo neoplasias hematológicas', label: 'Cáncer, incluyendo neoplasias hematológicas' },
		{ value: 'Enfermedad neurológica', label: 'Enfermedad neurológica' },
		{ value: 'Enfermedades hepáticas', label: 'Enfermedades hepáticas' },
		{ value: 'Enfermedad inflamatoria intestinal', label: 'Enfermedad inflamatoria intestinal' },
		{ value: 'Insuficiencia renal crónica', label: 'Insuficiencia renal crónica' },
		{ value: 'Otras enfermedades crónicas', label: 'Otras enfermedades crónicas' },
		{ value: 'Otros', label: 'Otros (especifique)' }
	],

	fechaDeValoracion: [
		{ value: 'Hospitalización, expecifique motivo de ingreso', label: 'Hospitalización, expecifique motivo de ingreso' },
		{ value: 'Visita programada en consulta externa/planta', label: 'Visita programada en consulta externa/planta' }
	],

	antropometria: [],
	cribadoNutricional: [
		{ value: 'MUST', label: 'MUST' },
		{ value: 'NRS-2002', label: 'NRS-2002' },
		{ value: 'MNA-SF', label: 'MNA-SF' },
		{ value: 'MIS', label: 'MIS' },
		{ value: 'SNAQ', label: 'SNAQ' },
		{ value: 'CONUT', label: 'CONUT' },
		{ value: 'Otro', label: 'Otro (especifique)' },
	],
	resultadoDeCribadoNutricional: [
		{ value: 'No', label: 'No' },
		{ value: 'Sí', label: 'Sí' }
	],
	cribadoMuscular: [
		{ value: 'SARC-F', label: 'SARC-F' },
		{ value: 'Otro', label: 'Otro (especifique)' }
	],
	pacienteEnRiesgoDeSarcopenia: [
		{ value: 'No', label: 'No' },
		{ value: 'Sí', label: 'Sí' }
	],
	diagnosticoNutricionalUtilizado: [
		{ value: 'GLIM', label: 'GLIM' },
		{ value: 'MNA', label: 'MNA' },
		{ value: 'VGS', label: 'VGS' },
		{ value: 'Otro', label: 'Otro (especifique)' },
	],
	resultadoDeLaValoracionNutricional: [
		{ value: 'No', label: 'No' },
		{ value: 'En riesgo', label: 'En riesgo' },
		{ value: 'Sí', label: 'Sí (especifique)' }
	],
	
}