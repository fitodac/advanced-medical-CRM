<?php

namespace App\Exports;

use App\Models\Visit;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class VisitsExport implements FromCollection, WithHeadings, WithColumnFormatting
{
    use Exportable;
    protected $header = [];

    public function columnFormats(): array
    {
			return [
				'C' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'L' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'X' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'EC' => NumberFormat::FORMAT_DATE_DDMMYYYY,
			];
    }

    public function headings(): array
    {
			return [
				"id",
				"Tipo de visita",
				"Fecha",
				"inclusion_q1",
				"inclusion_q2",
				"inclusion_q3",
				"exclusion_q1",
				"exclusion_q2",
				"exclusion_q3",
				"exclusion_q4",
				"exclusion_q5",
				"birth_date",
				"mh__diabetes",
				"mh__epoc",
				"mh__heart_failure",
				"mh__cancer",
				"mh__neurological_disease",
				"mh__liver_diseases",
				"mh__inflammatory_bowel_disease",
				"mh__renal_failure",
				"mh__other_chronic_diseases",
				"mh__others",
				"mh__others_description",
				"valuation_date",
				"hospitalization",
				"hospitalization_reason",
				"scheduled_visit",
				"current_body_weight",
				"usual_body_weight",
				"loss_last_six_months",
				"weight_loss_percentage",
				"height",
				"BMI",
				"calf_circumference",
				"ns__must",
				"ns__nrs_2002",
				"ns__mna_sf",
				"ns__mis",
				"ns__snaq",
				"ns__conut",
				"ns__other",
				"ns__other_description",
				"ns__result",
				"ms__sarc_f",
				"ms__other",
				"ms__other_description",
				"ms__result",
				"nd__glim",
				"nd__mna",
				"nd__vgs",
				"nd__other",
				"nd__other_description",
				"patient_malnourished",
				"patient_malnourished__code",
				"dynamometry",
				"dynamometry__not_possible",
				"test_chair_five_repetitions",
				"test_chair__not_possible",
				"bi__hydratation",
				"bi__tbm",
				"bi__ecw",
				"bi__icw",
				"bi__ffm",
				"bi__fm",
				"bi__bcm",
				"bi__bcm_h",
				"bi__asmm",
				"bi__smi",
				"bi__body_fat",
				"bi__resistance",
				"bi__reactance",
				"bi__phase_angle",
				"bi__standarized_phase_angle",
				"dexa__ffm",
				"dexa__fm",
				"tc__ffm",
				"tc__fm",
				"au__total_adipose_tissue",
				"au__superficial",
				"au__preperitoneal",
				"mu__area",
				"mu__circumference",
				"mu__axes_xax",
				"mu__axes_yax",
				"mu__adipose_tissue",
				"mar__normal",
				"nt__planted_objectives__weight_gain",
				"nt__planted_objectives__muscle_gain",
				"nt__planted_objectives__preservation_status",
				"nt__planted_objectives__other",
				"nt__planted_objectives__other_description",
				"nt__start",
				"nt__specify",
				"nti__parental_nutrition",
				"nti__dietary_modifications",
				"nti__son",
				"nti__son__hc_with_smi",
				"nti__son__hc_without_smi",
				"nti__son__nc_without_smi",
				"nti__son__diabetics_hypercaloric",
				"nti__son__normal_normoprotein_without_msi",
				"nti__son__peptide_formulas",
				"nti__son__snp",
				"nti__son__other",
				"nti__son__other_description",
				"nti__en",
				"nti__en__hypercaloric_with_msi",
				"nti__en__hypercaloric_without_msi",
				"nti__en__caloric_without_msi",
				"nti__en__specific_diabetics_with_smi",
				"nti__en__normal_calorie_without_smi",
				"nti__en__peptide_formulas",
				"nti__en__snp",
				"nti__en__other",
				"nti__en__other_description",
				"refers_patient_to_begin_nutritional_treatment",
				"nt__pnr",
				"nt__pnr_percent",
				"nt__reason",
				"nt__objective_reached",
				"nt__objective_reached_reason",
				"nt__improvement",
				"nt__has_not_got_improvement_reason",
				"pa__prescribed",
				"pa__prescribed_reasons",
				"pa__aerobic_predominance",
				"pa__predominance_muscular_strength",
				"pa__mixed",
				"pa__hpftppar",
				"pa__hpftppar_percent",
				"pa__reason",
				"patient_current_situation",
				"patient_current_situation_date",
				"ans__anthropometry__current_weight",
				"ans__anthropometry__initial_weight",
				"ans__anthropometry__difference_percentage",
				"ans__anthropometry__current_bmi",
				"ans__anthropometry__calf_circumference",
				"hfnr__followed_prescribed_nutritional_recommendation",
				"hfnr__percentage_of_adherece_to_recommendations",
				"hfnr__not_followed_prescribed_recommendation",
				"rng__has_reached_nutritional_goal",
				"rng__has_reached_nutritional_goal_reasons",
				"cppi__considers_that_patient_perceives_improvement",
				"cppi__considers_that_patient_perceives_improvement_reasons",
				"hfppar_followed_prescribed_physical_activity_recommendation",
				"hfppar_percentage_of_adherece_to_recommendations",
				"hfppar__not_followed_prescribed_recommendation",
			];
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $visits = Visit::with('patient', 'patient.center', 'patient.doctor.user', 'patient.doctor.specialty')->get();
        $response = [];
        $x = 0;

        foreach ($visits->toArray() as $visit) {
            $x++;

            $temp[$x] = [
                '#' => $x,
            ];

            // Eliminar claves no deseadas
            unset($visit['created_at']);
            unset($visit['updated_at']);
            // unset($visit['patient']);
            unset($visit['patient_id']);
            unset($visit['id']);

            $response[] = array_merge($temp[$x], $visit);
        }

        return collect($response);
    }
}
