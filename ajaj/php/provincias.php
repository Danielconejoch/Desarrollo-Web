<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$provincias = array(
    array('id' => 1, 'nombre' => 'San José'),
    array('id' => 2, 'nombre' => 'Alajuela')
);

echo json_encode($provincias);
