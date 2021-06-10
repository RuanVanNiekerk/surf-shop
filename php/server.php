<?php
session_start();
require ('connectServer.php');

$requestPayload = file_get_contents('php://input');
$object = json_decode($requestPayload, true);

//run if session is being checked
if($_GET['query'] == 'check session'){
    if(isset($_SESSION["current_user"]["email"])&&$_SESSION["current_user"]["email"]!==null){
        $name = $_SESSION["current_user"]["name"];
        $surname = $_SESSION["current_user"]["surname"];
        $return[0] = $name;
        $return[1] = $surname;
        echo json_encode($return);
    }
}

//run if Logging out
if($_GET['query'] == 'logOut'){
    session_destroy();
}

//run to find search options
if($object[request_name] == 'searchData'){
    $_SESSION["searchOptions"] = array(
        "name" => "NO"
    );
    
    $stmt = $conn->prepare("SELECT name, type, product_id FROM products WHERE name LIKE (?) OR type LIKE (?) LIMIT 5");

    //set Parameters
    $search = '%'.$object[search_input].'%';

    //bind variables to prepared statement
    $stmt->bind_param("ss", $search, $search);
    
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Check if query was successful
    if($result->num_rows > 0){
        $data = [];
        $i = 0;
        while ($row = $result->fetch_assoc()){
            $data[] = $row;
            $i++;
        }
        $_SESSION["searchOptions"] = $data;
        echo 'Success';
    }else{
        echo 'Could not find a match';
    }
}

//saves search item based on search type
if($object[request_name] == 'searchitem'){
    $searchType = $object[search_type];
    
    if($searchType == "submit"){
        $stmt = $conn->prepare("SELECT * FROM products WHERE name LIKE (?) OR type LIKE (?)");

        //set Parameters
        $search = '%'.$object[search_val].'%';

        //bind variables to prepared statement
        $stmt->bind_param("ss", $search, $search);

        $stmt->execute();
        $result = $stmt->get_result();

        // Check if query was successful
        if($result->num_rows > 0 && $object[search_val] !== null){
            $data = [];
            $i = 0;
            while ($row = $result->fetch_assoc()){
                $data[] = $row;
                $i++;
            }
            $_SESSION["searchedItem"] = $data;
            echo 'Success';
        }else{
            $_SESSION["searchedItem"] = null;
            echo 'Could not find a match';
        }
    }else{
        $stmt = $conn->prepare("SELECT * FROM products WHERE product_id = (?)");

        //set Parameters
        $search = $object[search_val];

        //bind variables to prepared statement
        $stmt->bind_param("s", $search);

        $stmt->execute();
        $result = $stmt->get_result();

        // Check if query was successful
        if($result->num_rows > 0 && $object[search_val] !== null){
            $data = [];
            $i = 0;
            while ($row = $result->fetch_assoc()){
                $data[] = $row;
                $i++;
            }
            $_SESSION["searchedItem"] = $data;
            echo 'Success';
        }else{
            $_SESSION["searchedItem"] = null;
            echo 'Could not find a match';
        }
    }
    
    
}

//empties search item on product page link click
if($object[request_name] == 'resetSearch'){
    $_SESSION["searchedItem"] = null;
}

//run if UPDATED USER data is submitted
if($object[request_name] == 'userUpdate'){
    $stmt = $conn->prepare("UPDATE users, address SET users.name = (?), users.surname = (?), users.email = (?), address.address = (?),"
            . " address.country = (?), address.state = (?), address.zip = (?) WHERE users.user_id = address.user_id AND users.email = (?)");

    //set Parameters
    $new_name = $object[new_name];
    $new_surname = $object[new_surname];
    $new_email = $object[new_email];
    $new_address = $object[new_address];
    $new_country = $object[new_country];
    $new_state = $object[new_state];
    $new_zip = $object[new_zip];
    $current_email = $_SESSION["current_user"]["email"];

    //bind variables to prepared statement
    $stmt->bind_param("ssssssss", $new_name, $new_surname, $new_email, $new_address, $new_country, $new_state, $new_zip, $current_email);

    $result = $stmt->execute();// Storing select query in a variable
    
    $_SESSION["current_user"]["name"] = $new_name;
    $_SESSION["current_user"]["surname"] = $new_surname;
    $_SESSION["current_user"]["email"] = $new_email;
    $_SESSION["current_user"]["address"] = $new_address;
    $_SESSION["current_user"]["country"] = $new_country;
    $_SESSION["current_user"]["state"] = $new_state;
    $_SESSION["current_user"]["zip"] = $new_zip;
    
    // Check if query was successful(not sure why not working)
    if($result === TRUE){
        echo 'Your Account has been Updated!';
    } else {
        echo "Error selecting table " . $conn->error;
    }
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
    
    // Check if query was successful
    if($result === TRUE){
        echo 'Your Account has been Created!';
    } else {
        echo "Error selecting table " . $conn->error;
    }
}

//run if LOG IN data is submited
if($object[request_name] == 'logIn'){
    $stmt = $conn->prepare("SELECT users.user_id, name, surname, email, password, address, country, state, zip FROM users INNER JOIN address ON users.user_id = address.user_id WHERE email = (?) AND password = (?)");

    //set Parameters
    $email = $object[login_email];
    $password = $object[login_password];

    //bind variables to prepared statement
    $stmt->bind_param("ss", $email, $password);
    
    $stmt->execute();// Selecting variables
    $result = $stmt->get_result();
    if($result->num_rows > 0){
        while ($row = $result->fetch_assoc()){
            $_SESSION["current_user"]["user_id"] = $row["user_id"];
            $_SESSION["current_user"]["name"] = $row["name"];
            $_SESSION["current_user"]["surname"] = $row["surname"];
            $_SESSION["current_user"]["email"] = $row["email"];
            $_SESSION["current_user"]["address"] = $row["address"];
            $_SESSION["current_user"]["country"] = $row["country"];
            $_SESSION["current_user"]["state"] = $row["state"];
            $_SESSION["current_user"]["zip"] = $row["zip"];
        }
        echo 'You have Logged In';
    }else{
        echo 'Failed to Log In';
    }
}

//run to insert query
if($object[request_name] == 'query'){
    $stmt = $conn->prepare("INSERT INTO queries (name, email, subject, message, user_id) VALUES (?, ?, ?, ?, ?)");

    //set Parameters
    $name = $object[name];
    $email = $object[email];
    $subject = $object[subject];
    $message = $object[message];
    $user_id = $_SESSION["current_user"]["user_id"];

    //bind variables to prepared statement
    $stmt->bind_param("sssss", $name, $email, $subject, $message, $user_id);
    
    $result = $stmt->execute();// Storing select query in a variable
    
    // Check if query was successful(not sure why not working)
    if($result === true){
        echo 'submitted';
    }else{
        echo 'Could not create query!';
    }
}
