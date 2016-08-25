

function reload(){
	if(plus.storage.getItem("first") == "no"){
		mui.toast("您已经更新过了")
	}else{
		mui.openWindow("_www/index.html");
		//不是第一次更新
	plus.storage.setItem("first","no")
	//需要更新
	plus.storage.setItem("reload","yes");
	mui.toast("请重新登录")
	}
	
}
