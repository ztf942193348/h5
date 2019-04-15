<?php
	include 'connect.php';
	$tel=isset($_GET["tel"])? $_GET["tel"] : "";
	$psd=isset($_GET["psd"])? $_GET["psd"] : "";
	//$psd为空时，代表是否能注册
	if ($psd=="") {
		//(1)执行sql语句(查询=>查询结果集)
		$res = $conn->query("select * from user where tel='".$tel."'");
		//(2)判断查询结果集是否有值
		//	* num_rows ：结果集中的数量，用于判断是否查询到结果
		$num = $res->num_rows;
		//找不到一样的值，返回0，代表可以注册

		if($num == 0){
			echo 0;
		//数据库已有该值，返回1，代表不可注册
		}else{
			echo 1;
		}
		// 关闭查询结果集
		$res->close();
		// 关闭数据库
		$conn->close();
	}
	//$psd不为空，代表新注册一个帐号
	if($psd!="" && $tel!=""){
		//插入新数据，$res2的值为布尔值
		$res2 = $conn->query("insert into user(tel,psd) values('".$tel."','".$psd."')");
		if ($res2) {
			echo "ok";
		}else{
			echo "false";
		}
		// // 关闭查询结果集?  插入新数据哪来的查询结果集？？ 傻屌
		// $res2->close();
		// 关闭数据库
		$conn->close();
	}
	
?>