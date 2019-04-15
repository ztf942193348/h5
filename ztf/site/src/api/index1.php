<?php
    include 'connect.php';

    $fenlei=isset($_GET["fenlei"])? $_GET["fenlei"] : "";
    $res = $conn->query("select id,name,price,imgUrl from goodList where fenlei='".$fenlei."'");
    $data = $res->fetch_all(MYSQLI_ASSOC);
    // 此时$data查询结果集是数组,想返回前端记得加json_encode转成json字符串
    echo json_encode($data);
    // 关闭查询结果集
    $res->close();
    // 关闭数据库
    $conn->close();
?>