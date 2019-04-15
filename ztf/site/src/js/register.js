$(function(){
	$(".phone")[0].focus();
	//帐号获取焦点
	$(".phone").focus(function(){
		$(".useryz").css("display","none");
		$(".phonenumber").css("color","#fff");
	})
	//帐号验证
	//帐号失去焦点
	$(".phone").blur(function(){
		var str=$(this).val();
		var reg=/^1\d{10}$/;
		//帐号为空时
		if(str.trim()==""){
			$(".useryz").css("display","inline");
			$("#email_true").css("display","none");
		//帐号格式不正确时
		}else if (reg.test(str)==false) {
			$(".phonenumber").css("color","red");
			$("#email_true").css("display","none");			
		}else if(reg.test(str)==true){
			//格式正确时，开启ajax请求验证数据库是否已有该帐号
			$.get("../api/register.php",{tel:str},function(res){
				if (res=="0") {
					$("#email_true").css("display","inline-block");
				}else if (res=="1") {
					$(".phonenumber").text("该用户已存在").css("color","red");
					$("#email_true").css("display","none");	
				}
			})
		}
		
	})
	//密码获取焦点时
	$(".mima").focus(function(){
		$(".information").css("color","#a5a5a5");
	})
	//输入密码时进行密码强度验证
	$(".mima").on("input propertychange",function(){
		var str=$(this).val();
		$(".information").css("color","#fff").text("");
		//限制字符串长度为20
		if (str.length>=20) {
			$(this).val(str.substr(0,20));
		}
		//开启密码强度显示
		$(".box_safety").css("display","inline-block");
		if (/^[a-z0-9]{6,8}$/i.test(str)) {
			//弱密码
			$(".box_safety").attr("class","box_safety pas_ruo");
			//开启确认密码框
			$(".surepass").attr("disabled",false).css("background-color","#fff");
			//密码格式验证正确
			$("#password_true").css("display","inline-block");
			//开启验证码框
			$(".yanzheng").css("display","block");
		}else if(/^[a-z0-9]{8,20}$/i.test(str)){
			//中密码
			$(".box_safety").attr("class","box_safety pas_middle");
			//开启确认密码框
			$(".surepass").attr("disabled",false).css("background-color","#fff");
			//密码格式验证正确
			$("#password_true").css("display","inline-block");
			//开启验证码框
			$(".yanzheng").css("display","block");
		}else if(/^[a-z0-9_\-+*\/]{8,20}$/i.test(str)){
			//强密码
			$(".box_safety").attr("class","box_safety pas_qiang");
			//开启确认密码框
			$(".surepass").attr("disabled",false).css("background-color","#fff");
			//密码格式验证正确
			$("#password_true").css("display","inline-block");
			//开启验证码框
			$(".yanzheng").css("display","block");
		}else if (/^\w{0,5}$/i.test(str)) {
			//目前未符合密码要求
			$(".box_safety").attr("class","box_safety pas_ruo");
			$(".surepass").attr("disabled",true).css("background-color","#f3f3f3");
			$("#password_true").css("display","none");
		}
	})
	//密码失去焦点时
	$(".mima").blur(function(){
		var str=$(this).val();
		$(".box_safety").css("display","none");
		if (str.trim()=="") {
			$(".information").text("密码不能为空").css("color","red");
			$("#password_true").css("display","none");
		}else if (/^[0-9]+$/gi.test(str)) {
			$(".information").text("密码不能全为数字").css("color","red");
			$("#password_true").css("display","none");
		}else if (/^[a-z]+$/gi.test(str)) {
			$(".information").text("密码不能全为字母").css("color","red");
			$("#password_true").css("display","none");
		}else if (!/^[a-z0-9_-]{6,20}$/gi.test(str)){
			$(".information").text("6-20位字符，建议由字母，数字和符号两种以上组合!").css("color","red");
			$("#password_true").css("display","none");
		}
		//确认密码
		var _surepass=$(".surepass").val();
		var _mima=$(".mima").val();
		if (_surepass == _mima&&_surepass.trim()!="") {
			$(".mimayanzheng").css("color","#fff");
			$("#password2_true").css("display","inline-block");
		}else{
			$(".mimayanzheng").css("color","red");
			$("#password2_true").css("display","none");
		}
	})
	//判断两次密码是否一致
	//确认密码框获取焦点时
	$(".surepass").focus(function(){
		$(".mimayanzheng").css("color","#fff");
	})
	//确认密码框失去焦点时
	$(".surepass").blur(function(){
		var _surepass=$(".surepass").val();
		var _mima=$(".mima").val();
		if (_surepass == _mima) {
			$(".mimayanzheng").css("color","#fff");
			$("#password2_true").css("display","inline-block");
		}else{
			$(".mimayanzheng").css("color","red")
		}
	})

	//验证码生成以及验证
	//1.封装a-b的随机整数
	//10-100=>parseInt(Math.random()*(100-10+1))+10; 
	// a-b  parseInt(Math.random()*(b-a+1))+a
	function getRandomNum(min,max){
	    var randomNum = parseInt(Math.random()*(max-min+1))+min;
	    return randomNum;
	}

	// 2.封装一个随机色 'rgb('+red+','+green+','+blue+')'
	function getColor(){
	    var red = getRandomNum(0,255);
	    var green = getRandomNum(0,255);
	    var blue = getRandomNum(0,255);
	    return 'rgb('+red+','+green+','+blue+')';
	}
	//验证码生成
	function creatyzm(){
		var arr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
		var c="";
		for (var i = 0; i < 4; i++) {
			//随机生成索引
			var r = getRandomNum(0,35);
			//根据随机生成的索引去arr拿相应的值
			c+=arr[r];
		}
		$(".yzmimg").text(c).css({"font-size":getRandomNum(12,26),"color":getColor()});
	}
	//验证码验证
	$(".yzm").blur(function(){
		var _yzm=$(".yzm").val();
		var num=$(".yzmimg").text();
		if(_yzm != num ){
			console.log(_yzm,num)
                $(".yanzhengma .output").text("请输入正确的验证码").css("color","red"); 
            }else if(_yzm == num){
                $(".yanzhengma .output").text("√").css({"font-size":12,"color":"green"})
            }
	})
	creatyzm();
	//点击图片切换验证码
	$(".yzmimg").click(function(){creatyzm();})
	//点击按钮切换验证码
	$(".changeyzm").click(function(){creatyzm();})

	//点击注册
	$(".zhuce").click(function(){
		console.log(typeof $(".agree").prop("checked"),$(".agree").prop("checked"))
		var zt1 = $("#email_true")[0].style.display=="inline-block"?true:false;
		var zt2 = $("#password_true")[0].style.display=="inline-block"?true:false;
        var zt3 = $("#password2_true")[0].style.display=="inline-block"?true:false;
        var zt4 = $(".yanzhengma .output")[0].style.color=="green"?true:false;
        var zt5 = $(".agree").prop("checked")==true? true:false;
        if (zt1 && zt2 && zt3 && zt4 &&zt5) {
        	$.get("../api/register.php",{tel:$(".phone").val(),psd:$(".mima").val()},function(res){
        		alert("您已注册成功");
        		location.href="../html/login.html";
        	})
        }else{
        	//这里可以具体到五个状态分别写alert错误内容，但是时间有限，先留着这个坑
        	console.log(zt1,zt2,zt3,zt4,zt5);
        }
	})
})