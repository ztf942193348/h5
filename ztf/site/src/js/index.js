jQuery(function($){
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

	//cookie（用户）
	var user = Cookie.getCookie("user");
	//测试cookie
	console.log(Cookie.getCookie("user"));
	console.log(user);
	if (user) {
		$("#header .zhuce li").first().text(user+" 欢迎您！");
		$("#header .zhuce li").first().append('<a href="html/login.html">退出</a>');
	}

	//cookie（商品）
	//加入购物车相关操作
	var geshu=0;
	//cookie操作
	var goodslist = Cookie.getCookie("goodslist") || [];
        console.log(goodslist,goodslist.length);
    if(typeof goodslist == "string"){
        goodslist = JSON.parse(goodslist);
    }
    if(goodslist.length==0) {
    	$.get("../api/getCookie.php",{user:user},function(res){
    		console.log(res);
    	})
    	$(".geshu").text(geshu);
    }else{
    	$(".geshu").text(goodslist[0].qty);
    	console.log(goodslist,goodslist[0],goodslist[0].qty)
    }

	//============================
	//轮播图（用了插件）
    var unslider04 = $('#b04').unslider({
		dots: true
	}),
	data04 = unslider04.data('unslider');
	$('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data04[fn]();
    });
	//头部左侧的hover
	$(".songhuo.fl").on("mouseover",function(){
		$(".songhuo.fl span i").removeClass("icon-jiantouxia").addClass("icon-jiantoushang").closest(".songhuo.fl").find("ul").css("display","block");
	}).on("mouseout",function(){
		$(".songhuo.fl span i").removeClass("icon-jiantoushang").addClass("icon-jiantouxia").closest(".songhuo.fl").find("ul").css("display","none");
	})
	//头部右侧的hover
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
	//下面品牌的tab切换
	$(".lianjie .pinpaiI").on("mouseover",function(){
		$(".lianjie ul li").removeClass("cur").closest(".lianjie").find(".youqing").css("display","none");
		$(this).addClass("cur").closest(".lianjie").find(".pinpai").css("display","block");
	})
	$(".lianjie .youqingI").on("mouseover",function(){
		$(".lianjie ul li").removeClass("cur").closest(".lianjie").find(".pinpai").css("display","none");
		$(this).addClass("cur").closest(".lianjie").find(".youqing").css("display","block");
	})
	//右边固定栏 doctor
	$("#doctor").on("mouseover","li",function(){
		$(this).find(".a").removeClass("icon").find("i").css("display","none").next().addClass("show");
		$(this).find(".a").has(".icon-wechat").next().css("display","block");
	}).on("mouseout","li",function(){
		$(this).find(".a").has(".icon-wechat").next().css("display","none");
		$(this).find(".a").addClass("icon").find("i").css("display","block").next().removeClass("show");
	}).on("click","li.last",function(){
		$("html,body").animate({scrollTop:0},500);
		return false;//为啥加了return false 就能缓慢滚回顶部？
	})
	//左侧固定栏 floorS
	function bianhuan(n){
		$("#floorS li:gt(0)").find(".louceng").removeClass("show").next().removeClass("qiehuan");
		$("#floorS").fadeIn().find("li").eq(n).find("a").eq(0).addClass("show").next().addClass("qiehuan");
	}
	$("#floorS").hide();
	$(window).scroll(function(){
		if ($(this).scrollTop()>700 && $(this).scrollTop()<=1200) {
			bianhuan(1);
		}else if ($(this).scrollTop()>1200 && $(this).scrollTop()<=1700) {
			bianhuan(2);
		}else if ($(this).scrollTop()>1700 && $(this).scrollTop()<=2300) {
			bianhuan(3);
		}else if ($(this).scrollTop()>2300 && $(this).scrollTop()<=2800) {
			bianhuan(4);
		}else if ($(this).scrollTop()>2800 && $(this).scrollTop()<=3300) {
			bianhuan(5);
		}else if ($(this).scrollTop()>3300 && $(this).scrollTop()<=3800) {
			bianhuan(6);
		}else if ($(this).scrollTop()>3800 && $(this).scrollTop()<=4300) {
			bianhuan(7);
		}else if ($(this).scrollTop()>4300 && $(this).scrollTop()<=4800) {
			bianhuan(8);
		}else if ($(this).scrollTop()>4800 && $(this).scrollTop()<=5300) {
			bianhuan(9);
		}else{
			$("#floorS").fadeOut();
		}
	})
	$("#floorS li:gt(0)").on("mouseover",function(){
		$("#floorS li:gt(0)").each(function(){
			$(this).find(".louceng").removeClass("hover").next().removeClass("qiehuan1");
		})
		$(this).find(".louceng").addClass("hover").next().addClass("qiehuan1");
	}).on("mouseout",function(){
		$("#floorS li:gt(0)").each(function(){
			$(this).find(".louceng").removeClass("hover").next().removeClass("qiehuan1");
		})
	}).on("click",function(){
		if ($(this).hasClass("f1")) {
			$("html,body").animate({scrollTop:701},500);
			return false;
		}else if ($(this).hasClass("f2")) {
			$("html,body").animate({scrollTop:1201},500);
			return false;
		}else if ($(this).hasClass("f3")) {
			$("html,body").animate({scrollTop:1701},500);
			return false;
		}else if ($(this).hasClass("f4")) {
			$("html,body").animate({scrollTop:2301},500);
			return false;
		}else if ($(this).hasClass("f5")) {
			$("html,body").animate({scrollTop:2801},500);
			return false;
		}else if ($(this).hasClass("f6")) {
			$("html,body").animate({scrollTop:3301},500);
			return false;
		}else if ($(this).hasClass("f7")) {
			$("html,body").animate({scrollTop:3801},500);
			return false;
		}else if ($(this).hasClass("f8")) {
			$("html,body").animate({scrollTop:4301},500);
			return false;
		}else if ($(this).hasClass("f9")) {
			$("html,body").animate({scrollTop:4801},500);
			return false;
		}
	})
	// ajax渲染数据
	// $.get("../api/index.php",{fenlei:"jiating"},function(res){
	// 	console.log(res);
	// 	if (typeof res=="string") {
	// 		res=JSON.parse(res);
	// 	}
	// 	console.log(res);
	// 	$(".floor.f1 .xia")[0].innerHTML=res.map(function(item){
	// 		var	{id,name,price,imgUrl}=item;
	// 		return `<li data-id=${id}>
	// 					<a href="">
	// 						<img src="${imgUrl}" alt="" />
	// 					</a>
	// 					<a href="">${name}</a>
	// 					<p>￥ ${price}</p>
	// 				</li>`
	// 	}).join("");
	// })

	//为啥这样写的插件在这里用不了？
	// (function($){
	// 	$.fn.tfAjax=function(leiming){
	// 		var ha=this[0];
	// 		console.log(this);
	// 		$.get("../api/index.php",{fenlei:leiming},function(res){
	// 			console.log(res);
	// 			if (typeof res=="string") {
	// 				res=JSON.parse(res);
	// 			}
	// 			console.log(ha);
	// 			ha.innerHTML=res.map(function(item){
	// 				var	{id,name,price,imgUrl}=item;
	// 				return `<li data-id=${id}>
	// 							<a href="">
	// 								<img src="${imgUrl}" alt="" />
	// 							</a>
	// 							<a href="">${name}</a>
	// 							<p>￥ ${price}</p>
	// 						</li>`
	// 			}).join("");
	// 		})
	// 		return this;
	// 	}
	// })(jQuery);

	$.fn.tfAjax=function(leiming){
		//注意这里的this是$()类型的要记得拿DOM节点
			//ha 是调用这个方法的dom节点
			var ha=this[0];
			// console.log(this);
			$.get("../api/index1.php",{fenlei:leiming},function(res){
				// console.log(res);
				if (typeof res=="string") {
					res=JSON.parse(res);
				}
				// console.log(ha);
				ha.innerHTML=res.map(function(item){
					var	{id,name,price,imgUrl}=item;
					return `<li data-id=${id}>
								<a href="">
									<img src="${imgUrl}" alt="" />
								</a>
								<a href="" title="${name}">${name}</a>
								<p>￥ ${price}</p>
							</li>`
				}).join("");
			})
			return this;
	}
	$(".floor.f1 .xia").tfAjax("jiating");
	$(".floor.f2 .xia").tfAjax("zhuanke");
	$(".floor.f3 .xia").tfAjax("zibu");
	$(".floor.f4 .xia").tfAjax("weisheng");
	$(".floor.f5 .xia").tfAjax("jiating");
	$(".floor.f6 .xia").tfAjax("zhuanke");
	$(".floor.f7 .xia").tfAjax("zibu");
	$(".floor.f8 .xia").tfAjax("weisheng");
	$(".floor.f9 .xia").tfAjax("jiating");

	
})
