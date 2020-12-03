define(["jquery"], function($){
    function download(){
        $.ajax({
            url: "../data/slide.json",
            success: function(data){
                var slideArr = data.data.list.list;
                for(var i = 0; i < slideArr.length; i++){
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                        <a href="#" target = "_blank">
                            <div class = 'content'>
                                <div class = 'thumb'>
                                    <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                                </div>
                                <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                <p class = 'desc'>${slideArr[i].desc}</p>
                                <p class = 'price'>
                                    <span>${slideArr[i].seckill_Price}</span>元
                                    <del>${slideArr[i].goods_price}元</del>
                                </p>
                            </div>
                        </a>
                    </li>`).appendTo("#J_flashSaleList ul");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function slideTab(){
        var aSpans = $(".swiper-controls").find("span");
        var iNow = 0;
        var count = Math.ceil(26 / 4) - 1;

        //启动定时器，让其一开始自己滚动
        var timer = setInterval(function(){
            iNow++;
            tab();
            if(iNow == count){
                clearInterval(timer);
            }
        }, 4000);

        aSpans.click(function(){
            if($(this).index() == 0){
                iNow--;
                iNow = Math.max(0, iNow);
            }else{
                iNow++;
                iNow = Math.min(count, iNow)
            }
            tab();
        })
        function tab(){
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled")
            
            var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992;
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "1000ms"
            })
        }
        
    }

    //定时器倒计时，每天14:00开枪，每天22:00开枪
    function countDown(){
        var nowDate = new Date();
        var hour = nowDate.getHours();
        var date = nowDate.getDate();
        var afterDate = new Date();
       
        
        //计算倒计时时间间隔
        if(hour < 14){
            afterDate.setHours(14);
            $(".flashsale-countdown .round").html("14:00 场");
            
        }else if(hour >= 14 && hour < 22){
            afterDate.setHours(22);
            $(".flashsale-countdown .round").html("22:00 场");
        }else{
            $(".flashsale-countdown .round").html("明日14:00 场");
            afterDate.setHours(14);
            afterDate.setDate(date + 1);
        }
        afterDate.setMilliseconds(0);
        afterDate.setSeconds(0);
        afterDate.setUTCMilliseconds(0);

        //计算倒计时总秒数
        var count = parseInt((afterDate.getTime() - nowDate.getTime()) / 1000);
    

        var aSpans = $(".box-bd .countdown").find("span");
        
        var timer = setInterval(function(){
            count--;
            aSpans.eq(2).html(doubleNum(count % 60));
            aSpans.eq(1).html(doubleNum(parseInt(count / 60) % 60));
            aSpans.eq(0).html(doubleNum(parseInt(count / 3600) % 24));
            if(count == 0){
                clearInterval(timer);
                $(".box-bd .desc").html("本次活动结束,敬请期待~");
            }
        }, 1000);
    }

    function doubleNum(num){
        if(num < 10){
            return "0" + num;
        }else{
            return num;
        }
    }

    return {
        download: download,
        slideTab: slideTab,
        countDown: countDown
    }
})