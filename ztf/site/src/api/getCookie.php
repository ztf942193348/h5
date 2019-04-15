<?php
	include 'connect.php';

	$user=isset($_GET["user"])? $_GET["user"] : "";
	$res=$conn->query("select * from cart where user='".$user."'");
	$data = $res->fetch_all(MYSQLI_ASSOC);
	echo json_encode($data,JSON_UNESCAPED_UNICODE);

	$res->close();
	$conn->close();
?>