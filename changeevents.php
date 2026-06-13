<?php
include('db.php');

$data = json_decode(file_get_contents('php://input'));
$title = $data->title;
$text = $data->text;
$id = $data->id;
$a = intval($id)/2;
$fix = intval($data->fixed);
$rep = intval($data->repeat);

$query="UPDATE events SET title='".$title."', text='".$text."',is_fixed=".$fix.", rep='".$rep."' WHERE id= ".$a;
$result = mysqli_query ($conn,$query);
if (mysqli_affected_rows($conn))
	echo "ok";
else 
	echo "No";
?>
