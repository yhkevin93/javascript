var myfunction = {
	"UI": [{
		"id": "mui",
		"name": "mui",
		"icon": "mui-icon iconfont icon-fontmm"
	}],
	"function": [{
		"id": "share",
		"name": "分享",
		"icon": "mui-icon iconfont icon-fenxiang"
	}, {
		"id": "map",
		"name": "地图",
		"icon": "mui-icon mui-icon-map"
	}, {
		"id": "gallery",
		"name": "相册",
		"icon": "mui-icon mui-icon-image"
	}, {
		"id": "barcode",
		"name": "二维码",
		"icon": "mui-icon iconfont icon-saoyisao"
	}, {
		"id": "audio",
		"name": "录音",
		"icon": "mui-icon mui-icon-mic"
	}, {
		"id": "speech",
		"name": "语音识别",
		"icon": "mui-icon mui-icon-phone"
	}, {
		"id": "accelerometer",
		"name": "加速感应器",
		"icon": "mui-icon iconfont icon-3"
	}, {
		"id": "OAuth",
		"name": "三方登陆",
		"icon": "mui-icon iconfont icon-disanfang"
	}, {
		"id": "message",
		"name": "消息发送",
		"icon": "mui-icon iconfont icon-fasongxiaoxi"
	}, {
		"id": "runtime",
		"name": "runtime",
		"icon": "mui-icon iconfont icon-yunxingzhong"
	}],
	"server": [{
		"id": "nodejs",
		"name": "Node.js",
		"icon": "mui-icon iconfont icon-logo"
	}, {
		"id": "sails.js",
		"name": "Sails.js",
		"icon": "mui-icon iconfont icon-fanchuan"
	}],
	"data": [{
		"id": "mongodb",
		"name": "mongodb",
		"icon": "mui-icon iconfont icon-mongodb"
	}]
}

/*
 在九宫格里添加按钮跳转 界面功能
 name:myfunction里的key，几个重要功能 例：var ui = myfunction.UI
 id:需要添加的ul上的id 
 * */
function addlist(name, id) {
	for(var i in name) {
		var ul = document.getElementById(id)
		var li = document.createElement("li");
		var a = document.createElement("a")
		var span = document.createElement("span");
		var div = document.createElement("div")
		li.className = "mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3";
		a.id = name[i].id;
		span.className = name[i].icon 
		div.className = "mui-media-body";
		div.innerHTML = name[i].name;

		a.appendChild(span);
		a.appendChild(div);

		li.appendChild(a);

		ul.appendChild(li);
	}
}

