define(["jquery"],function($){
	function download(){
		$.ajax({
			type:"get",
			url:"../data/goodsList2.json",
			success:function(arr){
				$(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-a2d6c756 class="channel-product-imgText">
                            <div data-v-a2d6c756 class = 'channel-product-top'>
                                <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                    <div data-v-a2d6c756 class = 'figure'>
                                        <a href="#">
                                            <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${arr[0].image}" alt=""/>
                                        </a>
                                    </div>
                                    <div data-v-a2d6c756 class = 'content'>
                                        <h3 data-v-a2d6c756 class = 'title'>
                                            <a data-v-a2d6c756 href="#">
                                                ${arr[0].name}
                                            </a>
                                        </h3>
                                        <p data-v-a2d6c756 class = 'desc'>${arr[0].desc}</p>
                                        <p data-v-a2d6c756 class = 'price'>
                                            <strong data-v-a2d6c756>${arr[0].price}</strong>元
                                            <span data-v-a2d6c756>起</span>
                                            ${arr[0].del == 0 ? "" : "<del data-v-a2d6c756>" + arr[0].del + "元</del>"}
                                        </p>
                                        <p data-v-a2d6c756 class = 'link'>
                                            <a data-v-a2d6c756 href="goodsDesc.html?product_id=${arr[0].product_id}">立即购买</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<!-- 分割线 -->
				<div data-v-61428f58 class = 'section'>
				    <div data-v-61428f58 class = 'components-list-box'>
				        <div data-v-4a0c734d class = 'channel-line' style = 'background-color: rgb(245, 245, 245); height: 14px;'></div>
				    </div>
				</div>`).appendTo(".page-main .app-body");
				
				//创建小图商品
				for(var i = 1; i< arr.length; i++){
					if(i % 2 != 0){
						var row = $(`<div data-v-61428f58 class = 'section'>
						    <div data-v-61428f58 class = 'components-list-box'>
						        <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
						            <div data-v-45ef62b1 class = 'row'>
						                
						            </div>
						        </div>
						    </div>
						</div>`);
						row.appendTo(".page-main .app-body");
					}
					var node = $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
									<div data-v-45ef62b1 class = 'figure'>
										<a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}" class = 'exposure'>
											<img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${arr[i].image}" alt=""/>
										</a>
									</div>
									<h3 data-v-45ef62b1 class = 'title'>
										<a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}">${arr[i].name}</a>
									</h3>
									<p data-v-45ef62b1 class = 'desc'>${arr[i].desc} </p>
									<p data-v-45ef62b1 class = 'price'>
										<strong data-v-45ef62b1>${arr[i].price}</strong>元
										<span data-v-45ef62b1>起</span>
										${arr[i].del == 0 ? "" : "<del data-v-45ef62b1>" + arr[i].del + "元</del>"}
									</p>
								</div>`);
					node.appendTo(row.find(".row"));
				}
			},
			error:function(msg){
				alert(msg);
			}
		})
	}
	//实现商品页轮播图
	
	function banner(){
		var oDiv = $(".swiper-container .swiper-wrapper");
		var aBtns = $(".swiper-container .swiper-pagination a");
		
		var iNow = 0;
		var timer = null;
		
		timer = setInterval(function(){
			iNow++;
			tab();
		},2000);
		
		aBtns.click(function(){
			clearInterval(timer);
			iNow = $(this).index();
			tab();
			return false;
		})
		
		$(".swiper-container .swiper-button-prev").click(function(){
			iNow--;
			
			if(iNow == -1){
				tabprev();
				
			}else{
				tab();
			}
			clearInterval(timer);
		})
		$(".swiper-container .swiper-button-next").click(function(){
			iNow++;
			tab();
			clearInterval(timer);
		})
		$(".swiper-container").mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			timer = setInterval(function(){
				iNow++;
				tab();
			},2000);
		})
		function tab(){
			aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
			
			if(iNow == aBtns.size()){
				aBtns.eq(0).addClass("swiper-pagination-bullet-active");
			}
			
			oDiv.animate({left:-2560*iNow},1,function(){
				if(iNow == aBtns.size()){
					iNow = 0;
					oDiv.css("left",0);
				}
			})
		}
		function tabprev(){
			aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
			
			if(iNow == aBtns.size()){
				aBtns.eq(0).addClass("swiper-pagination-bullet-active");
			}
			
			oDiv.animate({left:-2560*iNow},1,function(){
				if(iNow == -1){
					iNow = 2;
					oDiv.css("left",-5120);
				}
			})
		}
	}
	
	
	return {
		download:download,
		banner:banner
	}
})