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
    protected $hiddenFieldsInitial = ['created_at', 'updated_at', 'patient', 'patient_id', 'id'];
    protected $hiddenFieldsFirst = ['created_at', 'updated_at', 'patient', 'patient_id', 'id'];

    public function columnFormats(): array
    {
        return [
            'H' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'Q' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'AD' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'DU' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'EL' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'EU' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'FH' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'IY' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function headings(): array
    {
        return [
            "id",
            "Código paciente",
            "Código centro médico",
            "Centro médico",
            "Doctor",
            "Especialidad",
            // inicial
            "Tipo de visita", // visit_type
            "Fecha", // date
            "Personas con antecedentes de una enfermedad crónica", // inclusion_q1
            "Edad >18 años", // inclusion_q2
            "Accede a formar parte del estudio y firma el consentimiento informado", // inclusion_q3
            "Personas que no accedan a formar parte del registro y no firmen el consentimiento informado", // exclusion_q1
            "Personas sin diagnóstico de enfermedad crónica", // exclusion_q2
            "Personas con trastornos de enfermedad crónica", // exclusion_q3
            "Personas con esperanza de vida inferior a 6 meses", // exclusion_q4
            "Demencia conocida u otros ajenos a un trastorno neurológico o psiquiátrico significativo, o cualquier otra condición psicológica que pueda interferir con el desarrollo del estudio", // exclusion_q5
            "Fecha de nacimiento", // birth_date
            "Género", // gender
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
            "Otras enfermedades (descripción)", // mh__others_description
            "Fecha de valoración", // valuation_date
            "Hospitalización", // hospitalization
            "Motivo de la hospitalización", // hospitalization_reason
            "Visita programada en consulta externa/planta", // scheduled_visit
            "Peso corporal actual | kg", // current_body_weight
            "Peso corporal habitual (últimos 6 meses) | kg", // usual_body_weight
            "Pérdida en los últimos 6 meses | kg", // loss_last_six_months
            "Porcentaje de pérdida de peso | %", // weight_loss_percentage
            "Altura | cm", // height
            "IMC | kg/m2", // BMI
            "Perímetro de pantorrilla | cm", // calf_circumference
            "MUST", // ns__must
            "NRS-2002", // ns__nrs_2002
            "MNA-SF", // ns__mna_sf
            "MIS", // ns__mis
            "SNAQ", // ns__snaq
            "CONUT", // ns__conut
            "Otros", // ns__other
            "Otros (descripción)", // ns__other_description
            "Resultado del cribado nutricional: ¿Está el paciente en riesgo de desnutrición?", // ns__result
            "SARC-F", // ms__sarc_f
            "Cribado nutricional (otros)", // ms__other
            "Cribado nutricional (otros, especifique)", // ms__other_description
            "Resultado del cribado muscular: ¿Está el paciente en riesgo de sarcopenia?", // ms__result
            "GLIM", // nd__glim
            "MNA", // nd__mna
            "VGS", // nd__vgs
            "Otros", // nd__other
            "Otros (especifique)", // nd__other_description
            "¿Está el paciente desnutrido?", // patient_malnourished
            "Desnutrición del paciente según CIE 10", // patient_malnourished__code
            "Dinamometría, valor máximo de 3 mediciones | kg", // dynamometry
            "No es posible realizar la dinamometría", // dynamometry__not_possible
            "Test “Test de la silla 5 repeticiones“ | seg", // test_chair_five_repetitions
            "No es posible realizar el test de la silla", // test_chair__not_possible
            "Porcentaje de hidratación | %", // bi__hydratation
            "TBW (agua corporal total) | L", // bi__tbm
            "ECW (agua extracelular) | L", // bi__ecw
            "ICW (agua intracelular) | L", // bi__icw
            "FFM (masa magra) | kg", // bi__ffm
            "FM (masa grasa) | kg", // bi__fm
            "BCM (masa celular) | kg", // bi__bcm
            "BCM/h (masa celular dividido entre altura) | kg/m", // bi__bcm_h
            "ASMM (masa muscular apendicular) | kg", // bi__asmm
            "SMI (Índice de masa muscular) | kg", // bi__smi
            "Grasa corporal | %", // bi__body_fat
            "Resistencia (Rz/h, Ohm) | Ohm/m", // bi__resistance
            "Reactancia (Xc/h, Ohm) | Ohm/m", // bi__reactance
            "Ángulo de fase (AF) | deg", // bi__phase_angle
            "Ángulo de fase estandarizado | L", // bi__standarized_phase_angle
            "DEXA (masa magra) | kg", // dexa__ffm
            "DEXA (masa grasa) | kg", // dexa__fm
            "TC (masa magra) | kg", // tc__ffm
            "TC (masa grasa) | kg", // tc__fm
            "Ecografía abdominal: tejido adiposo total | cm", // au__total_adipose_tissue
            "Ecografía abdominal: superficial | cm", // au__superficial
            "Ecografía abdominal: preperitoneal | cm", // au__preperitoneal
            "Ecografía muscular: Área | cm", // mu__area
            "Ecografía muscular: Circunferencia | cm", // mu__circumference
            "Ecografía muscular: Ejes X | cm", // mu__axes_xax
            "Ecografía muscular: Ejes Y | cm", // mu__axes_yax
            "Ecografía muscular: Tejido adiposo | cm", // mu__adipose_tissue
            "Resultado de la valoración muscular: ¿La masa muscular/función del paciente es normal?", // mar__normal
            "Tratamiento nutricional: Ganancia ponderal", // nt__planted_objectives__weight_gain
            "Tratamiento nutricional: Ganancia muscular / fuerza / mejoría de la funcionalidad", // nt__planted_objectives__muscle_gain
            "Tratamiento nutricional: Preservación del estado nutricional y/o muscular", // nt__planted_objectives__preservation_status
            "Tratamiento nutricional: Otro", // nt__planted_objectives__other
            "Tratamiento nutricional: Otro (descripción)", // nt__planted_objectives__other_description
            "Inicia tratamiento nutricional", // nt__start
            "Inicia tratamiento nutricional, especifique", // nt__specify
            "Tipo de tratamiento nutricional indicado: nutrición parental", // nti__parental_nutrition
            "Tipo de tratamiento nutricional indicado: modificaciones dietéticas", // nti__dietary_modifications
            "SON: Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)", // nti__son
            "Opciones de SON", // nti__son__option
            "SON: otras", // nti__son__other_description
            "Nutrición enteral, tipo de fórmula", // nti__en
            "Opciones de Nutrición enteral", // nti__en__option
            "Nutrición enteral: otras", // nti__en__other_description
            "Refiere al Servicio de Endocrinología y Nutrición al paciente para iniciar tratamiento nutricional, (yo gestiono el tratamiento del paciente)", // refers_patient_to_begin_nutritional_treatment
            "¿El paciente ha seguido la recomendación nutricional prescrita?", // nt__pnr
            "Especifique % adherencia a las recomendaciones | %", // nt__pnr_percent
            "¿El paciente ha seguido la recomendación nutricional prescrita?, No, motivos", // nt__reason
            "¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?", // nt__objective_reached
            "¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?, No, motivos", // nt__objective_reached_reason
            "¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?", // nt__improvement
            "¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?, No, motivos", // nt__has_not_got_improvement_reason
            "Actividad física: ¿Ha prescrito actividad física al paciente?", // pa__prescribed
            "Actividad física: No. espceifique motivos", // pa__prescribed_reasons
            "¿Qué tipo de ejercicios ha recomendado?: Predominio aeróbico", // pa__aerobic_predominance
            "¿Qué tipo de ejercicios ha recomendado?: Predominio de fuerza/resistencia muscular", // pa__predominance_muscular_strength
            "¿Qué tipo de ejercicios ha recomendado?: Mixto", // pa__mixed
            "¿El paciente ha seguido la recomendación de actividad física prescrita?", // pa__hpftppar
            "¿El paciente ha seguido la recomendación de actividad física prescrita? especifique % de adherencia a las recomendaciones | %", // pa__hpftppar_percent
            "¿El paciente ha seguido la recomendación de actividad física prescrita?, No, motivos", // pa__reason
            "Situación actual del paciente", // patient_current_situation
            "Situación actual del paciente - Fecha", // patient_current_situation_date
            "Peso corporal actual | kg", // ans__anthropometry__current_weight
            "Peso corporal inicial | kg", // ans__anthropometry__initial_weight
            "Porcentaje de diferencia | %", // ans__anthropometry__difference_percentage
            "IMC actual | kg/m2", // ans__anthropometry__current_bmi
            "Perímetro de pantorrilla | cm", // ans__anthropometry__calf_circumference
            "¿El paciente ha seguido la recomendación nutricional prescrita?", // hfnr__followed_prescribed_nutritional_recommendation
            "Porcentaje de adherencia a las recomendaciones | %", // hfnr__percentage_of_adherece_to_recommendations
            "Motivos por los que el paciente no ha seguido la recomendación nutricional prescrita", // hfnr__not_followed_prescribed_recommendation
            "¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?", // rng__has_reached_nutritional_goal
            "¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal? motivos", // rng__has_reached_nutritional_goal_reasons
            "¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional indicado?", // cppi__considers_that_patient_perceives_improvement
            "¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional indicado? especifique motivos", // cppi__considers_that_patient_perceives_improvement_reasons
            "¿El paciente ha seguido la recomendación de actividad física prescrita?", // hfppar_followed_prescribed_physical_activity_recommendation
            "Porcentaje de adherencia a las recomendaciones | %", // hfppar_percentage_of_adherece_to_recommendations
            "Motivos por los que el paciente no ha seguido la recomendación de actividad física prescrita", // hfppar__not_followed_prescribed_recommendation
            // first
            "Tipo de visita", // visit_type
            "Fecha", // date
            "Personas con antecedentes de una enfermedad crónica", // inclusion_q1
            "Edad >18 años", // inclusion_q2
            "Accede a formar parte del estudio y firma el consentimiento informado", // inclusion_q3
            "Personas que no accedan a formar parte del registro y no firmen el consentimiento informado", // exclusion_q1
            "Personas sin diagnóstico de enfermedad crónica", // exclusion_q2
            "Personas con trastornos de enfermedad crónica", // exclusion_q3
            "Personas con esperanza de vida inferior a 6 meses", // exclusion_q4
            "Demencia conocida u otros ajenos a un trastorno neurológico o psiquiátrico significativo, o cualquier otra condición psicológica que pueda interferir con el desarrollo del estudio", // exclusion_q5
            "Fecha de nacimiento", // birth_date
            "Género", // gender
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
            "Otras enfermedades (descripción)", // mh__others_description
            "Fecha de valoración", // valuation_date
            "Hospitalización", // hospitalization
            "Motivo de la hospitalización", // hospitalization_reason
            "Visita programada en consulta externa/planta", // scheduled_visit
            "Peso corporal actual | kg", // current_body_weight
            "Peso corporal habitual (últimos 6 meses) | kg", // usual_body_weight
            "Pérdida en los últimos 6 meses | kg", // loss_last_six_months
            "Porcentaje de pérdida de peso | %", // weight_loss_percentage
            "Altura | cm", // height
            "IMC | kg/m2", // BMI
            "Perímetro de pantorrilla | cm", // calf_circumference
            "MUST", // ns__must
            "NRS-2002", // ns__nrs_2002
            "MNA-SF", // ns__mna_sf
            "MIS", // ns__mis
            "SNAQ", // ns__snaq
            "CONUT", // ns__conut
            "Otros", // ns__other
            "Otros (descripción)", // ns__other_description
            "Resultado del cribado nutricional: ¿Está el paciente en riesgo de desnutrición?", // ns__result
            "SARC-F", // ms__sarc_f
            "Cribado nutricional (otros)", // ms__other
            "Cribado nutricional (otros, especifique)", // ms__other_description
            "Resultado del cribado muscular: ¿Está el paciente en riesgo de sarcopenia?", // ms__result
            "GLIM", // nd__glim
            "MNA", // nd__mna
            "VGS", // nd__vgs
            "Otros", // nd__other
            "Otros (especifique)", // nd__other_description
            "¿Está el paciente desnutrido?", // patient_malnourished
            "Desnutrición del paciente según CIE 10", // patient_malnourished__code
            "Dinamometría, valor máximo de 3 mediciones | kg", // dynamometry
            "No es posible realizar la dinamometría", // dynamometry__not_possible
            "Test “Test de la silla 5 repeticiones“ | seg", // test_chair_five_repetitions
            "No es posible realizar el test de la silla", // test_chair__not_possible
            "Porcentaje de hidratación | %", // bi__hydratation
            "TBW (agua corporal total) | L", // bi__tbm
            "ECW (agua extracelular) | L", // bi__ecw
            "ICW (agua intracelular) | L", // bi__icw
            "FFM (masa magra) | kg", // bi__ffm
            "FM (masa grasa) | kg", // bi__fm
            "BCM (masa celular) | kg", // bi__bcm
            "BCM/h (masa celular dividido entre altura) | kg/m", // bi__bcm_h
            "ASMM (masa muscular apendicular) | kg", // bi__asmm
            "SMI (Índice de masa muscular) | kg", // bi__smi
            "Grasa corporal | %", // bi__body_fat
            "Resistencia (Rz/h, Ohm) | Ohm/m", // bi__resistance
            "Reactancia (Xc/h, Ohm) | Ohm/m", // bi__reactance
            "Ángulo de fase (AF) | deg", // bi__phase_angle
            "Ángulo de fase estandarizado | L", // bi__standarized_phase_angle
            "DEXA (masa magra) | kg", // dexa__ffm
            "DEXA (masa grasa) | kg", // dexa__fm
            "TC (masa magra) | kg", // tc__ffm
            "TC (masa grasa) | kg", // tc__fm
            "Ecografía abdominal: tejido adiposo total | cm", // au__total_adipose_tissue
            "Ecografía abdominal: superficial | cm", // au__superficial
            "Ecografía abdominal: preperitoneal | cm", // au__preperitoneal
            "Ecografía muscular: Área | cm", // mu__area
            "Ecografía muscular: Circunferencia | cm", // mu__circumference
            "Ecografía muscular: Ejes X | cm", // mu__axes_xax
            "Ecografía muscular: Ejes Y | cm", // mu__axes_yax
            "Ecografía muscular: Tejido adiposo | cm", // mu__adipose_tissue
            "Resultado de la valoración muscular: ¿La masa muscular/función del paciente es normal?", // mar__normal
            "Tratamiento nutricional: Ganancia ponderal", // nt__planted_objectives__weight_gain
            "Tratamiento nutricional: Ganancia muscular / fuerza / mejoría de la funcionalidad", // nt__planted_objectives__muscle_gain
            "Tratamiento nutricional: Preservación del estado nutricional y/o muscular", // nt__planted_objectives__preservation_status
            "Tratamiento nutricional: Otro", // nt__planted_objectives__other
            "Tratamiento nutricional: Otro (descripción)", // nt__planted_objectives__other_description
            "Inicia tratamiento nutricional", // nt__start
            "Inicia tratamiento nutricional, especifique", // nt__specify
            "Tipo de tratamiento nutricional indicado: nutrición parental", // nti__parental_nutrition
            "Tipo de tratamiento nutricional indicado: modificaciones dietéticas", // nti__dietary_modifications
            "SON: Hipercalórica/Hiperproteica con ingrediente Músculo Específico (HMB y/o Leucina)", // nti__son
            "Opciones de SON", // nti__son__option
            "SON: otras", // nti__son__other_description
            "Nutrición enteral, tipo de fórmula", // nti__en
            "Opciones de Nutrición enteral", // nti__en__option
            "Nutrición enteral: otras", // nti__en__other_description
            "Refiere al Servicio de Endocrinología y Nutrición al paciente para iniciar tratamiento nutricional, (yo gestiono el tratamiento del paciente)", // refers_patient_to_begin_nutritional_treatment
            "¿El paciente ha seguido la recomendación nutricional prescrita?", // nt__pnr
            "Especifique % adherencia a las recomendaciones | %", // nt__pnr_percent
            "¿El paciente ha seguido la recomendación nutricional prescrita?, No, motivos", // nt__reason
            "¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?", // nt__objective_reached
            "¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?, No, motivos", // nt__objective_reached_reason
            "¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?", // nt__improvement
            "¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional iniciado?, No, motivos", // nt__has_not_got_improvement_reason
            "Actividad física: ¿Ha prescrito actividad física al paciente?", // pa__prescribed
            "Actividad física: No. espceifique motivos", // pa__prescribed_reasons
            "¿Qué tipo de ejercicios ha recomendado?: Predominio aeróbico", // pa__aerobic_predominance
            "¿Qué tipo de ejercicios ha recomendado?: Predominio de fuerza/resistencia muscular", // pa__predominance_muscular_strength
            "¿Qué tipo de ejercicios ha recomendado?: Mixto", // pa__mixed
            "¿El paciente ha seguido la recomendación de actividad física prescrita?", // pa__hpftppar
            "¿El paciente ha seguido la recomendación de actividad física prescrita? especifique % de adherencia a las recomendaciones | %", // pa__hpftppar_percent
            "¿El paciente ha seguido la recomendación de actividad física prescrita?, No, motivos", // pa__reason
            "Situación actual del paciente", // patient_current_situation
            "Situación actual del paciente - Fecha", // patient_current_situation_date
            "Peso corporal actual | kg", // ans__anthropometry__current_weight
            "Peso corporal inicial | kg", // ans__anthropometry__initial_weight
            "Porcentaje de diferencia | %", // ans__anthropometry__difference_percentage
            "IMC actual | kg/m2", // ans__anthropometry__current_bmi
            "Perímetro de pantorrilla | cm", // ans__anthropometry__calf_circumference
            "¿El paciente ha seguido la recomendación nutricional prescrita?", // hfnr__followed_prescribed_nutritional_recommendation
            "Porcentaje de adherencia a las recomendaciones | %", // hfnr__percentage_of_adherece_to_recommendations
            "Motivos por los que el paciente no ha seguido la recomendación nutricional prescrita", // hfnr__not_followed_prescribed_recommendation
            "¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?", // rng__has_reached_nutritional_goal
            "¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal? motivos", // rng__has_reached_nutritional_goal_reasons
            "¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional indicado?", // cppi__considers_that_patient_perceives_improvement
            "¿Tras la entrevista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional indicado? especifique motivos", // cppi__considers_that_patient_perceives_improvement_reasons
            "¿El paciente ha seguido la recomendación de actividad física prescrita?", // hfppar_followed_prescribed_physical_activity_recommendation
            "Porcentaje de adherencia a las recomendaciones | %", // hfppar_percentage_of_adherece_to_recommendations
            "Motivos por los que el paciente no ha seguido la recomendación de actividad física prescrita", // hfppar__not_followed_prescribed_recommendation
        ];
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $visits = Visit::with('patient', 'patient.center', 'patient.doctor.user', 'patient.doctor.specialty')
                    ->get()
                    ->groupBy(['patient_id', 'visit_type']);
        $response = [];
        $v = [];
        $x = 0;

        foreach ($visits as $visit) {
            $x++;

            $initial = $visit['initial']->first();
            $first = $visit['first']->first();

            $patient = $initial['patient'];

            $initial['visit_type'] = 'Inicial';
            $first['visit_type'] = 'Segunda';

            // Con makehidden se ocultarian los campos definidos como protegidos en la linea 17 y 18
            $initial = $initial->makeHidden($this->hiddenFieldsInitial);
            $first = $first->makeHidden($this->hiddenFieldsFirst);

            $response[] = array_merge(
                [
                    '#'             => $x,
                    'code'          => $patient['code'],
                    'center_code'   => $patient['center']['code'],
                    'center'        => $patient['center']['name'],
                    'doctor'        => $patient['doctor']['user']['firstname'] .' '. $patient['doctor']['user']['lastname'],
                    'specialty'     => $patient['doctor']['specialty']['name']
                ],
                array_values($initial->toArray()),
                array_values($first->toArray()),
            );
        }

        return collect($response);
    }
}
