console.log("加载完成");
/* 
    配置当前项目引入的模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        //引入banner图效果
        "nav": "nav",
        "slide": "slide",
        "data": "data"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})

require(["nav", "slide", "data"], function(nav, slide, data){
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    // //加载商品数据 
    slide.download();
    // //添加商品数据滚动效果
    slide.slideTab();
    // //倒计时效果
    slide.countDown();

    // //主页数据加载
    data.download();
    data.tabMenu();
    
})