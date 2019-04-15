<?php
	include 'connect.php';
	$tel=isset($_GET["tel"])? $_GET["tel"]:"";
	// $psd=isset($_GET["psd"])? $_GET["psd"]:"";

	
    
        $result = $conn->query("select * from user where tel='".$tel."'"); 
        $res = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo JSON_encode($res);
    
    $conn->close();
	
?>