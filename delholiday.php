<?php
include('db.php');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$id=$data['id'];
$type=$data['type'];
$query = mysqli_query($conn,"DELETE FROM $type WHERE id=$id");
if (mysqli_affected_rows($conn)) {
    http_response_code(200); // موفق
    echo json_encode(["stat" => "ok"]);
} else {
    http_response_code(404); // عملیات انجام نشد
    echo json_encode(["stat" => "no"]);
}
mysqli_close($conn);

?>