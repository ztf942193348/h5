<?php
$conn=new mysqli("localhost","root","","yiyaowang");
    if($conn->connect_error){
        die("连接失败".$conn->connect_error);
    }
    $conn->set_charset('utf8');
?>