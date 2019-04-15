$(function(){
	//封装设置、获取、移除cookie
var Cookie = {
	setCookie : function(name,value,data,path){
		var str = `${name}=${value}`;
		if(data){
			str += `; expires=${data.toUTCString()}`;
		}
		if(path){
			str += `; path=${path}`;
		}

		document.cookie = str;
	},
	getCookie : function(name){
		var cookieArr = document.cookie.split("; ");
		var res = "";
		cookieArr.forEach(function(item){
			var arr = item.split("=");
			if(arr[0] == name){
				res = arr[1];
			}
		})
		return res;
	},
	removeCookie : function(name,path){
		var d = new Date();
		d.setDate(d.getDate()-1);
		this.setCookie(name,"",d,path)
	}
}


	//更多合作网站
	$(".moreweb").mouseover(function(){
		$(".moreicon").show();
		$(".main_r").css("height",500);
		$(".moreweb i").prop("class","icon icon-jiantoushang");
	}).mouseout(function(){
		$(".moreicon").hide();
		$(".main_r").css("height",450);
		$(".moreweb i").prop("class","icon icon-jiantouxia");
	})
	//登录方式切换
	$(".putong").click(function(){
		$(".shouji a").prop("class","");
		$(".putong a").addClass("focus");
		$(".login_1").show();
		$(".login_2").hide();
	})
	$(".shouji").click(function(){
		$(".putong a").prop("class","");
		$(".shouji a").addClass("focus");
		$(".login_2").show();
		$(".login_1").hide();
	})

	//验证码获取以及验证
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
			console.log(_yzm,num);
                $(".output").text("请输入正确的验证码").css("color","red"); 
                $("#vcd_tatus").css("display","none");
            }else if(_yzm == num){
                $(".output").css("color","#fff");
                $("#vcd_tatus").css("display","inline-block");
            }
	}).focus(function(){
		$("#vcd_tatus").hide();
		$(".output").css("color","#fff");
	})
	creatyzm();
	//点击图片切换验证码
	$(".yzmimg").click(function(){creatyzm();})
	//点击按钮切换验证码
	$(".changeyzm").click(function(){creatyzm();})

	//cookie测试
	console.log(Cookie.getCookie("user"));
	//登录验证
	$(".denglu1").click(function(){
		var tel = $(".user").val();
		var psd = $(".pass").val();
		if($("#vcd_tatus")[0].style.display=="inline-block"){
			if (tel.trim()!=""&&psd.trim()!="") {
				$.get("../api/login.php",{tel:tel,psd:psd},function(res){
					console.log(res,typeof res);
					//下面加if会跑到console.log(333)的if
					//有时候连点击都点不了
					if (typeof res=="string") {
						res=JSON.parse(res);
						console.log(res,typeof res)
					}
					// if (res) {console.log(333)}
					if (res=="") {
						alert("该用户不存在，请先注册再登录");
						location.href="../html/register.html";
					}else if (psd!=res[0].psd) {
						$(".tixing").text("密码输入有误");
						$(".pass").css("border","1px solid red");
						$(".pass").focus=function(){
							$(".pass").css("border","1px solid #e6e6e6");
							$(".tixing").text("");
						}
					}else if (psd==res[0].psd) {
						//创建cookie
						document.cookie="user="+tel+"; path=/";
						console.log(Cookie.getCookie("user"));
						location.href="../index.html";
					}
				})
			}
		}else if($(".user").val().trim()==""){
			$(".useryz").show();
			$(".user").css("border","1px solid #ffaa00").focus(function(){
				$(".user").css("border","1px solid #e6e6e6");
				$(".useryz").hide();
			})
		}else if($(".pass").val().trim()==""){
			$(".tixing").text("密码不能为空");
			$(".pass").css("border","1px solid red").focus(function(){
				$(".pass").css("border","1px solid #e6e6e6");
				$(".tixing").text("");
			})
		}
	})
	
})