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
			$table->foreignId('patient_id')
				->nullable()
				->constrained('patients')
				->cascadeOnUpdate()
				->nullOnDelete();

			$table->enum('visit_type', [
				'initial',
				'first'
			])->default('initial');
			$table->date('date')->nullable();

			// Criterios de inclusión
			$table->enum('inclusion_q1', ['y', 'n'])->nullable()->comment('Personas con antecedentes de una enfermedad crónica');
			$table->enum('inclusion_q2', ['y', 'n'])->nullable()->comment('Edad >18 años');
			$table->enum('inclusion_q3', ['y', 'n'])->nullable()->comment('Accede a formar parte del estudio y firma el consentimiento informado');

			// Criterios de exclusión
			$table->enum('exclusion_q1', ['y', 'n'])->nullable()->comment('Personas que no accedan a formar parte del registro y no firmen el consentimiento informado');
			$table->enum('exclusion_q2', ['y', 'n'])->nullable()->comment('Personas sin diagnóstico de enfermedad crónica');
			$table->enum('exclusion_q3', ['y', 'n'])->nullable()->comment('Personas con trastornos de enfermedad crónica');
			$table->enum('exclusion_q4', ['y', 'n'])->nullable()->comment('Personas con esperanza de vida inferior a 6 meses');
			$table->enum('exclusion_q5', ['y', 'n'])->nullable()->comment('Demencia conocida u otros ajenos a un trastorno neurológico o psiquiátrico significativo, o cualquier otra condición psicológica que pueda interferir con el desarrollo del estudio');

			// Datos sociodemográficos
			$table->date('birth_date')->nullable()->comment('Fecha de nacimiento');
			$table->enum('gender', ['hombre', 'mujer'])->nullable()->comment('Género');

			// Antecedentes médicos
			$table->enum('mh__diabetes', ['y', 'n'])->nullable()->comment('Diabetes');
			$table->enum('mh__epoc', ['y', 'n'])->nullable()->comment('EPOC');
			$table->enum('mh__heart_failure', ['y', 'n'])->nullable()->comment('Insuficiencia cardíaca');
			$table->enum('mh__cancer', ['y', 'n'])->nullable()->comment('Cáncer incluyendo neoplasias hematológicas');
			$table->enum('mh__neurological_disease', ['y', 'n'])->nullable()->comment('Enfermedad neurológica');
			$table->enum('mh__liver_diseases', ['y', 'n'])->nullable()->comment('Enfermedades hepáticas');
			$table->enum('mh__inflammatory_bowel_disease', ['y', 'n'])->nullable()->comment('Enfermedad inflamatoria intestinal');
			$table->enum('mh__renal_failure', ['y', 'n'])->nullable()->comment('Insuficiencia renal crónica');
			$table->enum('mh__other_chronic_diseases', ['y', 'n'])->nullable()->comment('Otras enfermedades crónicas');
			$table->enum('mh__others', ['y', 'n'])->nullable()->comment('Otras enfermedades');
			$table->text('mh__others_description')->nullable()->comment('Otras enfermedades (descripción)');

			// Ámbito asistencial
			$table->date('valuation_date')->nullable()->comment('Fecha de valoración');
			$table->enum('hospitalization', ['y', 'n'])->nullable()->comment('Hospitalización');
			$table->text('hospitalization_reason')->nullable()->comment('Motivo de la hospitalización');
			$table->enum('scheduled_visit', ['y', 'n'])->nullable()->comment('Visita programada en consulta externa/planta');

			// Valoración del estado nutricional
			// Antropometría
			$table->string('current_body_weight')->nullable()->comment('Peso corporal actual | kg');
			$table->string('usual_body_weight')->nullable()->comment('Peso corporal habitual (últimos 6 meses) | kg');
			$table->string('loss_last_six_months')->nullable()->comment('Pérdida en los últimos 6 meses | kg');
			$table->string('weight_loss_percentage')->nullable()->comment('Porcentaje de pérdida de peso | %');
			$table->string('height')->nullable()->comment('Altura | cm');
			$table->string('BMI')->nullable()->comment('IMC | kg/m2');
			$table->string('calf_circumference')->nullable()->comment('Perímetro de pantorrilla | cm');

			// Cribado nutricional
			$table->enum('ns__must', ['y', 'n'])->nullable()->comment('MUST');
			$table->enum('ns__nrs_2002', ['y', 'n'])->nullable()->comment('NRS-2002');
			$table->enum('ns__mna_sf', ['y', 'n'])->nullable()->comment('MNA-SF');
			$table->enum('ns__mis', ['y', 'n'])->nullable()->comment('MIS');
			$table->enum('ns__snaq', ['y', 'n'])->nullable()->comment('SNAQ');
			$table->enum('ns__conut', ['y', 'n'])->nullable()->comment('CONUT');
			$table->enum('ns__other', ['y', 'n'])->nullable()->comment('Otros');
			$table->text('ns__other_description')->nullable()->comment('Otros (descripción)');
			$table->enum('ns__result', ['y', 'n'])->nullable()->comment('Resultado del cribado nutricional: ¿Está el paciente en riesgo de desnutrición?');

			// Cribado muscular
			$table->enum('ms__sarc_f', ['y', 'n'])->nullable()->comment('SARC-F');
			$table->enum('ms__other', ['y', 'n'])->nullable()->comment('Otros');
			$table->text('ms__other_description')->nullable()->comment('Otros');
			$table->enum('ms__result', ['y', 'n'])->nullable()->comment('Resultado del cribado muscular: ¿Está el paciente en riesgo de sarcopenia?');

			// Diagnóstico nutricional utilizado
			$table->enum('nd__glim', ['y', 'n'])->nullable()->comment('GLIM');
			$table->enum('nd__mna', ['y', 'n'])->nullable()->comment('MNA');
			$table->enum('nd__vgs', ['y', 'n'])->nullable()->comment('VGS');
			$table->enum('nd__other', ['y', 'n'])->nullable()->comment('Otros');
			$table->text('nd__other_description')->nullable()->comment('Otros');
			$table->enum('patient_malnourished', ['no', 'si', 'en riesgo'])->nullable()->comment('¿Está el paciente desnutrido?');
			// $table->string('patient_malnourished__code', 10)->nullable()->comment('Desnutrición del paciente según CIE 10');
			$table->string('patient_malnourished__diagnosis')->nullable();
			$table->string('patient_malnourished__procedure')->nullable();

			// Parámetros funcionales 
			$table->string('dynamometry')->nullable()->comment('Dinamometría, valor máximo de 3 mediciones | kg');
			$table->enum('dynamometry__not_possible', ['y', 'n'])->nullable()->comment('No es posible realizar la dinamometría');
			$table->string('test_chair_five_repetitions')->nullable()->comment('Test “Test de la silla 5 repeticiones“ | seg');
			$table->enum('test_chair__not_possible', ['y', 'n'])->nullable()->comment('No es posible realizar el test de la silla');

			// Otras mediciones de composición corporal
			$table->string('bi__hydratation')->nullable()->comment('Porcentaje de hidratación | %');
			$table->string('bi__tbm')->nullable()->comment('TBW (agua corporal total) | L');
			$table->string('bi__ecw')->nullable()->comment('ECW (agua extracelular) | L');
			$table->string('bi__icw')->nullable()->comment('ICW (agua intracelular) | L');
			$table->string('bi__ffm')->nullable()->comment('FFM (masa magra) | kg');
			$table->string('bi__fm')->nullable()->comment('FM (masa grasa) | kg');
			$table->string('bi__bcm')->nullable()->comment('BCM (masa celular) | kg');
			$table->string('bi__bcm_h')->nullable()->comment('BCM/h (masa celular dividido entre altura) | kg/m');
			$table->string('bi__asmm')->nullable()->comment('ASMM (masa muscular apendicular) | kg');
			$table->string('bi__smi')->nullable()->comment('SMI (Índice de masa muscular) | kg');
			$table->string('bi__body_fat')->nullable()->comment('Grasa corporal | %');
			$table->string('bi__resistance')->nullable()->comment('Resistencia (Rz/h, Ohm) | Ohm/m');
			$table->string('bi__reactance')->nullable()->comment('Reactancia (Xc/h, Ohm) | Ohm/m');
			$table->string('bi__phase_angle')->nullable()->comment('Ángulo de fase (AF) | deg');
			$table->string('bi__standarized_phase_angle')->nullable()->comment('Ángulo de fase estandarizado | L');

			// DEXA
			$table->string('dexa__ffm')->nullable()->comment('DEXA (masa magra) | kg');
			$table->string('dexa__fm')->nullable()->comment('DEXA (masa grasa) | kg');

			// TC
			$table->string('tc__ffm')->nullable()->comment('TC (masa magra) | kg');
			$table->string('tc__fm')->nullable()->comment('TC (masa grasa) | kg');

			// Ecografía abdominal
			$table->string('au__total_adipose_tissue')->nullable()->comment('Ecografía abdominal: tejido adiposo total | cm');
			$table->string('au__superficial')->nullable()->comment('Ecografía abdominal: superficial | cm');
			$table->string('au__preperitoneal')->nullable()->comment('Ecografía abdominal: preperitoneal | cm');

			// Ecografía muscular
			$table->string('mu__area')->nullable()->comment('Ecografía muscular: Área | cm');
			$table->string('mu__circumference')->nullable()->comment('Ecografía muscular: Circunferencia | cm');
			$table->string('mu__axes_xax')->nullable()->comment('Ecografía muscular: Ejes X | cm');
			$table->string('mu__axes_yax')->nullable()->comment('Ecografía muscular: Ejes Y | cm');
			$table->string('mu__adipose_tissue')->nullable()->comment('Ecografía muscular: Tejido adiposo | cm');

			// Resultado de la valoración muscular
			$table->enum('mar__normal', ['y', 'n'])->nullable()->comment('Resultado de la valoración muscular: ¿La masa muscular/función del paciente es normal?');

			// Tratamiento nutricional
			// Objetivo/s planteado/s (puede indicarse más de uno si en su opinión aplica)
			$table->enum('nt__planted_objectives__weight_gain', ['y', 'n'])->nullable()->comment('Tratamiento nutricional: Ganancia ponderal');
			$table->enum('nt__planted_objectives__muscle_gain', ['y', 'n'])->nullable()->comment('Tratamiento nutricional: Ganancia muscular / fuerza / mejoría de la funcionalidad');
			$table->enum('nt__planted_objectives__preservation_status', ['y', 'n'])->nullable()->comment('Tratamiento nutricional: Preservación del estado nutricional y/o muscular');
			$table->enum('nt__planted_objectives__other', ['y', 'n'])->nullable()->comment('Tratamiento nutricional: Otro');
			$table->text('nt__planted_objectives__other_description')->nullable()->comment('Tratamiento nutricional: Otro');

			// Inicia tratamiento nutricional
			$table->enum('nt__start', ['y', 'n'])->nullable()->comment('Inicia tratamiento nutricional');

			// Tipo de tratamiento nutricional indicado
			$table->enum('nti__parental_nutrition', ['y', 'n'])->nullable()->comment('Tipo de tratamiento nutricional indicado: nutrición parental');
			$table->enum('nti__dietary_modifications', ['y', 'n'])->nullable()->comment('Tipo de tratamiento nutricional indicado: modificaciones dietéticas');
			$table->enum('nti__son', ['y', 'n'])->nullable()->comment('SON: Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)');
			$table->string('nti__son__option')->nullable()->comment('Opciones de SON');
			$table->text('nti__son__other_description')->nullable()->comment('SON: otras');
			$table->enum('nti__en', ['y', 'n'])->nullable()->comment('Nutrición enteral, tipo de fórmula');
			$table->string('nti__en__option')->nullable()->comment('Opciones de Nutrición enteral');
			$table->text('nti__en__other_description')->nullable()->comment('Nutrición enteral: otras');

			// Refiere al Servicio de Endocrinología y Nutrición al paciente para iniciar tratamiento nutricional
			$table->enum('refers_patient_to_begin_nutritional_treatment', ['y', 'n'])->nullable()->comment('Refiere al Servicio de Endocrinología y Nutrición al paciente para iniciar tratamiento nutricional, (yo gestiono el tratamiento del paciente)');

			// ¿El paciente ha seguido la recomendación nutricional prescrita?
			$table->enum('nt__pnr', ['y', 'n'])->nullable()->comment('¿El paciente ha seguido la recomendación nutricional prescrita?');
			$table->string('nt__pnr_percent')->nullable()->comment('Especifique % adherencia a las recomendaciones | %');
			$table->text('nt__reason')->nullable()->comment('¿El paciente ha seguido la recomendación nutricional prescrita?, No, motivos');

			// ¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?
			$table->enum('nt__objective_reached', ['y', 'n'])->nullable()->comment('¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?');
			$table->text('nt__objective_reached_reason')->nullable()->comment('¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?, No, motivos');

			// ¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?
			$table->enum('nt__improvement', ['y', 'n'])->nullable()->comment('¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?');
			$table->text('nt__has_not_got_improvement_reason')->nullable()->comment('¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?, No, motivos');

			// Actividad física, promoción
			$table->enum('pa__prescribed', ['y', 'n'])->nullable()->comment('Actividad física: ¿Ha prescrito actividad física al paciente?');
			$table->text('pa__prescribed_reasons')->nullable()->comment('Actividad física: No. espceifique motivos');
			$table->enum('pa__aerobic_predominance', ['y', 'n'])->nullable()->comment('¿Qué tipo de ejercicios ha recomendado?: Predominio aeróbico');
			$table->enum('pa__predominance_muscular_strength', ['y', 'n'])->nullable()->comment('¿Qué tipo de ejercicios ha recomendado?: Predominio de fuerza/resistencia muscular');
			$table->enum('pa__mixed', ['y', 'n'])->nullable()->comment('¿Qué tipo de ejercicios ha recomendado?: Mixto');

			// ¿El paciente ha seguido la recomendación de actividad física prescrita?
			$table->enum('pa__hpftppar', ['y', 'n'])->nullable()->comment('¿El paciente ha seguido la recomendación de actividad física prescrita?');
			$table->string('pa__hpftppar_percent')->nullable()->comment('¿El paciente ha seguido la recomendación de actividad física prescrita? especifique % de adherencia a las recomendaciones | %');
			$table->text('pa__reason')->nullable()->comment('¿El paciente ha seguido la recomendación de actividad física prescrita?, No, motivos');

			// DATOS DE LA VISITA 1
			// Situación actual del paciente
			$table->enum('patient_current_situation', [
				'Alta',
				'Reingreso',
				'Deceso',
				'Seguimiento telefónico',
				'No acude a control'
			])->nullable()->comment('Situación actual del paciente');
			$table->date('patient_current_situation_date')->nullable()->comment('Situación actual del paciente - Fecha');

			// Valoración del estado nutricional
			// Antropometría
			$table->string('ans__anthropometry__current_weight')->nullable()->comment('Peso corporal actual | kg');
			$table->string('ans__anthropometry__initial_weight')->nullable()->comment('Peso corporal inicial | kg');
			$table->string('ans__anthropometry__difference_percentage')->nullable()->comment('Porcentaje de diferencia | %');
			$table->string('ans__anthropometry__current_bmi')->nullable()->comment('IMC actual | kg/m2');
			$table->string('ans__anthropometry__calf_circumference')->nullable()->comment('Perímetro de pantorrilla | cm');

			// ¿El paciente ha seguido la recomendación nutricional prescrita?
			$table->enum('hfnr__followed_prescribed_nutritional_recommendation', ['y', 'n'])->nullable()->comment('¿El paciente ha seguido la recomendación nutricional prescrita?');
			$table->string('hfnr__percentage_of_adherece_to_recommendations')->nullable()->comment('Porcentaje de adherencia a las recomendaciones | %');
			$table->text('hfnr__not_followed_prescribed_recommendation')->nullable()->comment('Motivos por los que el paciente no ha seguido la recomendación nutricional prescrita');
			$table->enum('rng__has_reached_nutritional_goal', ['y', 'n'])->nullable()->comment('¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?');
			$table->text('rng__has_reached_nutritional_goal_reasons')->nullable()->comment('¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal? motivos');
			$table->enum('cppi__considers_that_patient_perceives_improvement', ['y', 'n'])->nullable()->comment('¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional indicado?');
			$table->text('cppi__considers_that_patient_perceives_improvement_reasons')->nullable()->comment('¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional indicado? especifique motivos');
			$table->enum('hfppar_followed_prescribed_physical_activity_recommendation', ['y', 'n'])->nullable()->comment('¿El paciente ha seguido la recomendación de actividad física prescrita?');
			$table->string('hfppar_percentage_of_adherece_to_recommendations')->nullable()->comment('Porcentaje de adherencia a las recomendaciones | %');
			$table->text('hfppar__not_followed_prescribed_recommendation')->nullable()->comment('Motivos por los que el paciente no ha seguido la recomendación de actividad física prescrita');

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
