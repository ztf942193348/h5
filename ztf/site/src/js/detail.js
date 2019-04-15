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

	//cookie
	var user = Cookie.getCookie("user");
	//测试cookie
	console.log(Cookie.getCookie("user"));
	console.log(user);
	if (user) {
		$("#header .zhuce li").first().text(user+" 欢迎您！");
		$("#header .zhuce li").first().append('<a href="../html/login.html">退出</a>');
	}

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

	//==============================
	

	


	//获取穿过来的id，渲染
		var dataId=location.search.slice(1);
		console.log(dataId,typeof dataId);
		$.get("../api/detail.php",{dataId:dataId},function(res){
				if (typeof res=="string") {
					res=JSON.parse(res);
					//数组里面只有一个对象
					// console.log(res,res[0].name);
				}
				var {id,imgd1,imgd2,imgd3,imgd4,imgd5,name,pinglun,price}=res[0];
				var arr=[imgd1,imgd2,imgd3,imgd4,imgd5];
				$(".bigpic img").prop("src",imgd1);
				$(".goodstitle").text(name);
				$(".navtitle").html(name);
				$("span.good_price").html(`￥ ${price}`);
				$("span.numComments").html(pinglun);
				$(".imgpart .pic img").prop("src",imgd1);
				$(".imglist ul")[0].innerHTML=arr.map(function(item){
					return `<li><img src="${item}" alt="" /></li>`
			}).join("");
		})

	//数量变动
	//加
	$(".num_pre").click(function(){
		var num = Number($("#product_amount").val());
		$("#product_amount").val(""+ ++num);
	})
	//减
	$(".num_next").click(function(){
		var num = Number($("#product_amount").val());
		if (num>=2) {
			$("#product_amount").val(""+ --num);
		}
	})

	//加入购物车相关操作（cookie商品）
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
    
    //点击加入购物车按钮
	$("#seriesCartButton").click(function(){
		//加入购物车效果（弹窗）
		$("#addCartInfo").css("display","block");
		//弹窗里面的商品图片
		var img = $(".pic img").prop("src");
		$(".spopimg img").prop("src",img);
		//弹窗里面的商品件数显示
		$(".liang").text($("#product_amount").val());
		$(".goodsnum").text($("#product_amount").val());
		//总计金额(价格*件数)
		console.log(Number($(".good_price").text().slice(1)),Number($("#product_amount").val()))
		var total = Number($(".good_price").text().slice(1))*Number($("#product_amount").val());
		$(".goodstotal").text(total);
		//购物车个数显示变化
		geshu += Number($("#product_amount").val());
		if (goodslist=="") {
			$(".geshu").text(geshu);
		}else{
			$(".geshu").text(goodslist[0].qty+geshu);
		}
		
		

		//==========cookie（商品）相关操作=================
		var currentGuid = dataId;
		var i;
		var res = goodslist.some(function(item,idx){
            i = idx;//只要找到guid是一致的，idx就不会继续往下遍历了
            return item.guid == currentGuid;
        })
		 //3.若返回值为true，说明对象已经存在，对该对象的数量加1。若返回值为false，说明不存在，创建新对象。
        if(res){
            goodslist[i].qty+=Number($(".goodsnum").text());
            console.log(goodslist[i],typeof goodslist[i].qty)
        }else{
            var obj = {};
            obj.guid = currentGuid;
            obj.imgurl = $(".imglist ul li").eq(0).find("img").prop("src");
            obj.gname = $(".navtitle").text();
            obj.price = $(".good_price").text().slice(1);
            obj.pinglun=$(".numComments").text();
            obj.qty = Number($(".goodsnum").text());
            goodslist.push(obj);
        }
        //4.不管是数量增加还是创建新对象，都要重新存储cookie
        document.cookie = "goodslist="+ JSON.stringify(goodslist)+"; path=/";
        console.log(document.cookie);
        //5.将数据存入mysql
        console.log($(".geshu").text());
        $.get("../api/insert_cart.php",{
        	id:dataId,
        	num:$(".geshu").text(),
        	user:user,
        	pinglun:$(".numComments").text(),
        	imgurl:$(".imglist ul li").eq(0).find("img").prop("src"),
        	price:$(".good_price").text().slice(1)},function(res){
        	console.log(res);
        })
	})
		
	
})