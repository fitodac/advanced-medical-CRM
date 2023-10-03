<?php

namespace App\Traits;

trait VisitMessageTrait
{
    /**
        *
        * • current_body_weight: valores inferiores a 30 y superiores a 150
        * • height: valores inferiores a 1,3 y superiores a 2 m
        * • BMI: valores inferiores a 15 y superiores a 35
        * • calf_circumference: valores inferiores a 20 y superiores a 50
        *
        * - Bioimpedancia eléctrica
        *
        * • bi__hydratation: valores inferiores a 50 y superiores a 80
        * • bi__ffm: valores inferiores a 20 y superiores a 70
        * • bi__fm: valores inferiores a 10 y superiores a 35
        * • bi__bcm: valores inferiores a 10 y superiores a 40
        * • bi__phase_angle: valores inferiores a 3 y superiores a 25
        *
        * -	Ecografía abdominal:
        *
        * • au__total_adipose_tissue: valores superiores a 12
        * • au__superficial:  valores superiores a 12
        * • au__preperitoneal: valores superiores a 12
        *
        * -	Ecografía muscular:
        *
        * • mu__area: valores inferiores a 5
        * • mu__circumference: valores superiores a 25
        * • mu__axes_xax: valores superiores a 12
        * • mu__axes_yax: valores superiores a 12
        * • mu__adipose_tissue: valores superiores a 12
        *
        * - Antropometría
        *
        * • ans__anthropometry__current_weight: valores inferiores a 30 kg y superiores a 150
        * • ans__anthropometry__current_bmi: valores inferiores a 15 y superiores a 35
        * • ans__anthropometry__calf_circumference: valores inferiores a 20 y superiores a 50
    */

	/**
	 * Send a success warning.
	 *
	 * @param  array  $data
	 * @return array $warning
	 */
	public function normalRangeMessageNotification($data)
	{
        $warnings = [];

        $checks = [
            'current_body_weight' => fn($value) => ($value < 30 || $value > 150) ? "fuera de rango" : null,
            'BMI' => fn($value) => ($value < 15 || $value > 35) ? "fuera de rango" : null,
            'calf_circumference' => fn($value) => ($value < 20 || $value > 50) ? "fuera de rango" : null,
            'bi__hydratation' => fn($value) => ($value < 50 || $value > 80) ? "fuera de rango" : null,
            'bi__ffm' => fn($value) => ($value < 20 || $value > 70) ? "fuera de rango" : null,
            'bi__fm' => fn($value) => ($value < 10 || $value > 35) ? "fuera de rango" : null,
            'bi__bcm' => fn($value) => ($value < 10 || $value > 40) ? "fuera de rango" : null,
            'bi__phase_angle' => fn($value) => ($value < 3 || $value > 25) ? "fuera de rango" : null,
            'au__total_adipose_tissue' => fn($value) => ($value > 12) ? "fuera de rango" : null,
            'au__superficial' => fn($value) => ($value > 12) ? "fuera de rango" : null,
            'au__preperitoneal' => fn($value) => ($value > 12) ? "fuera de rango" : null,
            'mu__area' => fn($value) => ($value < 5) ? "fuera de rango" : null,
            'mu__circumference' => fn($value) => ($value > 25) ? "fuera de rango" : null,
            'mu__axes_xax' => fn($value) => ($value > 12) ? "fuera de rango" : null,
            'mu__axes_yax' => fn($value) => ($value > 12) ? "fuera de rango" : null,
            'mu__adipose_tissue' => fn($value) => ($value > 12) ? "fuera de rango" : null,
        ];

        if($data['visit_type'] === 'initial')
        {
            array_push($checks, ['height' => fn($value) => ($value < 1.3 || $value > 2) ? "fuera de rango" : null]);
        }

        foreach ($checks as $key => $checkFn) {
            $result = $checkFn($data[$key] ?? null);
            if ($result) {
                $warnings[$key] = "({$data[$key]}) $result.";
            }
        }

        return $warnings;
	}
}
