<?php
    include('db.php');
    include('funcs.php');
    $data = json_decode(file_get_contents('php://input'));
    $id = $data->id;
    $a = intval($id)/2;
    // $query="UPDATE events SET is_fixed = 0 WHERE id= ".$a." AND user_id= 1";
    $query="UPDATE events SET is_fixed = 0 WHERE id= ".$a;
    $result = mysqli_query ($conn,$query);
    if (mysqli_affected_rows($conn)) echo "ok";
    else echo "No";

?>
