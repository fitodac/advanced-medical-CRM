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



class VisitsExport implements 
	FromCollection, 
	WithHeadings, 
	WithColumnFormatting, 
	WithStyles, 
	WithDefaultStyles, 
	ShouldAutoSize
{
    use Exportable;
    protected $header = [];
		protected $hiddenFieldsInitial;
		protected $hiddenFieldsFirst;

		public function __construct()
		{
			require(__DIR__.'/settings/hiddenFields.php');
			$this->hiddenFieldsInitial = $hidden_fields_initial;
			$this->hiddenFieldsFirst = $hidden_fields_first;
		}

    public function columnFormats(): array
    {
			return [
				'G' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'P' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'AC' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				'DG' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				// 'EL' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				// 'EU' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				// 'FH' => NumberFormat::FORMAT_DATE_DDMMYYYY,
				// 'IY' => NumberFormat::FORMAT_DATE_DDMMYYYY,
			];
    }

    public function headings(): array
    {
			require(__DIR__.'/settings/headers.php');
			return $headers;
    }


		public function styles(Worksheet $sheet): array
    {
			return [
				1 => [
					'font' => [
						'bold' => true,
						'size' => 16,
						'color' => ['rgb' => 'FFFFFF']
					],
					'fill' => [
						'fillType' => Fill::FILL_SOLID,
						'startColor' => ['rgb' => '333333']
					]
				],
				2 => [
					'font' => [
						'bold' => true,
						'size' => 12
					],
					'fill' => [
						'fillType' => Fill::FILL_SOLID,
						'startColor' => ['rgb' => 'CCCCCC']
					]
				],
				3 => [
					'font' => ['bold' => true],
					'fill' => [
						'fillType' => Fill::FILL_SOLID,
						'startColor' => ['rgb' => 'EEEEEE']
					]
				],
				4 => [
					'font' => ['bold' => true]
				]
			];
		}


		public function defaultStyles(Style $defaultStyle)
		{
			return [
				'font' => [
					'name' => 'sans-serif'
				],
				'alignment' => [
					'wrapText' => true
				]
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
        $x = 0;

        foreach ($visits as $visit) {
            $x++;

            $initial = $visit['initial']->first();
            $first = $visit['first']->first();

            $patient = $initial['patient'];

            // Con makehidden se ocultarian los campos definidos como protegidos en la linea 17 y 18
            $initial = $initial->makeHidden($this->hiddenFieldsInitial);
            $first = $first->makeHidden($this->hiddenFieldsFirst);

						$initial_values = array_values($initial->toArray());
						// $first_values = array_values($first->toArray());
						$first_values = [
							'date' => $first->date,
							'patient_current_situation' => $first->patient_current_situation,
							'patient_current_situation_date' => $first->patient_current_situation_date,
							'ans__anthropometry__current_weight' => $first->ans__anthropometry__current_weight,
							'ans__anthropometry__initial_weight' => $first->ans__anthropometry__initial_weight,
							'ans__anthropometry__difference_percentage' => $first->ans__anthropometry__difference_percentage,
							'ans__anthropometry__current_bmi' => $first->ans__anthropometry__current_bmi,
							'ans__anthropometry__calf_circumference' => $first->ans__anthropometry__calf_circumference
						];

						foreach($initial_values as $value => $key){
							if($value === 'y') $initial_values[$key] = 'SÍ';
							if($value === 'n') $initial_values[$key] = 'NO';
						}

						// foreach($first_values as $value => $key){
						// 	if($value === 'y') $first_values[$key] = 'SÍ';
						// 	if($value === 'n') $first_values[$key] = 'NO';
						// }

            $response[] = array_merge(
							[
								'#'             => $x,
								'code'          => $patient['code'],
								'center_code'   => $patient['center']['code'],
								'center'        => $patient['center']['name'],
								'doctor'        => $patient['doctor']['user']['firstname'] .' '. $patient['doctor']['user']['lastname'],
								'specialty'     => $patient['doctor']['specialty']['name'],
							],
							// array_values($initial->toArray()),
							$initial_values,
							[
								'blank_1' => ''
							],
							// array_values($first->toArray()),
							$first_values
            );
        }

        return collect($response);
    }
}
