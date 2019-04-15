$(function(){

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

	//cookie(用户)
	var user = Cookie.getCookie("user");
	//测试cookie
	console.log(Cookie.getCookie("user"));
	console.log(user);
	if (user) {
		$("#header .zhuce li").first().text(user+" 欢迎您！");
		$("#header .zhuce li").first().append('<a href="../html/login.html">退出</a>');
	}

	//cookie商品
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
	
	//==========================
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
	//goodList
	//点击左侧btn(有点小瑕疵 再次点击同一个无法复原)
	$(".itemChooseBox h3").on("click",".icon_btn",function(){
		$(".itemChooseBox ul").slideUp();
		$(".itemChooseBox h3").each(function(){
			$(this).find(".icon_btn").removeClass("open");
		})
		$(this).toggleClass("open").closest("h3").next().slideDown();
	})

	//列表页动态加载 ajax
	$.get("../api/goodList.php",{qty:6,curPage:1},function(res){
		// console.log(res)
		if (typeof res=="string") {
			// console.log(res)
			res=JSON.parse(res);
			// console.log(res)
		}
		//渲染
		$(".sy_maingoods")[0].innerHTML=res.data.map(function(item){
			var {id,imgUrl1,price,name}=item;
			return `<li data-id=${id}>
	                    <a><img src="${imgUrl1}"></a><br>
	                    <span class="price">￥${price}</span><br>
	                    <a><span class="list_lable_self"></span>${name}</a>
	                    <span class="goldseller_name self_name">1药网自营</span><br>
	                    <a class="view"> 查看详情</a><a class="consultation">咨询医生</a>         
	                </li>`
		}).join("");
		//根据len生成span标签
		for (var i = 1; i <= res.len; i++) {
			$("<span>").text(i).appendTo($(".page"));
		}
		$(".page span")[0].classList.add("active");

		

		//点击商品进入详情页
		$(".sy_maingoods li").each(function(){
			$(this).children("a").click(function(){
				var id = $(this).closest("li")[0].dataset.id;
				location.href=encodeURI("../html/detail.html?"+id);
			})
		})
	})
	
	//封装排序代码
	$.fn.tfSort=function(){
		//注意这里的this是$()类型的
		//id 是调用这个方法的a标签的id
		var id = this.prop("id");
		console.log(id);
		$.get("../api/goodList.php",{qty:6,curPage:1,sort:id},function(res){
			console.log(res)
			if (typeof res=="string") {
				console.log(res)
				res=JSON.parse(res);
				console.log(res)
			}
			//渲染
			$(".sy_maingoods")[0].innerHTML=res.data.map(function(item){
				var {id,imgUrl1,price,name}=item;
				return `<li data-id=${id}>
		                    <a><img src="${imgUrl1}"></a><br>
		                    <span class="price">￥${price}</span><br>
		                    <a><span class="list_lable_self"></span>${name}</a>
		                    <span class="goldseller_name self_name">1药网自营</span><br>
		                    <a class="view"> 查看详情</a><a class="consultation">咨询医生</a>         
		                </li>`
			}).join("");
		})
	}

	$(".rank").on("click","a",function(){
		$(this).tfSort();
	})
	//点击span加载相对应的图片即分页加载(为什么可以写在ajax渲染代码之后？)
		$(".page").on("click","span",function(){
					//点击span之前先把span的类型清除了
			$(".page span").each(function(){
				$(this).removeClass("active");
			})
				$(this).addClass("active");
				// $(this).text() 获取的值类型是字符串 传过去的curPage可以是数字或者字符串类型
				$.get("../api/goodList.php",{qty:6,curPage:$(this).text()},function(res){
				if (typeof res=="string") {
					res=JSON.parse(res);
				}
					$(".sy_maingoods")[0].innerHTML=res.data.map(function(item){
						var {id,imgUrl1,price,name}=item;
						return `<li data-id=${id}>
				                    <a><img src="${imgUrl1}"></a><br>
				                    <span class="price">￥${price}</span><br>
				                    <a><span class="list_lable_self"></span>${name}</a>
				                    <span class="goldseller_name self_name">1药网自营</span><br>
				                    <a class="view"> 查看详情</a><a class="consultation">咨询医生</a>         
				                </li>`
					}).join("");
					$(".sy_maingoods li").each(function(){
						$(this).children("a").click(function(){
							var id = $(this).closest("li")[0].dataset.id;
							location.href=encodeURI("../html/detail.html?"+id);
						})
					})
				})		
		})
	
	
	
})