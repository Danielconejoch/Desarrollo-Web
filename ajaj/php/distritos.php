<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$request = json_decode(file_get_contents('php://input'));

switch($request->id) {
    case 1:
        $distritos = array(
            array('id' => 1, 'nombre' => 'Carmen'),
            array('id' => 2, 'nombre' => 'Merced')
        );
        break;
    case 2:
        $distritos = array(
            array('id' => 1, 'nombre' => 'Pavas Central'),
            array('id' => 2, 'nombre' => 'Rohrmoser')
        );
        break;
    case 3:
        $distritos = array(
            array('id' => 1, 'nombre' => 'Alajuela Centro'),
            array('id' => 2, 'nombre' => 'San José')
        );
        break;
    case 4:
        $distritos = array(
            array('id' => 1, 'nombre' => 'San Rafael Centro'),
            array('id' => 2, 'nombre' => 'Concepción')
        );
        break;
    default:
        $distritos = array();
        break;
}

echo json_encode($distritos);
