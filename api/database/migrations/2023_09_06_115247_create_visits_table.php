<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('visits', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('patient_id')->constrained('patients')->cascadeOnDelete();

			$table->enum('visit_type', ['initial', 'first'])->default('initial');
			$table->date('date')->nullable();
			// Criterios de inclusión
			$table->enum('inclusion_q1', ['y'])->nullable()->comment('Personas con antecedentes de una enfermedad crónica');
			$table->enum('inclusion_q2', ['y'])->nullable()->comment('Edad >18 años');
			$table->enum('inclusion_q3', ['y'])->nullable()->comment('Accede a formar parte del estudio y firma el consentimiento informado');
			// Criterios de exclusión
			$table->enum('exclusion_q1', ['y'])->nullable()->comment('Personas que no accedan a formar parte del registro y no firmen el consentimiento informado');
			$table->enum('exclusion_q2', ['y'])->nullable()->comment('Personas sin diagnóstico de enfermedadcrónica');
			$table->enum('exclusion_q3', ['y'])->nullable()->comment('Personas con trastornos de enfermedad crónica');
			$table->enum('exclusion_q4', ['y'])->nullable()->comment('Personas con esperanza de vida inferior a 6 meses');
			$table->enum('exclusion_q5', ['y'])->nullable()->comment('Demencia conocida u otros ajenos a un trastorno neurológico o psiquiátrico significativo, o cualquier otra condición psicológica que pueda interferir con el desarrollo del estudio');
			// Datos sociodemográficos
			$table->date('birth_date')->nullable()->comment('Fecha de nacimiento');
			// Antecedentes médicos
			$table->enum('mh__diabetes', ['y'])->nullable()->comment('Diabetes');
			$table->enum('mh__epoc', ['y'])->nullable()->comment('EPOC');
			$table->enum('mh__heart_failure', ['y'])->nullable()->comment('Insuficiencia cardíaca');
			$table->enum('mh__cancer', ['y'])->nullable()->comment('Cáncer incluyendo neoplasias hematológicas');
			$table->enum('mh__neurological_disease', ['y'])->nullable()->comment('Enfermedad neurológica');
			$table->enum('mh__liver_diseases', ['y'])->nullable()->comment('Enfermedades hepáticas');
			$table->enum('mh__inflammatory_bowel_disease', ['y'])->nullable()->comment('Enfermedad inflamatoria intestinal');
			$table->enum('mh__renal_failure', ['y'])->nullable()->comment('Insuficiencia renal crónica');
			$table->enum('mh__other_chronic_diseases', ['y'])->nullable()->comment('Otras enfermedades crónicas');
			$table->enum('mh__others', ['y'])->nullable()->comment('Otras enfermedades');
			$table->text('mh__others_description')->nullable()->comment('Otras enfermedades (descripción)');
			// Ámbito asistencial
			$table->date('valuation_date')->nullable()->comment('Fecha de valoración');
			$table->enum('hospitalization', ['y'])->nullable()->comment('Hospitalización');
			$table->text('hospitalization_reason')->nullable()->comment('Motivo de la hospitalización');
			$table->enum('scheduled_visit', ['y'])->nullable()->comment('Visita programada en consulta externa/planta');
			// Valoración del estado nutricional
			// Antropometría
			$table->unsignedDecimal('current_body_weight', 5, 2)->nullable()->comment('Peso corporal actual | kg');
			$table->unsignedDecimal('usual_body_weight', 5, 2)->nullable()->comment('Peso corporal habitual (últimos 6 meses) | kg');
			$table->unsignedDecimal('loss_last_six_months', 5, 2)->nullable()->comment('Pérdida en los últimos 6 meses | kg');
			$table->unsignedDecimal('weight_loss_percentage', 5, 2)->nullable()->comment('Porcentaje de pérdida de peso | %');
			$table->unsignedDecimal('height', 5, 2)->nullable()->comment('Altura | cm');
			$table->unsignedDecimal('BMI', 5, 2)->nullable()->comment('IMC | kg/m2');
			$table->unsignedDecimal('calf_circumference', 5, 2)->nullable()->comment('Perímetro de pantorrilla | cm');
			// Cribado nutricional
			$table->enum('ns__must', ['y'])->nullable()->comment('MUST');
			$table->enum('ns__nrs_2002', ['y'])->nullable()->comment('NRS-2002');
			$table->enum('ns__mna_sf', ['y'])->nullable()->comment('MNA-SF');
			$table->enum('ns__mis', ['y'])->nullable()->comment('MIS');
			$table->enum('ns__snaq', ['y'])->nullable()->comment('SNAQ');
			$table->enum('ns__conut', ['y'])->nullable()->comment('CONUT');
			$table->enum('ns__other', ['y'])->nullable()->comment('Otros');
			$table->text('ns__other_description')->nullable()->comment('Otros (descripción)');
			$table->enum('ns__result', ['y'])->nullable()->comment('Resultado del cribado nutricional: ¿Está el paciente en riesgo de desnutrición?');
			// Cribado muscular
			$table->enum('ms__sarc_f', ['y'])->nullable()->comment('SARC-F');
			$table->enum('ms__other', ['y'])->nullable()->comment('Otros');
			$table->text('ms__other_description')->nullable()->comment('Otros');
			$table->enum('ms__result', ['y'])->nullable()->comment('Resultado del cribado muscular: ¿Está el paciente en riesgo de sarcopenia?');
			// Diagnóstico nutricional utilizado
			$table->enum('nd__glim', ['y'])->nullable()->comment('GLIM');
			$table->enum('nd__mna', ['y'])->nullable()->comment('MNA');
			$table->enum('nd__vgs', ['y'])->nullable()->comment('VGS');
			$table->enum('nd__other', ['y'])->nullable()->comment('Otros');
			$table->text('nd__other_description')->nullable()->comment('Otros');
			$table->enum('patient_malnourished', ['no', 'si', 'en riesgo'])->nullable()->comment('¿Está el paciente desnutrido?');
			$table->string('patient_malnourished__code', 10)->nullable()->comment('Desnutrición del paciente según CIE 10');
			// Parámetros funcionales 
			$table->unsignedDecimal('dynamometry', 5, 2)->nullable()->comment('Dinamometría, valor máximo de 3 mediciones | kg');
			$table->enum('dynamometry__not_possible', ['y'])->nullable()->comment('No es posible realizar la dinamometría');
			$table->tinyInteger('test_chair_five_repetitions')->nullable()->comment('Test “Test de la silla 5 repeticiones" | seg');
			$table->enum('test_chair__not_possible', ['y'])->nullable()->comment('No es posible realizar el test de la silla');
			// Otras mediciones de composición corporal
			$table->unsignedDecimal('bi__hydratation', 5, 2)->nullable()->comment('Porcentaje de hidratación | %');
			$table->unsignedDecimal('bi__tbm', 5, 2)->nullable()->comment('TBW (agua corporal total) | L');
			$table->unsignedDecimal('bi__ecw', 5, 2)->nullable()->comment('ECW (agua extracelular) | L');
			$table->unsignedDecimal('bi__icw', 5, 2)->nullable()->comment('ICW (agua intracelular) | L');
			$table->unsignedDecimal('bi__ffm', 5, 2)->nullable()->comment('FFM (masa magra) | kg');
			$table->unsignedDecimal('bi__fm', 5, 2)->nullable()->comment('FM (masa grasa) | kg');
			$table->unsignedDecimal('bi__bcm', 5, 2)->nullable()->comment('BCM (masa celular) | kg');
			$table->unsignedDecimal('bi__bcm_h', 5, 2)->nullable()->comment('BCM/h (masa celular dividido entre altura) | kg/m');
			$table->unsignedDecimal('bi__asmm', 5, 2)->nullable()->comment('ASMM (masa muscular apendicular) | kg');
			$table->unsignedDecimal('bi__smi', 5, 2)->nullable()->comment('SMI (Índice de masa muscular) | kg');
			$table->unsignedDecimal('bi__body_fat', 5, 2)->nullable()->comment('Grasa corporal | %');
			$table->unsignedDecimal('bi__resistance', 5, 2)->nullable()->comment('Resistencia (Rz/h, Ohm) | Ohm/m');
			$table->unsignedDecimal('bi__reactance', 5, 2)->nullable()->comment('Reactancia (Xc/h, Ohm) | Ohm/m');
			$table->unsignedDecimal('bi__phase_angle', 5, 2)->nullable()->comment('Ángulo de fase (AF) | deg');
			$table->string('bi__standarized_phase_angle')->nullable()->comment('Ángulo de fase estandarizado | L');
			// DEXA
			$table->unsignedDecimal('dexa__ffm', 5, 2)->nullable()->comment('FFM (masa magra) | kg');
			$table->unsignedDecimal('dexa__fm', 5, 2)->nullable()->comment('FM (masa grasa) | kg');
			// TC
			$table->unsignedDecimal('tc__ffm', 5, 2)->nullable()->comment('FFM (masa magra) | kg');
			$table->unsignedDecimal('tc__fm', 5, 2)->nullable()->comment('FM (masa grasa) | kg');
			// Ecografía abdominal
			$table->unsignedDecimal('au__total_adipose_tissue', 5, 2)->nullable()->comment('Ecografía abdominal: tejido adiposo total | cm');
			$table->unsignedDecimal('au__superficial', 5, 2)->nullable()->comment('Ecografía abdominal: superficial | cm');
			$table->unsignedDecimal('au__preperitoneal', 5, 2)->nullable()->comment('Ecografía abdominal: preperitoneal | cm');
			// Ecografía muscular
			$table->unsignedDecimal('mu__area', 5, 2)->nullable()->comment('Ecografía muscular: Área | cm');
			$table->unsignedDecimal('mu__circumference', 5, 2)->nullable()->comment('Ecografía muscular: Circunferencia | cm');
			$table->unsignedDecimal('mu__axes_xax', 5, 2)->nullable()->comment('Ecografía muscular: Ejes X | cm');
			$table->unsignedDecimal('mu__axes_yax', 5, 2)->nullable()->comment('Ecografía muscular: Ejes Y | cm');
			$table->unsignedDecimal('mu__adipose_tissue', 5, 2)->nullable()->comment('Ecografía muscular: Tejido adiposo | cm');
			// Resultado de la valoración muscular
			$table->enum('mar__normal', ['y'])->nullable()->comment('Resultado de la valoración muscular: ¿La masa muscular/función del paciente es normal?');
			// Tratamiento nutricional
			// Objetivo/s planteado/s (puede indicarse más de uno si en su opinión aplica)
			$table->enum('nt__planted_objectives__weight_gain', ['y'])->nullable()->comment('Tratamiento nutricional: Ganancia ponderal');
			$table->enum('nt__planted_objectives__muscle_gain', ['y'])->nullable()->comment('Tratamiento nutricional: Ganancia muscular / fuerza / mejoría de la funcionalidad');
			$table->enum('nt__planted_objectives__preservation_status', ['y'])->nullable()->comment('Tratamiento nutricional: Preservación del estado nutricional y/o muscular');
			$table->text('nt__planted_objectives__other')->nullable()->comment('Tratamiento nutricional: Otro');
			// Inicia tratamiento nutricional
			$table->enum('nt__start', ['y'])->nullable()->comment('Inicia tratamiento nutricional');
			$table->text('nt__specify')->nullable()->comment('Inicia tratamiento nutricional, especifique');
			// Tipo de tratamiento nutricional indicado
			$table->enum('nti__parental_nutrition', ['y'])->nullable()->comment('Tipo de tratamiento nutricional indicado: nutrición parental');
			$table->enum('nti__dietary_modifications', ['y'])->nullable()->comment('Tipo de tratamiento nutricional indicado: modificaciones dietéticas');
			$table->enum('nti__son', ['y'])->nullable()->comment('SON: Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)');
			$table->enum('nti__son__hc_with_smi', ['y'])->nullable()->comment('SON: Hipercalórica/Hiperproteica sin ingrediente Músculo Específico (HMB y/o Leucina)');
			$table->enum('nti__son__hc_without_smi', ['y'])->nullable()->comment('SON: Normo calórica/Normoproteica sin ingrediente Músculo Específico (HMB y/o Leucina)');
			$table->enum('nti__son__nc_without_smi', ['y'])->nullable()->comment('SON: Específica para Diabético Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)');
			$table->enum('nti__son__diabetics_hypercaloric', ['y'])->nullable()->comment('SON: Especifica para diabético normo calórica/normoproteica sin ingrediente Músculo Específico (HMB y Leucina)');
			$table->enum('nti__son__normal_normoprotein_without_msi', ['y'])->nullable()->comment('SON: Especifica para diabético normo calórica/normoproteica sin ingrediente Músculo Específico (HMB y Leucina)');
			$table->enum('nti__son__peptide_formulas', ['y'])->nullable()->comment('SON: Fórmulas peptídicas');
			$table->enum('nti__son__snp', ['y'])->nullable()->comment('SON: Específica para paciente nefrópata');
			$table->text('nti__son__other')->nullable()->comment('SON: otras');
			$table->enum('nti__en', ['y'])->nullable()->comment('Nutrición enteral, tipo de fórmula');
			$table->enum('nti__en__hypercaloric_with_msi', ['y'])->nullable()->comment('Nutrición enteral: Hipercalórica/Hiperproteica con ingrediente Músculo Especifico (HMB y/o Leucina)');
			$table->enum('nti__en__hypercaloric_without_msi', ['y'])->nullable()->comment('Nutrición enteral: Hipercalórica/Hiperproteica sin ingrediente Músculo Específico (HMB y/o Leucina)');
			$table->enum('nti__en__caloric_without_msi', ['y'])->nullable()->comment('Nutrición enteral: normo calórica/Normoproteica sin ingrediente Músculo Específico (HMB y/o Leucina)');
			$table->enum('nti__en__specific_diabetics_with_smi', ['y'])->nullable()->comment('Nutrición enteral: Específica para Diabético Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)');
			$table->enum('nti__en__normal_calorie_without_smi', ['y'])->nullable()->comment('Nutrición enteral: Especifica para diabético normo calórica/normoproteica sin ingrediente Músculo Específico (HMB y Leucina)');
			$table->enum('nti__en__peptide_formulas', ['y'])->nullable()->comment('Nutrición enteral: Fórmulas peptídicas');
			$table->enum('nti__en__snp', ['y'])->nullable()->comment('Nutrición enteral: Específica para paciente nefrópata');
			$table->text('nti__en__other')->nullable()->comment('Nutrición enteral: otras');
			// Refiere al Servicio de Endocrinología y Nutrición al paciente para iniciar tratamiento nutricional
			$table->enum('refers_patient_to_begin_nutritional_treatment', ['y'])->nullable()->comment('Refiere al Servicio de Endocrinología y Nutrición al paciente para iniciar tratamiento nutricional, (yo gestiono el tratamiento del paciente)');
			// ¿El paciente ha seguido la recomendación nutricional prescrita?
			$table->enum('nt__pnr', ['y'])->nullable()->comment('¿El paciente ha seguido la recomendación nutricional prescrita?');
			$table->unsignedDecimal('nt__pnr_percent', 5, 2)->nullable()->comment('Especifique % adherencia a las recomendaciones | %');
			$table->text('nt__reason')->nullable()->comment('¿El paciente ha seguido la recomendación nutricional prescrita?, No, motivos');
			// ¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?
			$table->enum('nt__objective_reached', ['y'])->nullable()->comment('¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?');
			$table->text('nt__objective_reached_reason')->nullable()->comment('¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?, No, motivos');
			// ¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?
			$table->enum('nt__improvement', ['y'])->nullable()->comment('¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?');
			$table->text('nt__has_not_got_improvement_reason')->nullable()->comment('¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?, No, motivos');
			// Actividad física, promoción
			$table->enum('pa__prescribed', ['y'])->nullable()->comment('Actividad física: ¿Ha prescrito actividad física al paciente?');
			$table->text('pa__prescribed_reasons')->nullable()->comment('Actividad física: No. espceifique motivos');
			$table->enum('pa__aerobic_predominance', ['y'])->nullable()->comment('¿Qué tipo de ejercicios ha recomendado?: Predominio aeróbico');
			$table->enum('pa__predominance_muscular_strength', ['y'])->nullable()->comment('¿Qué tipo de ejercicios ha recomendado?: Predominio de fuerza/resistencia muscular');
			$table->enum('pa__mixed', ['y'])->nullable()->comment('¿Qué tipo de ejercicios ha recomendado?: Mixto');
			// ¿El paciente ha seguido la recomendación de actividad física prescrita?
			$table->enum('pa__hpftppar', ['y'])->nullable()->comment('¿El paciente ha seguido la recomendación de actividad física prescrita?');
			$table->unsignedDecimal('pa__hpftppar_percent', 5, 2)->nullable()->comment('¿El paciente ha seguido la recomendación de actividad física prescrita? especifique % de adherencia a las recomendaciones | %');
			$table->text('pa__reason')->nullable()->comment('¿El paciente ha seguido la recomendación de actividad física prescrita?, No, motivos');

			// DATOS DE LA VISITA 1
			// Situación actual del paciente
			$table->enum('discharged', ['y'])->nullable()->comment('Paciente dado de alta');
			$table->date('discharged_date')->nullable()->comment('Fecha del alta del paciente');
			$table->enum('readmission', ['y'])->nullable()->comment('Reingreso del paciente');
			$table->date('readmission_date')->nullable()->comment('Fecha de reingreso del paciente');
			$table->enum('death', ['y'])->nullable()->comment('Deceso del paciente');
			$table->date('death_date')->nullable()->comment('Fecha de deceso del paciente');
			$table->enum('not_come_for_control', ['y'])->nullable()->comment('El paciente no acude a control');
			// Valoración del estado nutricional
			// Antropometría
			$table->unsignedDecimal('ans__anthropometry__current_weight', 5, 2)->nullable()->comment('Peso corporal actual | kg');
			$table->unsignedDecimal('ans__anthropometry__initial_weight', 5, 2)->nullable()->comment('Peso corporal inicial | kg');
			$table->unsignedDecimal('ans__anthropometry__difference_percentage', 5, 2)->nullable()->comment('Porcentaje de diferencia | %');
			$table->unsignedDecimal('ans__anthropometry__current_bmi', 5, 2)->nullable()->comment('IMC actual | kg/m2');
			$table->unsignedDecimal('ans__anthropometry__calf_circumference', 5, 2)->nullable()->comment('Perímetro de pantorrilla | cm');

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('visits');
	}
};
