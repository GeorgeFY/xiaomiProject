define(["jquery"], function($){
    function download(){
        //数据下载
        $.ajax({
            url: "../data/nav.json",
            success: function(data){
                //第一部分，实现轮播图效果
                var bannerArr = data.banner;
                for(var i = 0; i < bannerArr.length; i++){
                    $(`<a href="https://www.mi.com/mix3/">
                        <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerArr[i].img}' alt=""/>
                    </a>`).appendTo("#J_homeSwiper .swiper-slide");
                    var node = $(` <a href="#" class = 'swiper-pagination-bullet'></a>`);
                    if(i == 0){
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error: function(msg){
                console.log(msg);
                
            }
        })
        topNavDownload();
        leftNavDownload();
    }

    //侧边导航栏加载
    function leftNavDownload(){
        $.ajax({
            url: "../data/nav.json",
            success: function(data){
                //第二部分，实现侧边导航栏
                var sideArr = data.sideNav;
                for(var i = 0; i < sideArr.length; i++){
                    var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideArr[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                            
                        </div>
                    </li>`);
                    node.appendTo("#J_navCategory #J_categoryList");

                    //取出其中的子节点
                    var childArr = sideArr[i].child;
                    var col = Math.ceil(childArr.length / 6);
                    node.find("div.children").addClass("children-col-" + col);
                    for(var j = 0; j < childArr.length; j++){
                        if(j % 6 == 0){
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[j].title}</span>
                            </a>
                        </li>`).appendTo(newUl);
                    }
                }
            }
        })
    }

    
    function topNavDownload(){
        $.ajax({
            url: "../data/nav.json",
            success: function(data){
                //第三部分实现顶部导航
                var topNavArr = data.topNav;
                topNavArr.push({title: "服务"}, {title: "社区"});
                for(var i = 0; i < topNavArr.length; i++){
                    $(`<li data-index="${i}" class="nav-item">
                        <a href="javascript: void(0);" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1" class="link" data-stat-id="69baf6920236bfcb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-69baf6920236bfcb', 'javascript:void0', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1']);">
                            <span class="text">${topNavArr[i].title}</span>
                        </a> 
                    </li>`).appendTo(".site-header .header-nav .nav-list");


                    var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
                    </ul>`);
                    node.appendTo("#J_navMenu .container")
                    //取出所有的子菜单选项
                    if(topNavArr[i].childs){
                        var childsArr = topNavArr[i].childs;
                        for(var j = 0; j < childsArr.length; j++){
                            $(`<li>
                                <a href="#">
                                    <div class = 'figure figure-thumb'>
                                        <img src="${childsArr[j].img}" alt=""/>
                                    </div>
                                    <div class = 'title'>${childsArr[j].a}</div>
                                    <p class = 'price'>${childsArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
                        }
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //顶部导航添加移入移出效果
    function topNavTab(){
        
        $(".header-nav .nav-list").on("mouseenter", ".nav-item", function(){
            $(this).addClass("nav-item-active");
            var index = $(this).index() - 1;
            if(index >= 0 && index <= 6){
                $("#J_navMenu").css({display: "block"}).removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");                ;
            }
        })
        $(".site-header").on("mouseleave", ".nav-item", function(){
            $(this).removeClass("nav-item-active");
        })


        //移出的时候取消下拉菜单
        $(".site-header").mouseleave(function(){
            $("#J_navMenu").css({display: "block"}).removeClass("slide-down").addClass("slide-up");
        })
        
    }

    //给侧片导航添加移入切换效果
    function leftNavTab(){
        $("#J_categoryList").on("mouseenter", ".category-item", function(){
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave", "li.category-item", function(){
            $(this).removeClass("category-item-active");
        })
    }
    
    //banner图效果
    function banner(){
       
        var iNow = 0;
        var aImgs = null;
        var aBtns = null;
        var timer = setInterval(function(){
            iNow++;
            tab();

        }, 2500);

        function tab(){
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if(!aBtns){
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if(iNow == 5){
                iNow = 0;
            }

            //图片切换
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 500);
            //对应的小圆圈指定当前是哪张图片显示
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //添加移入移出
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function(){
            clearInterval(timer);
        });
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
    
            }, 2500);
        });

        $("#J_homeSwiper .swiper-pagination").on("click", "a", function(){
            iNow = $(this).index();
            tab();
            return false;
        })

        //给上一张和下一张添加点击事件
        $(".swiper-button-prev,.swiper-button-next").on("click", function(){
            if(this.className == "swiper-button-prev"){
                iNow--;
                if(iNow == 0){
                    iNow == 4;
                }
            }else{
                iNow++;
            }
            tab();
        })

    }

    //搜索框效果
    function searchTab(){
        $("#search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show");
        })
        $("#search").blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        })
    }

    function allGoodsTab(){
        $(".header-nav .nav-list").on("mouseenter", ".nav-category", function(){
            $(this).addClass("nav-category-active");
            $(this).find(".site-category").css("display", 'block');
        })
        
        $(".header-nav .nav-list").on("mouseleave", ".nav-category", function(){
            $(this).removeClass("nav-category-active");
            $(this).find(".site-category").css("display", 'none');
        })
    }

    return {
        banner: banner,
        download: download,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        searchTab: searchTab,
        topNavDownload: topNavDownload,
        allGoodsTab: allGoodsTab,
        leftNavDownload: leftNavDownload

    }
})