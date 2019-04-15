<?php
	include'connect.php';
	$id = isset($_GET["id"])? $_GET["id"] : "";
	$num = isset($_GET["num"])? $_GET["num"] : "";
	$user = isset($_GET["user"])? $_GET["user"] : "";
	$imgurl = isset($_GET["imgurl"])? $_GET["imgurl"] : "";
	$pinglun = isset($_GET["pinglun"])? $_GET["pinglun"] : "";
	$price = isset($_GET["price"])? $_GET["price"] : "";
	$type = isset($_GET["type"])? $_GET["type"] : "";
	if ($type=="") {
		$res = $conn->query("select id from cart where id='".$id."' and user='".$user."' ");
		$num1 = $res->num_rows;
		//没有就插入
		if ($num1==0) {
			$res1 = $conn->query("insert into cart(user,id,num,imgurl,pinglun,price) values('".$user."','".$id."','".$num."','".$imgurl."','".$pinglun."','".$price."')");
			if ($res1) {
				echo "插入成功";
			}
		}else{
			//有就更新
			$res2 = $conn->query("UPDATE cart SET num= '".$num."' WHERE user='".$user."' and id='".$id."' ");
			if ($res2) {
				echo "更新成功".$num;
			}
		}
	}else if ($type=="del") {
		$res3=$conn->query("DELETE FROM cart WHERE user='".$user."' and id='".$id."' ");
		if ($res3) {
			echo "删除成功";
		}
	}
	$conn->close();
?>