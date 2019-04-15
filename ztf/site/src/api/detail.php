<?php
	include 'connect.php';
	$dataId=isset($_GET["dataId"])? $_GET["dataId"] : "";
	//设置了不是null的，如果还空着就不能把那个字段写在查询语句里面，否则会！@#@￥。
	$res=$conn->query("select id,name,price,pinglun,imgd1,imgd2,imgd3,imgd4,imgd5 from goodList where id='".$dataId."'");
	$data=$res->fetch_all(MYSQLI_ASSOC);
	//每个语句后面一定要记得加分号
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
	//关闭查询结果
	$res->close();
	//关闭数据库
	$conn->close();
?>