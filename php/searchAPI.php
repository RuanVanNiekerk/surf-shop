<?php
session_start();

$requestPayload = file_get_contents('php://input');
$object = json_decode($requestPayload, true);

// In the following two lines, we are calling the two dependacies within the Slim which we are going to use of later 
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';// This is compulsory for our framework to work, but don't worry too much about how it works

$app = new \Slim\App;// We create an object of the Slim framework main app

// sends all of the searched item to a endpoint
$app->get('/searchResults', function (Request $request, Response $response, array $args) {
    require_once 'connectServer.php';// Calling the database connection file
    //checks if a item has been searched for
    if(isset($_SESSION["searchedItem"])){
        $data = $_SESSION["searchedItem"];
        return json_encode($data);// Translate this array into JSON
    }
});
$app->run();