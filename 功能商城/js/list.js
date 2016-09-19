/*数据储存
 id:页面跳转 xxx.html前的xxx
 name：标题 显示的名字
 icon:图标class
 type：所属类型
 money：价格
*
*/
var yhfun = {
		"UI": {
			"mui": {
				"id": "mui",
				"name": "mui",
				"icon": "mui-icon iconfont icon-fontmm",
				"type": "UI",
				"money": "500"
			}
		},
		"功能": {
			"share": {
				"id": "share",
				"name": "分享",
				"icon": "mui-icon iconfont icon-fenxiang",
				"type": "功能",
				"money": "600"
			},
			"map": {
				"id": "map",
				"name": "地图",
				"icon": "mui-icon mui-icon-map",
				"type": "功能",
				"money": "700"
			},
			"gallery": {
				"id": "gallery",
				"name": "相册",
				"icon": "mui-icon mui-icon-image",
				"type": "功能",
				"money": "250"
			},
			"barcode": {
				"id": "barcode",
				"name": "二维码",
				"icon": "mui-icon iconfont icon-saoyisao",
				"type": "功能",
				"money": "300"
			},
			"audio": {
				"id": "audio",
				"name": "录音",
				"icon": "mui-icon mui-icon-mic",
				"type": "功能",
				"money": "400"
			},
			"speech": {
				"id": "speech",
				"name": "语音识别",
				"icon": "mui-icon mui-icon-phone",
				"type": "功能",
				"money": "500"
			},
			"accelerometer": {
				"id": "accelerometer",
				"name": "加速感应器",
				"icon": "mui-icon iconfont icon-3",
				"type": "功能",
				"money": "600"
			},
			"OAuth": {
				"id": "OAuth",
				"name": "三方登陆",
				"icon": "mui-icon iconfont icon-disanfang",
				"type": "功能",
				"money": "200"
			},
			"message": {
				"id": "message",
				"name": "消息发送",
				"icon": "mui-icon iconfont icon-fasongxiaoxi",
				"type": "功能",
				"money": "100"
			},
			"runtime": {
				"id": "runtime",
				"name": "runtime",
				"icon": "mui-icon iconfont icon-yunxingzhong",
				"type": "功能",
				"money": "600"
			}
		},
		"服务器": {
			"nodejs": {
				"id": "nodejs",
				"name": "Node.js",
				"icon": "mui-icon iconfont icon-logo",
				"type": "服务器",
				"money": "600"
			},
			"sails.js": {
				"id": "sails.js",
				"name": "Sails.js",
				"icon": "mui-icon iconfont icon-fanchuan",
				"type": "服务器",
				"money": "600"
			}
		},
		"数据库": {
			"mongodb": {
				"id": "mongodb",
				"name": "mongodb",
				"icon": "mui-icon iconfont icon-mongodb",
				"type": "数据库",
				"money": "600"
			}
		}
	}


/*
 * 新！！！
 在九宫格里添加按钮跳转 界面功能
 参数： name:myfunction里的key，几个重要功能 例：var ui = myfunction.UI
 id:需要添加的ul上的id 
 * */
function add() {
	//先生成外层ul
	for(var o in yhfun) {
		var body = document.getElementById("body");
		var div = document.createElement("div");
		var ul = document.createElement("ul");

		div.className = "title";
		div.innerHTML = o;

		ul.className = "mui-table-view mui-grid-view mui-grid-9";
		ul.id = o;

		body.appendChild(div);
		body.appendChild(ul);

		var list = yhfun[o];
		console.log(JSON.stringify(list))
		for(var i in list) {
			var ul = document.getElementById(list[i].type)
			var li = document.createElement("li");
			var a = document.createElement("a")
			var span = document.createElement("span");
			var div = document.createElement("div")

			li.className = "mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3";
			a.id = list[i].id;
			span.className = list[i].icon
			div.className = "mui-media-body";
			div.innerHTML = list[i].name;

			a.appendChild(span);
			a.appendChild(div);

			li.appendChild(a);

			ul.appendChild(li);
		}
	}
}
