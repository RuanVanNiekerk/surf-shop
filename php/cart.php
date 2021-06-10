<?php
session_start();
require ('connectServer.php');

$requestPayload = file_get_contents('php://input');
$object = json_decode($requestPayload, true);

if($_SESSION["cart"] == NULL){
    $_SESSION["cart"] = [];
}

//run if cart is being changed
if($object[request_name] == 'updateCart'){
    $_SESSION["cart"] = $object[cartInv];
    echo "Cart has been saved to session";    
}

//run if cart session data is called
if($_GET['query'] == 'getCart'){
    echo json_encode($_SESSION["cart"]);
}

//run if order is being sent to databse
if($object[request_name] == 'submitCart'){
    $stmt = $conn->prepare("INSERT INTO orders (product_order_ids, user_id) VALUES (?, ?)");

    //set Parameters
    $cart = $_SESSION["cart"];
    $orderIds = "";
    foreach($cart as $item){
        $orderIds .= " " . $item["product_id"];
    }
    $user = $_SESSION["current_user"]["user_id"];

    //bind variables to prepared statement
    $stmt->bind_param("si", $orderIds, $user);
    
    $result = $stmt->execute();// Storing select query in a variable
    
    // Check if query was successful(not sure why not working)
    if($result === true){
        echo 'Order has been submitted';
    }else{
        echo 'Could not create query!'. $conn->error;
    } 
}