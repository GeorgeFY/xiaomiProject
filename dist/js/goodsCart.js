define(["jquery","jquery-cookie"],function($){
	function download(){
		$.ajax({
			type:"get",
			url:"../data//goodsCarList.json",
			success:function(obj){
				var arr = obj.data;
				for(var i = 0; i < arr.length; i++){
					$(`<li class="J_xm-recommend-list span4">    
                                    <dl> 
                                        <dt> 
                                            <a href="//item.mi.com/1181300007.html"> 
                                                <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
                                            </a> 
                                        </dt> 
                                        <dd class="xm-recommend-name"> 
                                            <a href="//item.mi.com/1181300007.html"> 
                                                ${arr[i].name} 
                                            </a> 
                                        </dd> 
                                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                                        <dd class="xm-recommend-tips"> ${arr[i].comments}人好评    
                                            <a class="btn btn-small btn-line-primary J_xm-recommend-btn" href="#" style="display: none;" id = "${arr[i].goodsid}">加入购物车</a>  
                                        </dd> 
                                        <dd class="xm-recommend-notice">

                                        </dd> 
                                    </dl>  
                                </li>`).appendTo("#J_miRecommendBox .xm-recommend ul")
				}
			},
			error:function(msg){
				alert(msg);
			}
		})
	}
	
	function cartHover(){
		$("#J_miRecommendBox .xm-recommend ul").on("mouseenter",".J_xm-recommend-list",function(){
			$(this).find(".xm-recommend-tips a").css("display","block");
		}).on("mouseleave",".J_xm-recommend-list",function(){
			$(this).find(".xm-recommend-tips a").css("display","none");
		})
		
		//加入到购物车
		$("#J_miRecommendBox .xm-recommend ul").on("click",".J_xm-recommend-list a.btn",function(){
			//alert(1);
			var id = this.id;
			var first = $.cookie("goods") == null ? true : false;
			
			if(first){
				var cookieStr = [{id:id, num:1}];
				$.cookie("goods",JSON.stringify(cookieStr),{
					expires:7
				})
			}else{
				var same =false;
				
				var cookieStr = $.cookie("goods");
				var cookieArr = JSON.parse(cookieStr);
				for(var i = 0; i < cookieArr.length; i++){
					if(id == cookieArr[i].id){
						cookieArr[i].num++;
						same = true;
						break;
					}
				}
				if(!same){
					var obj = {id:id,num:1};
					cookieArr.push(obj);
				}
				$.cookie("goods",JSON.stringify(cookieArr),{
					expires:7
				})
			}
			
			//alert($.cookie("goods"));
			loadCarData();
			return false;
		})
	}
	
	//加载购物车里面数据
	
	function loadCarData(){
		//alert(1);
		$("#J_cartListBody .J_cartGoods").html("");
		//promise异步加载数据
		new  Promise(function(resolve,reject){
			$.ajax({
				type:"get",
				url:"../data/goodsCarList.json",
				success:function(obj){
					resolve(obj.data);
				},
				error:function(msg){
					reject(msg);
				}
			})
		}).then(function(arr1){
			// console.log(arr1);
			//下载第二份代码
			return new Promise(function(resolve,reject){
				$.ajax({
					type:"get",
					url:"../data/goodsList2.json",
					success:function(arr2){
						var newArr = arr1.concat(arr2);
						resolve(newArr);
					},
					error:function(msg){
						reject(msg);
					}
				})
			})
		}).then(function(arr){
			var cookieStr = $.cookie("goods");
			if(cookieStr){
				var cookieArr = JSON.parse(cookieStr);
				var newArr = [];
				
				for(var i =0; i < cookieArr.length; i++){
					for(var j = 0; j < arr.length; j++){
						if(cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid){
							arr[j].num = cookieArr[i].num;
							
							//为了方便出了给arr里面添加一个id熟悉
							arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
							newArr.push(arr[j]);
						}
					}
				}
				
				
				//把newArr里面数据加载到页面上
				if(newArr){
					for(var i = 0; i < newArr.length; i++){
						var node = $(`<div class="item-row clearfix" id = ${newArr[i].id}> 
                                                    <div class="col col-check">  
                                                        <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                                                    </div> 
                                                    <div class="col col-img">  
                                                        <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                                            <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                                                        </a>  
                                                    </div> 
                                                    <div class="col col-name">  
                                                        <div class="tags">   
                                                        </div>     
                                                        <div class="tags">  
                                                        </div>   
                                                        <h3 class="name">  
                                                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                                                ${newArr[i].name} 
                                                            </a>  
                                                        </h3>        
                                                    </div> 
                                                    <div class="col col-price"> 
                                                        ${newArr[i].price}元 
                                                        <p class="pre-info">  </p> 
                                                    </div> 
                                                    <div class="col col-num">  
                                                        <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                                            <a href="javascript:void(0)" class="J_minus">
                                                                <i class="iconfont"></i>
                                                            </a> 
                                                            <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                                            <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                                                        </div>  
                                                    </div> 
                                                    <div class="col col-total"> 
                                                        ${(newArr[i].price * newArr[i].num).toFixed(1) }元 
                                                        <p class="pre-info">  </p> 
                                                    </div> 
                                                    <div class="col col-action"> 
                                                        <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                                                    </div> 
                                                </div>`);
							node.appendTo("#J_cartListBody .J_cartGoods");
					}
					isCheckAll();
				}
			}
		}).catch(function(error){
			console.log(error);
		})
	}
	
	//全选按钮和单选按钮实现
	function checkFunc(){
		$("#J_selectAll").click(function(){
			var allChecks = $("#J_cartListBody").find(".item-row").find(".col-check i");
			if($(this).hasClass("icon-checkbox-selected")){
				$(this).add(allChecks).removeClass("icon-checkbox-selected");
			}else{
				$(this).add(allChecks).addClass("icon-checkbox-selected");
			}
			isCheckAll();
			return false;
		})
		
		//给每一个商品复选框添加
		$("#J_cartBox .cart-goods-list").on("click","#J_cartListBody .J_cartGoods .item-row .col-check i",function(){
			if($(this).hasClass("icon-checkbox-selected")){
				$(this).removeClass("icon-checkbox-selected");
			}else{
				$(this).addClass("icon-checkbox-selected");
			}
			isCheckAll();
			return false;
		})
	}
	
	//判断是否所有商品都选择
	function isCheckAll(){
		var allChecks = $(".list-body").find(".item-row");
		
		var isAll = true;
		var total = 0;//总价格
		var count = 0;//被选中的数量
		var totalCount = 0;//记录总数
		allChecks.each(function(index,item){
			if(!$(item).find(".col-check i").hasClass("icon-checkbox-selected")){
				isAll = false;
			}else{
				total += parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(item).find(".col-num input").val());
				count += parseInt($(item).find(".col-num input").val());
			}
			totalCount += parseInt($(item).find(".col-num input").val());
		});
		
		$("#J_cartTotalPrice").html(total);
		$("#J_selTotalNum").html(count);
		$("#J_cartTotalNum").html(totalCount);
		
		if(isAll){
			//如果所有商品都选择，给全选按钮添加选择样式
			$(".list-head .col-check").find("i").addClass("icon-checkbox-selected");
		}else{
			$(".list-head .col-check").find("i").removeClass("icon-checkbox-selected");
		}
	}
	
	//给页面上面商品数量增加减少 删除添加事件
	
	function changeCars(){
		//给删除按钮添加
		$("#J_cartListBody .J_cartGoods").on("click",".col-action .J_delGoods",function(){
			var id = $(this).closest(".item-row").remove().attr("id");
			
			var cookieStr = $.cookie("goods");
			var cookieArr = JSON.parse(cookieStr);
			
			for (var i = 0; i < cookieArr.length; i++) {
				if(cookieArr[i].id == id){
					//删除数据
					
					cookieArr.splice(i,1);
					break;
				}
			}
			if(cookieArr.length == 0){
				$.cookie("goods",null);
			}else{
				$.cookie("goods",JSON.stringify(cookieArr),{
					expires:7
				})
			}
			isCheckAll();
			return false;
		})
		
		$("#J_cartListBody .J_cartGoods").on("click",".J_minus,.J_plus",function(){
			var id = $(this).closest(".item-row").attr("id");
			
			var cookieStr = $.cookie("goods");
			var cookieArr = JSON.parse(cookieStr);
			
			for (var i = 0; i < cookieArr.length; i++) {
				if(cookieArr[i].id == id){
					//找到了该商品
					if(this.className == "J_minus"){
						if(cookieArr[i].num == 1){
							alert("the num is 1,you can not delete!")
						}else{
							cookieArr[i].num--;
						}
					}else{
						cookieArr[i].num++;
					}
					break;
				}
			}
			//更新页面上数量
			$(this).siblings("input").val(cookieArr[i].num);
			//更新单个商品总接个
			var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());
			$(this).closest(".col-num").siblings(".col-total").html((price * cookieArr[i].num).toFixed(1) + "元");
			if(cookieArr.length == 0){
				$.cookie("goods",null);
			}else{
				$.cookie("goods",JSON.stringify(cookieArr),{
					expires:7
				})
			}
			isCheckAll();
			return false;
			
		})
	}
	
	return {
		download:download,
		cartHover:cartHover,
		loadCarData:loadCarData,
		checkFunc:checkFunc,
		changeCars:changeCars
	}
})