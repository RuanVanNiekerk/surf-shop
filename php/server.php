<?php
session_start();
require ('connectServer.php');

$requestPayload = file_get_contents('php://input');
$object = json_decode($requestPayload, true);

//run if session is being checked
if($_GET['query'] == 'check session'){
    if(isset($_SESSION["current_email"])){
        $name = $_SESSION["current_name"];
        $surname = $_SESSION["current_Surname"];
        echo '<li><a href="userProfile.html">'.$name.' '.$surname.'</a></li> <li><a href="index.html" onclick="logOut()">Log Out</a></li>';
    }else{
        echo'<li><a href="signUp.html">Sign Up</a></li> <li><a href="logIn.html">Log In</a></li>';
    }
}

//run if user details are requested
if($_GET['query'] == 'user details'){
    if(isset($_SESSION["current_email"])){
        $name = $_SESSION["current_name"];
        $surname = $_SESSION["current_Surname"];
        $email = $_SESSION["current_email"];
        echo $name.'/'.$surname.'/'.$email;
    }
}

//run if Logging out
if($_GET['query'] == 'log out'){
    session_destroy();
}

//run if SIGN UP data is submited
if($object[request_name] == 'signUp'){
    $stmt = $conn->prepare("INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)");

    //set Parameters
    $name = $object[signup_name];
    $surname = $object[signup_surname];
    $email = $object[signup_email];
    $password = $object[signup_password];

    //bind variables to prepared statement
    $stmt->bind_param("ssss", $name, $surname, $email, $password);

    $result = $stmt->execute();// Storing select query in a variable
    
    echo 'Your Account has been Created!';
    // Check if query was successful (NOT SURE WHY NOT WORKING)
    if($result === TRUE){
        echo 'Your Account has been Created!';
    } else {
        echo "Error selecting table " . $conn->error;
    }
}

//run if LOG IN data is submited
if($object[request_name] == 'logIn'){
    $stmt = $conn->prepare("SELECT name, surname, email, password FROM users WHERE email = (?) AND password = (?)");

    //set Parameters
    $email = $object[login_email];
    $password = $object[login_password];

    //bind variables to prepared statement
    $stmt->bind_param("ss", $email, $password);
    
    $stmt->execute();// Selecting variables
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        while ($row = $result->fetch_assoc()){
            $_SESSION["current_name"] = $row["name"];
            $_SESSION["current_Surname"] = $row["surname"];
            $_SESSION["current_email"] = $row["email"];
        }
        echo 'You have Logged In';
    }else{
        echo 'Failed to Log In';
    }
}
