$(function(){
	//头部左侧的hover(送货)
	$(".songhuo.fl").on("mouseover",function(){
		$(".songhuo.fl span i").removeClass("icon-jiantouxia").addClass("icon-jiantoushang").closest(".songhuo.fl").find("ul").css("display","block");
	}).on("mouseout",function(){
		$(".songhuo.fl span i").removeClass("icon-jiantoushang").addClass("icon-jiantouxia").closest(".songhuo.fl").find("ul").css("display","none");
	})
	//头部右侧的hover(注册)
	$(".zhuce.fr .menu").on("mouseover",function(){
		$(this).css("background","white")
		.find("span.icon").removeClass("icon-jiantouxia").addClass("icon-jiantoushang")
		.closest(".zhuce.fr .menu").find("ul").css("display","block")
		.find("li").on("mouseover",function(){
			$(this).css("background","#666");
		})
	}).on("mouseout",function(){
		$(this).css("background","#f1f1f1")
		.find("span.icon").removeClass("icon-jiantoushang").addClass("icon-jiantouxia")
		.closest(".zhuce.fr .menu").find("ul").css("display","none")
		.find("li").on("mouseout",function(){
			$(this).css("background","white");
		})
	})
	//购物车
	$("#header .cart").on("mouseover",function(){
		$(".mini_cart").css("display","block");
	}).on("mouseout",function(){
		$(".mini_cart").css("display","none");
	})
	//所有商品分类hover的js
	$("#header .fenlei .daohang ul").on("mouseover","li",function(){
		$(this).addClass("hover").stop().animate({marginLeft:5},100)
		.find(".xiangqing").css("display","block");
	}).on("mouseout","li",function(){
		$(this).removeClass("hover").stop().animate({marginLeft:0},100)
		.find(".xiangqing").css("display","none");
	})

	//封装cookie
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
	var user = Cookie.getCookie("tel");
	console.log(user);
	if (user) {
		$("#header .zhuce li").first().text(user);
	}
})