<?php 
header("Access-Control-Allow-Origin: http://localhost");// برای سایت http://calendar.ir
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$domain = "";// برای مثال https://date.dns110.ir/1/ // برای لوکال خالی باشد

$db = "calendar";
$uname = "username";
$pass = "pass";
$server = "localhost";
$port = "80";
$conn = mysqli_connect($server,$uname,$pass,$db);
if( $conn->connect_errno)
    die ("خطای اتصال به پایگاه");


?>
