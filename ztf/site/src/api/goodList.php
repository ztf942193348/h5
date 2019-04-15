<?php
	include 'connect.php';

	$qty=isset($_GET["qty"])? $_GET["qty"] : "";
	$curPage=isset($_GET["curPage"])? $_GET["curPage"] : "";
    //排序
    $sort=isset($_GET["sort"])? $_GET["sort"] : "";
    if ($sort=="") {
       $res = $conn->query("select id,name,price,imgUrl1 from goodList");
        // 此时$data查询结果集是数组,想返回前端记得加json_encode转成json字符串
        $content = $res->fetch_all(MYSQLI_ASSOC);
        $len=ceil(count($content)/$qty);
        $resArr=array_slice($content,($curPage-1)*$qty,$qty);
        //注意命名不要和上面重名了，否则返回的数据后面会跟一堆奇怪的东西。
        $data = array(
            "data"=>$resArr,
            "len"=>$len,
            "curPage"=>$curPage
            );
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
        // 关闭查询结果集
        $res->close(); 
    }else if ($sort=="list_sale_sort") {
        //销量排序
        $res1 = $conn -> query("select id,name,price,imgUrl1 from goodList order by xiaoliang desc");
        // 此时$data查询结果集是数组,想返回前端记得加json_encode转成json字符串
        $content1 = $res1->fetch_all(MYSQLI_ASSOC);
        $len1=ceil(count($content1)/$qty);
        $resArr1=array_slice($content1,($curPage-1)*$qty,$qty);
        //注意命名不要和上面重名了，否则返回的数据后面会跟一堆奇怪的东西。
        $data1 = array(
            "data"=>$resArr1,
            "len"=>$len1,
            "curPage"=>$curPage
            );
        echo json_encode($data1,JSON_UNESCAPED_UNICODE);
        // 关闭查询结果集
        $res1->close(); 
    }else if ($sort=="list_answer_sort") {
        //评论排序
        $res2 = $conn -> query("select id,name,price,imgUrl1 from goodList order by pinglun desc");
        // 此时$data查询结果集是数组,想返回前端记得加json_encode转成json字符串
        $content2 = $res2->fetch_all(MYSQLI_ASSOC);
        $len2=ceil(count($content2)/$qty);
        $resArr2=array_slice($content2,($curPage-1)*$qty,$qty);
        //注意命名不要和上面重名了，否则返回的数据后面会跟一堆奇怪的东西。
        $data2 = array(
            "data"=>$resArr2,
            "len"=>$len2,
            "curPage"=>$curPage
            );
        echo json_encode($data2,JSON_UNESCAPED_UNICODE);
        // 关闭查询结果集
        $res2->close(); 
    }else if ($sort=="list_hot_sort") {
        //人气排序
        $res3 = $conn -> query("select id,name,price,imgUrl1 from goodList order by renqi desc");
        // 此时$data查询结果集是数组,想返回前端记得加json_encode转成json字符串
        $content3 = $res3->fetch_all(MYSQLI_ASSOC);
        $len3=ceil(count($content3)/$qty);
        $resArr3=array_slice($content3,($curPage-1)*$qty,$qty);
        //注意命名不要和上面重名了，否则返回的数据后面会跟一堆奇怪的东西。
        $data3 = array(
            "data"=>$resArr3,
            "len"=>$len3,
            "curPage"=>$curPage
            );
        echo json_encode($data3,JSON_UNESCAPED_UNICODE);
        // 关闭查询结果集
        $res3->close(); 
    }else if ($sort=="list_newest_sort") {
        //时间排序
        $res4 = $conn -> query("select id,name,price,imgUrl1 from goodList order by datetime desc");
        // 此时$data查询结果集是数组,想返回前端记得加json_encode转成json字符串
        $content4 = $res4->fetch_all(MYSQLI_ASSOC);
        $len4=ceil(count($content4)/$qty);
        $resArr4=array_slice($content4,($curPage-1)*$qty,$qty);
        //注意命名不要和上面重名了，否则返回的数据后面会跟一堆奇怪的东西。
        $data4 = array(
            "data"=>$resArr4,
            "len"=>$len4,
            "curPage"=>$curPage
            );
        echo json_encode($data4,JSON_UNESCAPED_UNICODE);
        // 关闭查询结果集
        $res4->close(); 
    }else if ($sort=="list_priceDown_sort") {
        //价格排序
        $res5 = $conn -> query("select id,name,price,imgUrl1 from goodList order by price desc");
        // 此时$data查询结果集是数组,想返回前端记得加json_encode转成json字符串
        $content5 = $res5->fetch_all(MYSQLI_ASSOC);
        $len5=ceil(count($content5)/$qty);
        $resArr5=array_slice($content5,($curPage-1)*$qty,$qty);
        //注意命名不要和上面重名了，否则返回的数据后面会跟一堆奇怪的东西。
        $data5 = array(
            "data"=>$resArr5,
            "len"=>$len5,
            "curPage"=>$curPage
            );
        echo json_encode($data5,JSON_UNESCAPED_UNICODE);
        // 关闭查询结果集
        $res5->close(); 
    }
    
    // 关闭数据库
    $conn->close();
?>