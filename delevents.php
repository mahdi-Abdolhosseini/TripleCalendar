<?php
include('db.php');

$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$q="DELETE FROM events WHERE id= ".$id/2;
$month_row = mysqli_query($conn,$q);

if (mysqli_affected_rows($conn)) {
    http_response_code(200); // موفق
    echo json_encode(["stat" => "ok"]);
} else {
    http_response_code(404); // عملیات انجام نشد
    echo json_encode(["stat" => "no"]);
}
mysqli_close($conn);


?>



