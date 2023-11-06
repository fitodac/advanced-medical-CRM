<?php
use PhpOffice\PhpSpreadsheet\Style\Fill;

$h1_style = [
	'font' => [
		'bold' => true,
		'size' => 16,
		'color' => ['rgb' => 'FFFFFF']
	],
	'fill' => [
		'fillType' => Fill::FILL_SOLID,
		'startColor' => ['rgb' => '333333']
	]
];

$h2_style = [
	'font' => [
		'bold' => true, 
		'size' => 12
	], 
	'fill' => [
		'fillType' => Fill::FILL_SOLID, 
		'startColor' => ['rgb' => 'CCCCCC']
	]
];

$h3_style = [
	'font' => [
		'bold' => true,
		'size' => 12
	],
	'fill' => [
		'fillType' => Fill::FILL_SOLID,
		'startColor' => ['rgb' => 'EEEEEE']
	]
];

$styles = [
	1 => $h1_style,
	2 => $h2_style,
	3 => $h3_style,
	4 => [
		'font' => ['bold' => true]
	]
];

$cells = [
	'DK', 'DL', 'DM', 'DN', 'DO', 'DP', 'DQ', 'DR', 'DS','DK', 'DT', 'DU', 'DV', 'DW', 'DX', 
	'DY', 'DZ', 'EA', 'EB', 'EC', 'ED', 'EE', 'EF', 'EG', 'EH', 'EI', 'EJ', 'EK', 'EL', 'EM', 
	'EN', 'EO', 'EP', 'EQ', 'ER', 'ES', 'ET', 'EU', 'EV', 
	'EW', 'EX', 'EY', 'EZ', 'FA', 'FB', 'FC'
];

foreach($cells as $c){
	$styles[$c.'2'] = [
		'font' => [
			'bold' => true, 
			'size' => 12
		], 
		'fill' => [
			'fillType' => Fill::FILL_SOLID, 
			'startColor' => ['rgb' => 'CCCCCC']
		]
	];
}

foreach($cells as $c){
	$styles[$c.'3'] = [
		'font' => [
			'bold' => true,
			'size' => 12
		],
		'fill' => [
			'fillType' => Fill::FILL_SOLID,
			'startColor' => ['rgb' => 'EEEEEE']
		]
	];
}