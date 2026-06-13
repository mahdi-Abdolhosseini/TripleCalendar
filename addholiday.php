<?php
include('db.php');
$data = json_decode(file_get_contents('php://input'));
$day = isset($_POST['day']) && !empty($_POST['day']) ? $_POST['day'] : '';
$month = isset($_POST['month']) && !empty($_POST['month']) ? $_POST['month'] : '';
$event = isset($_POST['event']) && !empty($_POST['event']) ? $_POST['event'] : '';
$type = isset($_POST['type']) && !empty($_POST['type']) ? $_POST['type'] : '';
$holiday = isset($_POST['off']) && !empty($_POST['off']) ? 1 : '';

$q_string = "INSERT INTO `$type` ( `holiday`, `month`, `day`, `event`) VALUES ('". mysqli_real_escape_string($conn, $holiday) ."',". (int)$month .",". (int)$day .",'". mysqli_real_escape_string($conn, $event) ."')";
$result = mysqli_query ($conn,$q_string);
if ($result) {
    $id = mysqli_insert_id($conn); //php5.6
    echo json_encode(["stat"=>'ok',"id"=>$id]);
} else {
    // echo "Error: " . mysqli_error($conn);
    http_response_code(500); // Internal Server Error
    echo json_encode(["stat"=>'no']);
}
mysqli_close($conn);

?>

