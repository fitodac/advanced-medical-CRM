<?php 
$headers = [
	"id",
	"Código paciente",
	"Código centro médico",
	"Centro médico",
	"Doctor",
	"Especialidad",

	/**
	 * INITIAL
	 */
	"Fecha", // date
	/**
	 * Criterios de inclusión y exclusión
	 */
	"Personas con antecedentes de una enfermedad crónica", // inclusion_q1
	"Edad >18 años", // inclusion_q2
	"Accede a formar parte del estudio y firma el consentimiento informado", // inclusion_q3
	"Personas que no accedan a formar parte del registro y no firmen el consentimiento informado", // exclusion_q1
	"Personas sin diagnóstico de enfermedad crónica", // exclusion_q2
	"Personas con trastornos de enfermedad crónica", // exclusion_q3
	"Personas con esperanza de vida inferior a 6 meses", // exclusion_q4
	"Demencia conocida u otros ajenos a un trastorno neurológico o psiquiátrico significativo, o cualquier otra condición psicológica que pueda interferir con el desarrollo del estudio", // exclusion_q5
	/**
	 * Datos sociodemográficos
	 */
	"Fecha de nacimiento", // birth_date
	"Género", // gender
	/**
	 * Antecedentes médicos
	 */
	"Diabetes", // mh__diabetes
	"EPOC", // mh__epoc
	"Insuficiencia cardíaca", // mh__heart_failure
	"Cáncer incluyendo neoplasias hematológicas", // mh__cancer
	"Enfermedad neurológica", // mh__neurological_disease
	"Enfermedades hepáticas", // mh__liver_diseases
	"Enfermedad inflamatoria intestinal", // mh__inflammatory_bowel_disease
	"Insuficiencia renal crónica", // mh__renal_failure
	"Otras enfermedades crónicas", // mh__other_chronic_diseases
	"Otras enfermedades", // mh__others
	"Descripción", // mh__others_description
	/**
	 * Ámbito asistencial
	 */
	"Fecha de valoración", // valuation_date
	"Hospitalización", // hospitalization
	"Motivo de la hospitalización", // hospitalization_reason
	"Visita programada en consulta externa/planta", // scheduled_visit
	/**
	 * Valoración del estado nutricional
	 * 
	 * Antropometría:
	 */
	"Peso corporal actual (kg)", // current_body_weight
	"Peso corporal habitual (últimos 6 meses) (kg)", // usual_body_weight
	"Pérdida en los últimos 6 meses (kg)", // loss_last_six_months
	"Porcentaje de pérdida de peso (%)", // weight_loss_percentage
	"Altura (cm)", // height
	"IMC (kg/m2)", // BMI
	"Perímetro de pantorrilla (cm)", // calf_circumference
	/**
	 * Cribado nutricional
	 */
	"MUST", // ns__must
	"NRS-2002", // ns__nrs_2002
	"MNA-SF", // ns__mna_sf
	"MIS", // ns__mis
	"SNAQ", // ns__snaq
	"CONUT", // ns__conut
	"Otros", // ns__other
	"Otros (descripción)", // ns__other_description
	"Resultado: ¿Está el paciente en riesgo de desnutrición?", // ns__result
	/**
	 * Cribado muscular
	 */
	"SARC-F", // ms__sarc_f
	"Otros", // ms__other
	"Descripción", // ms__other_description
	"Resultado del cribado muscular: ¿Está el paciente en riesgo de sarcopenia?", // ms__result
	/**
	 * Diagnóstico nutricional utilizado
	 */
	"GLIM", // nd__glim
	"MNA", // nd__mna
	"VGS", // nd__vgs
	"Otros", // nd__other
	"Descripción", // nd__other_description
	"¿Está el paciente desnutrido?", // patient_malnourished
	"Desnutrición del paciente según CIE 10", // patient_malnourished__code
	/**
	 * Parámetros funcionales
	 */
	"Dinamometría, valor máximo de 3 mediciones (kg)", // dynamometry
	"No es posible realizarlo", // dynamometry__not_possible
	"Test “Test de la silla 5 repeticiones“ (seg)", // test_chair_five_repetitions
	"No es posible realizarlo", // test_chair__not_possible
	/**
	 * Otras mediciones de composición corporal
	 * 
	 * Bioimpedancia eléctrica:
	 */
	"Porcentaje de hidratación (%)", // bi__hydratation
	"TBW (agua corporal total) (L)", // bi__tbm
	"ECW (agua extracelular) (L)", // bi__ecw
	"ICW (agua intracelular) (L)", // bi__icw
	"FFM (masa magra) (kg)", // bi__ffm
	"FM (masa grasa) (kg)", // bi__fm
	"BCM (masa celular) (kg)", // bi__bcm
	"BCM/h (masa celular dividido entre altura) (kg/m)", // bi__bcm_h
	"ASMM (masa muscular apendicular) (kg)", // bi__asmm
	"SMI (Índice de masa muscular) (kg)", // bi__smi
	"Grasa corporal (%)", // bi__body_fat
	"Resistencia (Rz/h, Ohm) (Ohm/m)", // bi__resistance
	"Reactancia (Xc/h, Ohm) (Ohm/m)", // bi__reactance
	"Ángulo de fase (PF) (deg)", // bi__phase_angle
	"Ángulo de fase estandarizado (PA/talla en m2)", // bi__standarized_phase_angle
	/**
	 * DEXA
	 */
	"FFM (masa magra) (kg)", // dexa__ffm
	"FM (masa grasa) (kg)", // dexa__fm
	/**
	 * TC
	 */
	"FFM (masa magra) (kg)", // tc__ffm
	"FM (masa grasa) (kg)", // tc__fm
	/**
	 * Ecografía abdominal
	 */
	"Tejido adiposo total (cm)", // au__total_adipose_tissue
	"Superficial (cm)", // au__superficial
	"Preperitoneal (cm)", // au__preperitoneal
	/**
	 * Ecografía muscular
	 */
	"Área (cm)", // mu__area
	"Circunferencia (cm)", // mu__circumference
	"Ejes X-ay (cm)", // mu__axes_xax
	"Ejes Y-ay (cm)", // mu__axes_yax
	"Tejido adiposo (cm)", // mu__adipose_tissue
	/**
	 * Resultado de la valoración muscular
	 */
	"¿La masa muscular/función del paciente es normal?", // mar__normal
	/**
	 * Tratamiento nutricional
	 * 
	 * Objetivo/s planteado/s
	 */
	"Ganancia ponderal", // nt__planted_objectives__weight_gain
	"Ganancia muscular / fuerza / mejoría de la funcionalidad", // nt__planted_objectives__muscle_gain
	"Preservación del estado nutricional y/o muscular", // nt__planted_objectives__preservation_status
	"Otro", // nt__planted_objectives__other
	"Descripción", // nt__planted_objectives__other_description
	/**
	 * Inicia tratamiento nutricional
	 */
	" ", // nt__start
	"Si, especifique", // nt__specify
	/**
	 * Tipo de tratamiento nutricional indicado
	 */
	"Nutrición parental", // nti__parental_nutrition
	"Modificaciones dietéticas", // nti__dietary_modifications
	/**
	 * SNO
	 */
	" ", // nti__son__option
	"Descripción", // nti__son__other_description
	/**
	 * Nutrición enteral
	 */
	" ", // nti__en__option
	"Descripción", // nti__en__other_description
	/**
	 * Refiere al Servicio de Endocrinología y Nutrición al paciente para iniciar tratamiento nutricional
	 */
	" ", // refers_patient_to_begin_nutritional_treatment
	/**
	 * Actividad física - promoción
	 * 
	 * ¿Ha prescrito actividad físical al paciente?
	 */
	"¿Ha prescrito actividad física al paciente?", // pa__prescribed
	"Espceifique motivos", // pa__prescribed_reasons
	/**
	 * ¿Qué tipo de ejercicios ha recomendado?
	 */
	"Predominio aeróbico", // pa__aerobic_predominance
	"Predominio de fuerza/resistencia muscular", // pa__predominance_muscular_strength
	"Mixto", // pa__mixed
	" ",

	// FIRST
	"Fecha", // date
	/**
	 * Situación actual del paciente
	 */
	"Situación actual del paciente", // patient_current_situation
	"Fecha de situación actual paciente", // patient_current_situation_date
	/**
	 * Valoración del estado nutricional
	 * 
	 * Antropometría
	 */
	"Peso corporal actual (kg)", // ans__anthropometry__current_weight
	"Peso corporal inicial (kg)", // ans__anthropometry__initial_weight
	"Porcentaje de diferencia (%)", // ans__anthropometry__difference_percentage
	"IMC actual (kg/m2)", // ans__anthropometry__current_bmi
	"Perímetro de pantorrilla (cm)", // ans__anthropometry__calf_circumference
	/**
	 * Parámetros funcionales
	 */
	"Dinamometría, valor máximo de 3 mediciones (kg)", // dynamometry
	"No es posible realizarlo", // dynamometry__not_possible
	"Test “Test de la silla 5 repeticiones“ (seg)", // test_chair_five_repetitions
	"No es posible realizarlo", // test_chair__not_possible
	/**
	 * Otras mediciones de composición corporal
	 * 
	 * Bioimpedancia eléctrica:
	 */
	"Porcentaje de hidratación (%)", // bi__hydratation
	"TBW (agua corporal total) (L)", // bi__tbm
	"ECW (agua extracelular) (L)", // bi__ecw
	"ICW (agua intracelular) (L)", // bi__icw
	"FFM (masa magra) (kg)", // bi__ffm
	"FM (masa grasa) (kg)", // bi__fm
	"BCM (masa celular) (kg)", // bi__bcm
	"BCM/h (masa celular dividido entre altura) (kg/m)", // bi__bcm_h
	"ASMM (masa muscular apendicular) (kg)", // bi__asmm
	"SMI (Índice de masa muscular) (kg)", // bi__smi
	"Grasa corporal (%)", // bi__body_fat
	"Resistencia (Rz/h, Ohm) (Ohm/m)", // bi__resistance
	"Reactancia (Xc/h, Ohm) (Ohm/m)", // bi__reactance
	"Ángulo de fase (PF) (deg)", // bi__phase_angle
	"Ángulo de fase estandarizado (PA/talla en m2)", // bi__standarized_phase_angle
	/**
	 * DEXA
	 */
	"FFM (masa magra) (kg)", // dexa__ffm
	"FM (masa grasa) (kg)", // dexa__fm
	/**
	 * TC
	 */
	"FFM (masa magra) (kg)", // tc__ffm
	"FM (masa grasa) (kg)", // tc__fm
	/**
	 * Ecografía abdominal
	 */
	"Tejido adiposo total (cm)", // au__total_adipose_tissue
	"Superficial (cm)", // au__superficial
	"Preperitoneal (cm)", // au__preperitoneal
	/**
	 * Ecografía muscular
	 */
	"Área (cm)", // mu__area
	"Circunferencia (cm)", // mu__circumference
	"Ejes X-ay (cm)", // mu__axes_xax
	"Ejes Y-ay (cm)", // mu__axes_yax
	"Tejido adiposo (cm)", // mu__adipose_tissue
	/**
	 * ¿El paciente ha seguido la recomendación nutricional prescrita?
	 */
	" ", // hfnr__followed_prescribed_nutritional_recommendation
	"Porcentaje de adherencia a las recomendaciones (%)", // hfnr__percentage_of_adherece_to_recommendations
	"El paciente NO ha seguido la recomendación nutricional prescrita (motivos)", // hfnr__not_followed_prescribed_recommendation
	" ", // rng__has_reached_nutritional_goal
	"El paciente NO ha conseguido el objetivo nutricional planteado en la visita basal (motivos)", // rng__has_reached_nutritional_goal_reasons
	" ", // cppi__considers_that_patient_perceives_improvement
	"El paciente NO percibe algún tipo de mejoría asociado al tratamiento nutricional indicado (motivos)", // cppi__considers_that_patient_perceives_improvement_reasons
	" ", // hfppar_followed_prescribed_physical_activity_recommendation
	"El paciente NO ha seguido la recomendación de actividad física (motivos)" // hfppar__not_followed_prescribed_recommendation
];