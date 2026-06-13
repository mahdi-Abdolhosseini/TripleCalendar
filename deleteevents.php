<?php
include('db.php');
include('funcs.php');
$data = json_decode(file_get_contents('php://input'));
$month=$data->month;
$day=convert_num($data->day,'en');
$q="DELETE FROM events WHERE month= ".$month." AND day= ".$day;
$month_row = mysqli_query($conn,$q);
mysqli_close($conn);

?>
