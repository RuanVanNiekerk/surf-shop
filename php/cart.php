<?php
session_start();

$requestPayload = file_get_contents('php://input');
$object = json_decode($requestPayload, true);

if($_SESSION["cart"] == NULL){
    $_SESSION["cart"] = [];
}

//run if cart is being changed
if($object[request_name] == 'updateCart'){
    $_SESSION["cart"] = $object[cartInv];
    echo "Cart has been saved to session". var_dump($_SESSION["cart"]);    
}

//run if cart session data is called
if($_GET['query'] == 'getCart'){
    echo json_encode($_SESSION["cart"]);
}