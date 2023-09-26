<?php

namespace App\Http\Controllers\Api;

use App\Traits\ApiResponse;
use App\Exports\VisitsExport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ExportController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $name = 'visits-' . now()->format('Ymd-His') . '.xlsx';

        $export = new VisitsExport;
        $export->store('public/'.$name);

        $url = Storage::disk('public')->url($name);

        return $this->successResponse($url);
    }
}
