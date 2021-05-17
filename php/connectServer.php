<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "surf_store";// Database name

// Include new or fourth parameter
$conn = new mysqli($servername, $username, $password, $dbname);

// Only display error message when connection fails
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}