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

	//数量变动
	// var _price = Number($(".td-price .td-inner").text().trim().slice(1));
	// var _weight = Number($(".td-weight .td-inner").text().trim());
	// var _sum = Number($(".td-sum .td-inner").text().trim().slice(1));
	// console.log(_price,_weight,_sum,);
	



	//cookie
	var user = Cookie.getCookie("user");
	//测试cookie
	// console.log(Cookie.getCookie("user"));
	console.log(user);
	if (user) {
		$("#logininfo a").each(function(){$(this).remove();});
		$("#logininfo").append($("<span>"));
		$("#logininfo span").text(user+" 欢迎您!");
	}

	// 利用cookie渲染
    // 1.获取cookie的值（字符串）转成数组对象
	//  * 获取到的cookie也有可能为空
    var goodslistArr = Cookie.getCookie("goodslist") || [];
    if(typeof goodslistArr == "string"){
        goodslistArr = JSON.parse(goodslistArr);
        if (goodslistArr.length!=0) {
        	console.log(goodslistArr.length)
    var dataId=goodslistArr[0].guid;
    var qty = goodslistArr[0].qty;
    
    					//传user↓
    $.get("../api/cart.php",{user:user},function(res){
				if (typeof res=="string") {
					res=JSON.parse(res);
					//数组里面只有一个对象
					console.log(res);
				}
				if (res=="") {
					$(".empty_box").show();
					$(".full_box").hide();
				}else{
					// var {id,imgurl,name,price}=res[0];
				// $(".item-pic img").prop("src",imgurl);
				// $(".item-info a").text(name);
				// $(".td-price .td-inner").text(`￥ ${price}`);
				// //从cookie拿过来渲染的
				// $("#w7c50077490_1_50077490").val(qty);

				$(".item-body")[0].innerHTML=goodslistArr.map(function(item){
					var {guid,imgurl,gname,price,num,pinglun,qty}=item;
					console.log(item)
					return`
							<ul class="item-content clearfix" id="g${guid}">
                                            <li class="td td-chk">
                                                <div class="td-inner">
                                                    <input type="hidden" name="cart_pid" value="50077490"
                                                        id="cart_ref_50077490">
                                                    <input type="hidden" name="cart_pid" value="1"
                                                        id="cart_itype_50077490">
                                                    <label class="cart-checkbox cart-checkbox-selected ">
                                                        <input type="checkbox" onclick="checkItemStatus(this);"
                                                            value="50077490" itype="1" name="cart2Checkbox"
                                                            autocomplete="off" checked="true">
                                                        <span>勾选此店铺下所有商品</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li class="td td-item">
                                                <div class="td-inner">
                                                    <div class="item-pic">
                                                        <a href="${imgurl}"
                                                            target="_blank"><img
                                                                onerror="imgERROR(this, 'no_pic_50_50.jpg')"
                                                                src="${imgurl}"
                                                                alt="福牌阿胶 阿胶 250g" class="itempic">
                                                        </a>
                                                    </div>
                                                    <div class="item-info">
                                                        <a href="//www.111.com.cn/product/50077490.html" target="_blank"
                                                            class="item-title">${gname}</a>
                                                        <div class="result_txt clearfix">
                                                            <p>【<i> 250g </i>】<br> </p>
                                                            <input id="selectValue_50077490" type="hidden" value="">
                                                            <input id="selectValueInfo_50077490" type="hidden" value="">
                                                            <div class="revise_div"><a href="javascript:void(0);"
                                                                    class="modify_txt" id="modify_txt_50077490"
                                                                    specialid="50077490" specialno="1600963839"
                                                                    specialtype="1" specialrefmainitemid="50077490"
                                                                    catalogid="953783">修改</a>
                                                                <div class="pop_info" id="pop_info_50077490">
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                            <li class="td td-price">
                                                <div class="td-inner">
                                                    <em>¥</em>${price}
                                                </div>
                                            </li>
                                            <li class="td td-amount">
                                                <div class="td-inner" limitbuy="0" catal="0">
                                                    <div class="item-amount ">
                                                        <input type="button" class="btn-reduce">
                                                        <input name="a" refmainitemid="50077490" itemid="50077490"
                                                            itype="1"  class="text-amount"
                                                            maxlength="3" value="${qty}" type="text" autocomplete="off">
                                                        <!---->
                                                        <!---->
                                                        <!--||(errorMsg.length()>0-->
                                                        <input type="button" class="btn-plus">
                                                    </div>
                                                    <div class="amount-msg" style="display: none;"
                                                        id="w7t50077490_1_50077490">
                                                        商品数量已修改为&nbsp;<span style="color: red;">1</span>
                                                        <em></em>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="td td-weight">
                                                <div class="td-inner number">
                                                    0.46
                                                </div><em>kg</em>
                                            </li>
                                            <li class="td td-location">
                                                <div class="td-inner">
                                                    有货
                                                </div>
                                            </li>
                                            <li class="td td-sum">
                                                <div class="td-inner red">
                                                    <em>¥</em>
                                                    ${(price*qty).toFixed(2)}
                                                </div>
                                            </li>
                                            <li class="td td-op">
                                                <div class="td-inner">

                                                    <a id="favorites_1179343" class="fav" href="javascript:void(0);"
                                                        >收藏</a>

                                                    <a href="javascript:;" 
                                                        class="deleteButton">删除</a>
                                                </div>
                                            </li>
                                        </ul>
							`
				}).join("");
				var sum=0;
				$(".item-content .td-sum .td-inner").each(function(){
					sum+=Number($(this).text().trim().slice(1));
				})
				$(".goodsall").text("￥"+sum.toFixed(2));
				//商品总价
				$(".allprice").text("￥"+sum.toFixed(2));
		//由于渲染是异步的，所以要重新赋值_price，_weight，_sum
		// _price = Number($(".td-price .td-inner").text().trim().slice(1));
		// _weight = Number($(".td-weight .td-inner").text().trim());
		// _sum = Number($(".td-sum .td-inner").text().trim().slice(1));
				}
				
	})

	//加
	$(".item-body").on("click",".btn-plus",function(){
		var num = Number($(this).prev().val());
		var _price = $(this).closest(".item-content").find(".td-price .td-inner").text().trim().slice(1);
		//更新页面
		$(this).prev().val(""+ ++num);
		_sum=(_price*num).toFixed(2);
		console.log(_price,num)
		//小计
		$(this).closest(".item-content").find(".td-sum .td-inner").text("￥"+_sum);
		//商品金额
		var sum=0;
		$(".item-content .td-sum .td-inner").each(function(){
			sum+=Number($(this).text().trim().slice(1));
		})
		$(".goodsall").text("￥"+sum.toFixed(2));
		//商品总价
		$(".allprice").text("￥"+sum.toFixed(2));
		//更新cookie
		var currentGuid=$(this).closest(".item-content").prop("id").slice(1);
		var i;
		var res = goodslistArr.some(function(item,idx){
            i = idx;//只要找到guid是一致的，idx就不会继续往下遍历了
            return item.guid == currentGuid;
        })
        console.log(res,currentGuid);
		 //3.若返回值为true，说明对象已经存在，对该对象的数量增加1。
        if(res){
            goodslistArr[i].qty++;
            console.log("cookie 增加成功,现为",goodslistArr[i].qty)
        }
        document.cookie = "goodslist="+ JSON.stringify(goodslistArr);
		//更新数据库
		$.get("../api/insert_cart.php",{
			id:$(this).closest(".item-content").prop("id").slice(1),

			num:$(this).prev().val(),
			user:user},function(res){
        	console.log(res);
        })
        console.log($(this).closest(".item-content").prop("id").slice(1))
	})
	//减
	$(".item-body").on("click",".btn-reduce",function(){
		var num = Number($(this).next().val());
		console.log(num)
		//更新页面
		if (num>=2) {
			var _price = $(this).closest(".item-content").find(".td-price .td-inner").text().trim().slice(1);
			$(this).next().val(""+ --num);
			_sum=(_price*num).toFixed(2);
			//小计
			$(this).closest(".item-content").find(".td-sum .td-inner").text("￥"+_sum);
			//商品金额
			var sum=0;
			$(".item-content .td-sum .td-inner").each(function(){
				sum+=Number($(this).text().trim().slice(1));
			})
			$(".goodsall").text("￥"+sum.toFixed(2));
			//商品总价
			$(".allprice").text("￥"+sum.toFixed(2));
			//更新cookie
			var currentGuid=$(this).closest(".item-content").prop("id").slice(1);
			var i;
			var res = goodslistArr.some(function(item,idx){
	            i = idx;//只要找到guid是一致的，idx就不会继续往下遍历了
	            return item.guid == currentGuid;
	        })
	        console.log(res,currentGuid);
			 //3.若返回值为true，说明对象已经存在，对该对象的数量增加1。
	        if(res){
	            goodslistArr[i].qty--;
	            console.log("cookie 减少成功,现为",goodslistArr[i].qty)
	        }
	        document.cookie = "goodslist="+ JSON.stringify(goodslistArr);
			//更新数据库
			$.get("../api/insert_cart.php",{
				id:$(this).closest(".item-content").prop("id").slice(1),
				num:$(this).next().val(),
				user:user},function(res){
        	console.log(res);
       		})
		}
	})
	//删
	$(".item-body").on("click",".deleteButton",function(){
		//更新页面
		$(this).closest(".item-content").remove();
		//商品金额
		var sum=0;
		$(".item-content .td-sum .td-inner").each(function(){
			sum+=Number($(this).text().trim().slice(1));
		})
		$(".goodsall").text("￥"+sum.toFixed(2));
		//商品总价
		$(".allprice").text("￥"+sum.toFixed(2));
		
		//更新cookie
		var i;
		var currentGuid=$(this).closest(".item-content").prop("id").slice(1);
		goodslistArr.some(function(item,idx){
			i=idx;
			return item.guid==currentGuid;
		})
		goodslistArr.splice(i,1);
		document.cookie = "goodslist="+ JSON.stringify(goodslistArr);
		console.log("cookie删除成功，删除的商品id为",currentGuid);
		console.log(goodslistArr.length)
		//通过cookie判断是否删除干净，如果删除干净就将当前页面隐藏,并且将另外一个（没有商品）页面显示
		if (goodslistArr.length==0){
			console.log(666)
			$(".full_box").hide();
			$(".empty_box").show();
		}
		//更新数据库
		$.get("../api/insert_cart.php",{type:"del",user:user,id:$(this).closest(".item-content").prop("id").slice(1)},function(res){
        	console.log(res,typeof res);
        })
	})
	//数量输入框改变时
	$(".item-body").on("input propertychange",".text-amount",function(){
		var num = Number($(this).val());
		var _price = $(this).closest(".item-content").find(".td-price .td-inner").text().trim().slice(1);
		_sum=(_price*num).toFixed(2);
		//更新页面
		$(this).closest(".item-content").find(".td-sum .td-inner").text("￥"+_sum);
		//商品金额
		var sum=0;
		$(".item-content .td-sum .td-inner").each(function(){
			sum+=Number($(this).text().trim().slice(1));
		})
		$(".goodsall").text("￥"+sum.toFixed(2));
		//商品总价
		$(".allprice").text("￥"+sum.toFixed(2));
		//更新cookie
		var currentGuid=$(this).closest(".item-content").prop("id").slice(1);
		var i;
		var res = goodslistArr.some(function(item,idx){
            i = idx;//只要找到guid是一致的，idx就不会继续往下遍历了
            return item.guid == currentGuid;
        })
        console.log(res,currentGuid);
		 //3.若返回值为true，说明对象已经存在，对该对象的数量更改。
        if(res){
            goodslistArr[i].qty=Number($(this).val());
            console.log("cookie 更改成功,现为",goodslistArr[i].qty)
        }
        document.cookie = "goodslist="+ JSON.stringify(goodslistArr);
		//更新数据库
		$.get("../api/insert_cart.php",{
			id:$(this).closest(".item-content").prop("id").slice(1),
			num:$(this).val(),
			user:user},function(res){
        	console.log(res);
        })
	})
}else if (goodslistArr.length==0){
	$(".full_box").hide();
	$(".empty_box").show();
    
}
}
})