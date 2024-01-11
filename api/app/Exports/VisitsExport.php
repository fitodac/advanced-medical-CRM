<?php

namespace App\Exports;

use App\Models\Visit;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Style;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\WithEvents;



class VisitsExport implements
	FromCollection,
	WithHeadings,
	WithColumnFormatting,
	WithStyles,
	WithDefaultStyles,
	ShouldAutoSize,
	WithEvents,
	WithCustomStartCell
{
	use Exportable;
	protected $header = [];
	protected $hiddenFieldsInitial;
	protected $hiddenFieldsInitialForAdmins;
	protected $auth;

	public function __construct()
	{
		require(__DIR__ . '/settings/hiddenFields.php');
		$this->hiddenFieldsInitial = $hidden_fields_initial;
		$this->hiddenFieldsInitialForAdmins = $hidden_fields_initial_for_admins;

		$this->auth = Auth::user();
	}

	public function columnFormats(): array
	{
		return $this->auth->role === 'admin' ?
			[
				'G' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'H' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'I' => NumberFormat::FORMAT_DATE_DDMMYYYY,
			]
			:
			[
				'G' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'P' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'AC' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'DH' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'DJ' => NumberFormat::FORMAT_DATE_DDMMYYYY,
			];
	}

	public function headings(): array
	{
		require(__DIR__ . '/settings/headers.php');

		if ($this->auth->role === 'admin') {
			for ($i = 7; $i < 15; $i++) unset($headers[$i]);
			for ($i = 16; $i < 28; $i++) unset($headers[$i]);
			for ($i = 29; $i < 160; $i++) unset($headers[$i]);
		}

		return $headers;
	}

	public function registerEvents(): array
	{

		return [
			AfterSheet::class => function (AfterSheet $event) {
				require(__DIR__ . '/settings/events.php');

				if ($this->auth->role === 'superadmin') {
					$event->sheet->mergeCells('A1:F1');
					$event->sheet->mergeCells('G1:DF1');
					$event->sheet->mergeCells('DH1:FC1');

					$event->sheet->setCellValue('G1', 'VISITA INICIAL');
					$event->sheet->setCellValue('DH1', 'VISITA SEGUIMIENTO 1');

					foreach ($superadmin as $i => $val) $event->sheet->setCellValue($i, $val);
				}


				if ($this->auth->role === 'admin') {
					$event->sheet->mergeCells('A1:F1');
					$event->sheet->mergeCells('G1:I1');
					$event->sheet->mergeCells('J1:L1');

					$event->sheet->setCellValue('G1', 'VISITA INICIAL');
					$event->sheet->setCellValue('J1', 'VISITA SEGUIMIENTO 1');

					$event->sheet->setCellValue('H2', 'Datos sociodemográficos');
					$event->sheet->setCellValue('I2', 'Ámbito asistencial');

					$event->sheet->setCellValue('J4', 'Fecha');
					$event->sheet->setCellValue('K4', 'Situación actual del paciente');
					$event->sheet->setCellValue('L4', 'Fecha de situación actual del paciente');
				}
			}
		];
	}

	public function startCell(): string
	{
		return 'A4';
	}

	public function styles(Worksheet $sheet): array
	{
		require(__DIR__ . '/settings/styles.php');

		if ($this->auth->role === 'admin') {
			$cells = ['J', 'K', 'L'];

			foreach ($cells as $h) {
				$styles[$h . '1'] = $h1_style;
				$styles[$h . '2'] = $h2_style;
				$styles[$h . '3'] = $h3_style;
				$styles[$h . '4'] = ['font' => ['bold' => true]];
			}
		}

		return $styles;
	}


	public function defaultStyles(Style $defaultStyle)
	{
		return [
			'font' => [
				'name' => 'sans-serif'
			]
		];
	}


	public function confirmationForHumans($val)
	{
		return 'y' === $val ? 'SÍ' : ('n' === $val ? 'NO' : $val);
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
		$x = 0;

		foreach ($visits as $visit) {
			$x++;

			$initial = $visit['initial']->first();
			// Con makehidden se ocultarian los campos definidos como protegidos en la linea 17 y 18
			$initial = $this->auth->role === 'admin' ? $initial->makeHidden($this->hiddenFieldsInitialForAdmins) : $initial->makeHidden($this->hiddenFieldsInitial);

			// Patient
			$patient = $initial['patient'];
			$patient_data = ['#' => $x];
			$patient_data['code'] = $patient['code'];
			$patient_data['center_code'] = $patient['center']['code'];
			$patient_data['center'] = $patient['center']['name'];
			$patient_data['doctor'] = $patient['doctor']['user']['firstname'] . ' ' . $patient['doctor']['user']['lastname'];
			$patient_data['specialty'] = $patient['doctor']['specialty']['name'];

			$initial_values = [];
			foreach ($initial->toArray() as $value) {
				$initial_values[] = $this->confirmationForHumans($value);
			}


			$first_values = [];

			if (isset($visit['first'])) {
				$first = $visit['first']->first();

				$first_values = $this->auth->role === 'admin' ?
					[
						'date' => isset($first->date) ? $first->date->format('d/m/Y') : null,
						'patient_current_situation' => $first->patient_current_situation,
						'patient_current_situation_date' => isset($first->patient_current_situation_date) ? $first->patient_current_situation_date->format('d/m/Y') : ''
					] : [
						'date' => isset($first->date) ? $first->date->format('d/m/Y') : null,
						'patient_current_situation' => $first->patient_current_situation,
						'patient_current_situation_date' => isset($first->patient_current_situation_date) ? $first->patient_current_situation_date->format('d/m/Y') : null,
						'ans__anthropometry__current_weight' => $first->ans__anthropometry__current_weight,
						'ans__anthropometry__initial_weight' => $first->ans__anthropometry__initial_weight,
						'ans__anthropometry__difference_percentage' => $first->ans__anthropometry__difference_percentage,
						'ans__anthropometry__current_bmi' => $first->ans__anthropometry__current_bmi,
						'ans__anthropometry__calf_circumference' => $first->ans__anthropometry__calf_circumference,
						'dynamometry' => $first->dynamometry,
						'dynamometry__not_possible' => $this->confirmationForHumans($first->dynamometry__not_possible),
						'test_chair_five_repetitions' => $first->test_chair_five_repetitions,
						'test_chair__not_possible' => $this->confirmationForHumans($first->test_chair__not_possible),
						'bi__hydratation' => $first->bi__hydratation,
						'bi__tbm' => $first->bi__tbm,
						'bi__ecw' => $first->bi__ecw,
						'bi__icw' => $first->bi__icw,
						'bi__ffm' => $first->bi__ffm,
						'bi__fm' => $first->bi__fm,
						'bi__bcm' => $first->bi__bcm,
						'bi__bcm_h' => $first->bi__bcm_h,
						'bi__asmm' => $first->bi__asmm,
						'bi__smi' => $first->bi__smi,
						'bi__body_fat' => $first->bi__body_fat,
						'bi__resistance' => $first->bi__resistance,
						'bi__reactance' => $first->bi__reactance,
						'bi__phase_angle' => $first->bi__phase_angle,
						'bi__standarized_phase_angle' => $first->bi__standarized_phase_angle,
						'dexa__ffm' => $first->dexa__ffm,
						'dexa__fm' => $first->dexa__fm,
						'tc__ffm' => $first->tc__ffm,
						'tc__fm' => $first->tc__fm,
						'au__total_adipose_tissue' => $first->au__total_adipose_tissue,
						'au__superficial' => $first->au__superficial,
						'au__preperitoneal' => $first->au__preperitoneal,
						'mu__area' => $first->mu__area,
						'mu__circumference' => $first->mu__circumference,
						'mu__axes_xax' => $first->mu__axes_xax,
						'mu__axes_yax' => $first->mu__axes_yax,
						'mu__adipose_tissue' => $first->mu__adipose_tissue,
						'hfnr__followed_prescribed_nutritional_recommendation' => $this->confirmationForHumans($first->hfnr__followed_prescribed_nutritional_recommendation),
						'hfnr__percentage_of_adherece_to_recommendations' => $first->hfnr__percentage_of_adherece_to_recommendations,
						'hfnr__not_followed_prescribed_recommendation' => $first->hfnr__not_followed_prescribed_recommendation,
						'rng__has_reached_nutritional_goal' => $this->confirmationForHumans($first->rng__has_reached_nutritional_goal),
						'rng__has_reached_nutritional_goal_reasons' => $first->rng__has_reached_nutritional_goal_reasons,
						'cppi__considers_that_patient_perceives_improvement' => $this->confirmationForHumans($first->cppi__considers_that_patient_perceives_improvement),
						'cppi__considers_that_patient_perceives_improvement_reasons' => $first->cppi__considers_that_patient_perceives_improvement_reasons,
						'hfppar_followed_prescribed_physical_activity_recommendation' => $this->confirmationForHumans($first->hfppar_followed_prescribed_physical_activity_recommendation),
						'hfppar__not_followed_prescribed_recommendation' => $first->hfppar__not_followed_prescribed_recommendation,
					];
			}



			$response[] = $this->auth->role === 'admin' ?
				array_merge(
					$patient_data,
					$initial_values,
					$first_values
				) :
				array_merge(
					$patient_data,
					$initial_values,
					['blank_1' => ''],
					$first_values
				);
		}

		return collect($response);
	}
}
