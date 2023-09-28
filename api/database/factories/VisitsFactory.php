<?php

namespace Database\Factories;

use App\Models\Visit;
use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VisitsFactory extends Factory
{
    protected $model = Visit::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $patiend_id = Patient::inRandomOrder()->first()->id;
        return [
            'patient_id' => $patiend_id,
            'visit_type' => $this->faker->randomElement(['initial', 'first']),
            'date' => $this->faker->date(),
            // Criterios de inclusión
            'inclusion_q1' => $this->faker->randomElement(['y', 'n']),
            'inclusion_q2' => $this->faker->randomElement(['y', 'n']),
            'inclusion_q3' => $this->faker->randomElement(['y', 'n']),
            // Criterios de exclusión
            'exclusion_q1' => $this->faker->randomElement(['y', 'n']),
            'exclusion_q2' => $this->faker->randomElement(['y', 'n']),
            'exclusion_q3' => $this->faker->randomElement(['y', 'n']),
            'exclusion_q4' => $this->faker->randomElement(['y', 'n']),
            'exclusion_q5' => $this->faker->randomElement(['y', 'n']),
            // Datos sociodemográficos
            'birth_date' => $this->faker->date(),
            // Antecedentes médicos
            'mh__diabetes' => $this->faker->randomElement(['y', 'n']),
            'mh__epoc' => $this->faker->randomElement(['y', 'n']),
            'mh__heart_failure' => $this->faker->randomElement(['y', 'n']),
            'mh__cancer' => $this->faker->randomElement(['y', 'n']),
            'mh__neurological_disease' => $this->faker->randomElement(['y', 'n']),
            'mh__liver_diseases' => $this->faker->randomElement(['y', 'n']),
            'mh__inflammatory_bowel_disease' => $this->faker->randomElement(['y', 'n']),
            'mh__renal_failure' => $this->faker->randomElement(['y', 'n']),
            'mh__other_chronic_diseases' => $this->faker->randomElement(['y', 'n']),
            'mh__others' => $this->faker->text(),
            // Ámbito asistencial
            'valuation_date' => $this->faker->date(),
            'hospitalization' => $this->faker->randomElement(['y', 'n']),
            'hospitalization_reason' => $this->faker->text(),
            'scheduled_visit' => $this->faker->randomElement(['y', 'n']),
			// Valoración del estado nutricional
			// Antropometría
            'current_body_weight' => $this->faker->randomFloat(2, 40, 200),
            'usual_body_weight' => $this->faker->randomFloat(2, 40, 200),
            'loss_last_six_months' => $this->faker->randomFloat(2, 0, 50),
            'weight_loss_percentage' => $this->faker->randomFloat(2, 0, 100),
            'height' => $this->faker->randomFloat(2, 100, 200),
            'BMI' => $this->faker->randomFloat(2, 15, 40),
            'calf_circumference' => $this->faker->randomFloat(2, 20, 50),
            // Cribado nutricional
            'ns__must' => $this->faker->randomElement(['y', 'n']),
            'ns__nrs_2002' => $this->faker->randomElement(['y', 'n']),
            'ns__mna_sf' => $this->faker->randomElement(['y', 'n']),
            'ns__mis' => $this->faker->randomElement(['y', 'n']),
            'ns__snaq' => $this->faker->randomElement(['y', 'n']),
            'ns__conut' => $this->faker->randomElement(['y', 'n']),
            'ns__other' => $this->faker->text(),
            'ns__result' => $this->faker->randomElement(['y', 'n']),
            // Cribado muscular
            'ms__sarc_f' => $this->faker->randomElement(['y', 'n']),
            'ms__other' => $this->faker->text(),
            'ms__result' => $this->faker->randomElement(['y', 'n']),
            // Diagnóstico nutricional utilizado
            'nd__glim' => $this->faker->randomElement(['y', 'n']),
            'nd__mna' => $this->faker->randomElement(['y', 'n']),
            'nd__vgs' => $this->faker->randomElement(['y', 'n']),
            'nd__other' => $this->faker->text(),
            'patient_malnourished' => $this->faker->randomElement(['no', 'si', 'en riesgo']),
            'patient_malnourished__code' => $this->faker->bothify('??##'),
            // Parámetros funcionales
            'dynamometry' => $this->faker->randomFloat(2, 0, 100),
            'dynamometry__not_possible' => $this->faker->randomElement(['y', 'n']),
            'test_chair_five_repetitions' => $this->faker->numberBetween(0, 60),
            'test_chair__not_possible' => $this->faker->randomElement(['y', 'n']),
            // Otras mediciones de composición corporal
            'bi__hydratation' => $this->faker->randomFloat(2, 0, 100),
            'bi__tbm' => $this->faker->randomFloat(2, 0, 100),
            'bi__ecw' => $this->faker->randomFloat(2, 0, 100),
            'bi__icw' => $this->faker->randomFloat(2, 0, 100),
            'bi__ffm' => $this->faker->randomFloat(2, 0, 100),
            'bi__fm' => $this->faker->randomFloat(2, 0, 100),
            'bi__bcm' => $this->faker->randomFloat(2, 0, 100),
            'bi__bcm_h' => $this->faker->randomFloat(2, 0, 100),
            'bi__asmm' => $this->faker->randomFloat(2, 0, 100),
            'bi__smi' => $this->faker->randomFloat(2, 0, 100),
            'bi__body_fat' => $this->faker->randomFloat(2, 0, 100),
            'bi__resistance' => $this->faker->randomFloat(2, 0, 100),
            'bi__reactance' => $this->faker->randomFloat(2, 0, 100),
            'bi__phase_angle' => $this->faker->randomFloat(2, 0, 100),
            'bi__standarized_phase_angle' => $this->faker->bothify('??##'),
            // DEXA
            'dexa__ffm' => $this->faker->randomFloat(2, 0, 100),
            'dexa__fm' => $this->faker->randomFloat(2, 0, 100),
            // TC
            'tc__ffm' => $this->faker->randomFloat(2, 0, 100),
            'tc__fm' => $this->faker->randomFloat(2, 0, 100),
            // Ecografía abdominal
            'au__total_adipose_tissue' => $this->faker->randomFloat(2, 0, 100),
            'au__superficial' => $this->faker->randomFloat(2, 0, 100),
            'au__preperitoneal' => $this->faker->randomFloat(2, 0, 100),
            // Ecografía muscular
            'mu__area' => $this->faker->randomFloat(2, 0, 100),
            'mu__circumference' => $this->faker->randomFloat(2, 0, 100),
            'mu__axes_xax' => $this->faker->randomFloat(2, 0, 999.99),
            'mu__axes_yax' => $this->faker->randomFloat(2, 0, 999.99),
            'mu__adipose_tissue' => $this->faker->randomFloat(2, 0, 999.99),
            // Resultado de la valoración muscular
            'mar__normal' => $this->faker->randomElement(['y', 'n']),
			// Tratamiento nutricional
			// Objetivo/s planteado/s (puede indicarse más de uno si en su opinión aplica)
            'nt__planted_objectives__weight_gain' => $this->faker->randomElement(['y', 'n']),
            'nt__planted_objectives__muscle_gain' => $this->faker->randomElement(['y', 'n']),
            'nt__planted_objectives__preservation_status' => $this->faker->randomElement(['y', 'n']),
            'nt__planted_objectives__other' => $this->faker->text,
            // Inicia tratamiento nutricional
            'nt__start' => $this->faker->randomElement(['y', 'n']),
            'nt__specify' => $this->faker->text,
            // Tipo de tratamiento nutricional indicado
            'nti__parental_nutrition' => $this->faker->randomElement(['y', 'n']),
            'nti__dietary_modifications' => $this->faker->randomElement(['y', 'n']),
            'nti__son' => $this->faker->randomElement(['y', 'n']),
            'nti__son__hc_with_smi' => $this->faker->randomElement(['y', 'n']),
            'nti__son__hc_without_smi' => $this->faker->randomElement(['y', 'n']),
            'nti__son__nc_without_smi' => $this->faker->randomElement(['y', 'n']),
            'nti__son__diabetics_hypercaloric' => $this->faker->randomElement(['y', 'n']),
            'nti__son__normal_normoprotein_without_msi' => $this->faker->randomElement(['y', 'n']),
            'nti__son__peptide_formulas' => $this->faker->randomElement(['y', 'n']),
            'nti__son__snp' => $this->faker->randomElement(['y', 'n']),
            'nti__son__other' => $this->faker->text,
            'nti__en' => $this->faker->randomElement(['y', 'n']),
            'nti__en__hypercaloric_with_msi' => $this->faker->randomElement(['y', 'n']),
            'nti__en__hypercaloric_without_msi' => $this->faker->randomElement(['y', 'n']),
            'nti__en__caloric_without_msi' => $this->faker->randomElement(['y', 'n']),
            'nti__en__specific_diabetics_with_smi' => $this->faker->randomElement(['y', 'n']),
            'nti__en__normal_calorie_without_smi' => $this->faker->randomElement(['y', 'n']),
            'nti__en__peptide_formulas' => $this->faker->randomElement(['y', 'n']),
            'nti__en__snp' => $this->faker->randomElement(['y', 'n']),
            'nti__en__other' => $this->faker->text,
            // Refiere al Servicio de Endocrinología y Nutrición al paciente para iniciar tratamiento nutricional
            'refers_patient_to_begin_nutritional_treatment' => $this->faker->randomElement(['y', 'n']),
            // ¿El paciente ha seguido la recomendación nutricional prescrita?
            'nt__pnr' => $this->faker->randomElement(['y', 'n']),
            'nt__pnr_percent' => $this->faker->randomFloat(2, 0, 100),
            'nt__reason' => $this->faker->text,
            // ¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?
            'nt__objective_reached' => $this->faker->randomElement(['y', 'n']),
            'nt__objective_reached_reason' => $this->faker->text,
            // ¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?
            'nt__improvement' => $this->faker->randomElement(['y', 'n']),
            'nt__has_not_got_improvement_reason' => $this->faker->text,
            // Actividad física, promoción
            'pa__prescribed' => $this->faker->randomElement(['y', 'n']),
            'pa__prescribed_reasons' => $this->faker->text,
            'pa__aerobic_predominance' => $this->faker->randomElement(['y', 'n']),
            'pa__predominance_muscular_strength' => $this->faker->randomElement(['y', 'n']),
            'pa__mixed' => $this->faker->randomElement(['y', 'n']),
            // ¿El paciente ha seguido la recomendación de actividad física prescrita?
            'pa__hpftppar' => $this->faker->randomElement(['y', 'n']),
            'pa__hpftppar_percent' => $this->faker->randomFloat(2, 0, 100),
            'pa__reason' => $this->faker->text,
            // DATOS DE LA VISITA 1
			// Situación actual del paciente
            'discharged' => $this->faker->randomElement(['y', 'n']),
            'discharged_date' => $this->faker->date,
            'readmission' => $this->faker->randomElement(['y', 'n']),
            'readmission_date' => $this->faker->date,
            'death' => $this->faker->randomElement(['y', 'n']),
            'death_date' => $this->faker->date,
            'not_come_for_control' => $this->faker->randomElement(['y', 'n']),
            // Valoración del estado nutricional
			// Antropometría
            'ans__anthropometry__current_weight' => $this->faker->randomFloat(2, 0, 999.99),
            'ans__anthropometry__initial_weight' => $this->faker->randomFloat(2, 0, 999.99),
            'ans__anthropometry__difference_percentage' => $this->faker->randomFloat(2, 0, 100),
            'ans__anthropometry__current_bmi' => $this->faker->randomFloat(2, 0, 999.99),
            'ans__anthropometry__calf_circumference' => $this->faker->randomFloat(2, 0, 999.99),
        ];
    }
}
