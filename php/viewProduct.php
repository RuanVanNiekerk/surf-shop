<?php
session_start();
require ('connectServer.php');

$requestPayload = file_get_contents('php://input');
$object = json_decode($requestPayload, true);

//run to process view item
if($object[request_name] == 'viewItem'){
    $stmt = $conn->prepare("SELECT * FROM products WHERE product_id = (?)");

    //set Parameters
    $search = $object[searchInput];

    //bind variables to prepared statement
    $stmt->bind_param("s", $search);
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Check if query was successful(not sure why not working)
    if($result->num_rows > 0){
        $data = [];
        $i = 0;
        while ($row = $result->fetch_assoc()){
            $data[] = $row;
            $i++;
        }
        $_SESSION["searchedItem"] = $data;
        echo json_encode($data);
    }else{
        echo 'Could not find a match';
    }
}
