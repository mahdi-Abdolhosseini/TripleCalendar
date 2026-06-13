<?php 
header("Access-Control-Allow-Origin: http://localhost");// برای سایت http://date.dns110.ir
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$domain = "";// برای مثال https://date.dns110.ir/1/ // برای لوکال خالی باشد

$db = "calendar";
$uname = "root";
$pass = "root";
$server = "localhost";
$port = "80";
$conn = mysqli_connect($server,$uname,$pass,$db);
if( $conn->connect_errno)
    die ("خطای اتصال به پایگاه");


?>