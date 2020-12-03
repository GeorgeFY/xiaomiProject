console.log("desc is ok!");
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"nav":"nav",
		"goodsDesc":"goodsDesc"
	},
	shim:{
		"jquery-cookie":["jquery"]
	}
})

require(["nav","goodsDesc"],function(nav,goodsDesc){
	nav.topNavDownload();
	nav.topNavTab();
	nav.searchTab(); 
	nav.allGoodsTab();
	//侧边栏加载
	nav.leftNavDownload();
	//给侧边栏添加移入移出效果
	nav.leftNavTab();
	goodsDesc.download();
	goodsDesc.banner();
})