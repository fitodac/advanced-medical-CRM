<?php

namespace App\Exports;

use App\Models\Visit;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;

class VisitsExport implements FromCollection
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $visits = Visit::with('patient')->get()->toArray();

        $response = [];
        $x = 0;

        foreach ($visits as $visit) {
            $x++;

            // $temp[$x] = [
            //     '#' => $x,
            //     'nombre' => $visit['patient']['name'],
            // ];

            // Eliminar claves no deseadas
            unset($visit['created_at']);
            unset($visit['updated_at']);
            unset($visit['patient']);
            unset($visit['patient_id']);
            unset($visit['id']);

            // $response[] = array_merge($temp[$x], $visit);
            $response[] = $visit;
        }

        return collect($response);
    }
}
