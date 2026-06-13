<?php
include('db.php');
include('funcs.php');

$data = json_decode(file_get_contents('php://input'));
$month=$data->month;
$day = convert_num($data->day,'en');
$title = $data->title;
$text = $data->text;
$fix = intval($data->fixed);
$rep = intval($data->repeat);
$eDate=jalali_to_gregorian_lite($data->year,$month,$day,'/');
$now = date('D-M-Y'); // or your date as well
$your_date = strtotime(strval($eDate));
$datediff =$your_date  - strtotime(strval($now));

$q_string="INSERT INTO events ( title, calendar_type, month, day, text , is_fixed, is_global, rep) VALUES ('". $title ."','jalali',".$month.",'".$day."','".$text."',".$fix.",'".$eDate."','".$rep."')";
$result = mysqli_query ($conn,$q_string);
$id= $conn->insert_id;

echo  json_encode(['id'=>$id*2],JSON_UNESCAPED_UNICODE);
mysqli_close($conn);

?>


