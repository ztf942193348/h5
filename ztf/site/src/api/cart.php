<?php
	include 'connect.php';
	$user=isset($_GET["user"])? $_GET["user"] : "";
	//设置了不是null的，如果还空着就不能把那个字段写在查询语句里面，否则会！@#@￥。
	$res=$conn->query("select * from cart where user='".$user."'");
	$data=$res->fetch_all(MYSQLI_ASSOC);
	//每个语句后面一定要记得加分号
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
	//关闭查询结果
	$res->close();
	//关闭数据库
	$conn->close();
?>