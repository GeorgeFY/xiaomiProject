require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"nav":"nav",
		"goodsList":"goodsList"
	}
})

require(["nav","goodsList"],function(nav,goodsList){
	nav.download();
	nav.banner();
	nav.leftNavDownload();
	nav.leftNavTab();
	nav.topNavDownload();
	nav.topNavTab();
	nav.searchTab();
	nav.allGoodsTab();
	
	goodsList.download();
	goodsList.banner();

})