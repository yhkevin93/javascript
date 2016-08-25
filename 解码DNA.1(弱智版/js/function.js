function 创建页面布局 (布局设置) {
	mui.each(布局设置,function (i,n) {
		var 容器 = document.createElement("div");
		容器.setAttribute("id", n);
		mui(".mui-content")[0].appendChild(容器);
	});
}

function 加载模板功能(模板名, 数据, 输出目标, 回调函数) {
	配置 = {
		dataType: 'html',
		success: function(返回数据) {
			模板 = 返回数据;
			// 页面渲染
			var 渲染结果 = ejs.compile(模板)(数据);
			// 将渲染结果插入到界面
			document.getElementById(输出目标).innerHTML = 渲染结果;
			回调函数();
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	}
	mui.ajax("ejs/"+模板名, 配置);
}


function 原生页面切换(目标页面id, 跨页参数) {
	页面切换参数 = {
		id: 目标页面id + '.html',
		url: 目标页面id + '.html',
		createNew: true,
		styles: {
			top: '0px', //mui标题栏默认高度为45px；
			bottom: '0px' //默认为0px，可不定义；
		},
		waiting: {
			autoShow: true,
			title: 'Loading...'
		}
	};
	if (全局配置参数.风格配置.等待提示) {
		页面切换参数.waiting.title = 全局配置参数.风格配置.等待提示;
	}
	if (跨页参数) {
		页面切换参数.extras = 跨页参数;
	}
	if (全局配置参数.底部导航菜单.length) {
		页面切换参数.styles.bottom = '51px';
	}
	if (全局配置参数.顶部栏显示软件名称 == '是') {
		页面切换参数.styles.top = '44px';
	}
	mui.openWindow(页面切换参数);
}


function 页面初始化(页面初始化参数) {
	if (全局配置参数.顶部栏显示软件名称 == '否') {
		var 当前页面视图 = plus.webview.currentWebview();
		var dom_页面标题 = mui("header h1")[0];
		if (当前页面视图.页面名称) {
			dom_页面标题.innerText = 当前页面视图.页面名称;
		} else {
			dom_页面标题.innerText = 全局配置参数.默认界面名称;
		}
		console.log('页面初始化->页面标题：' + dom_页面标题.innerText);
		if (当前页面视图.页面id && 当前页面视图.页面id != 全局配置参数.默认页面id) {
			requirejs([当前页面视图.页面id]);
			console.log('页面初始化->载入页面脚本：' + 当前页面视图.页面id + '.js');
		} else {
			requirejs([全局配置参数.默认页面id]);
			console.log('页面初始化->载入默认页面脚本：' + 全局配置参数.默认页面id + '.js');
		}
	}
}

function 数据接口操作(动作, 方法, 发送的数据, 成功回调, 失败回调) {
	// 配置访问服务器参数
	参数配置 = {
		data: 发送的数据,
		dataType: 'json',
		type: 方法,
		success: function(返回的数据) {
			//服务器返回响应
			成功回调(返回的数据);
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
			if (失败回调) {
				失败回调(xhr, type, errorThrown);
			}
		}
	}
	mui.ajax(全局配置参数.服务器地址 + 动作, 参数配置);
}


function 全局初始化(全局配置参数) {
	//仅支持竖屏显示
	plus.screen.lockOrientation("portrait-primary");
	// 设置计数器
	var 配置项目计数器 = 0;
	// 设置系统状态栏背景
	if (全局配置参数.风格配置.状态栏背景颜色) {
		plus.navigator.setStatusBarBackground(全局配置参数.风格配置.状态栏背景颜色);
		配置项目计数器++;
		console.log('配置' + 配置项目计数器 + '->状态栏颜色：' + 全局配置参数.风格配置.状态栏背景颜色);
	}
	// 设置系统状态栏样式为浅色文字
	if (全局配置参数.风格配置.状态栏文字风格) {
		plus.navigator.setStatusBarStyle(全局配置参数.风格配置.状态栏文字风格);
		配置项目计数器++;
		console.log('配置' + 配置项目计数器 + '->状态栏文字风格：' + 全局配置参数.风格配置.状态栏文字风格);
	}
	// 配置软件名称
	if (全局配置参数.顶部栏显示软件名称 == '是' && 全局配置参数.软件名称) {
		var dom_顶部栏 = document.getElementById("顶部栏");
		dom_顶部栏.style.display = "block";
		dom_顶部栏.style.backgroundColor = 全局配置参数.风格配置.状态栏背景颜色;
		dom_顶部栏.children[0].style.color = 全局配置参数.风格配置.顶部栏文字颜色;
		dom_顶部栏.children[0].innerText = 全局配置参数.软件名称;
		配置项目计数器++;
		console.log('配置' + 配置项目计数器 + '->顶部栏软件名称：' + 全局配置参数.软件名称);
	}
	// 配置底部导航栏
	if (全局配置参数.底部导航菜单.length) {
		var dom_底部导航菜单 = document.getElementById("底部导航菜单");
		dom_底部导航菜单.style.display = 'block';
		// 加载外部模板
		加载模板功能("mui-tab-item.ejs", 全局配置参数, '底部导航菜单', function() {
			// 配置按钮的动作
			mui("#底部导航菜单").on("tap", ".底部导航菜单项", function() {
				原生页面切换(this.id, {
					"页面id": this.id,
					"页面名称": this.getAttribute('data-name')
				});
			});
		});
		配置项目计数器++;
		console.log('配置' + 配置项目计数器 + '->底部导航按钮' + 全局配置参数.底部导航菜单.length + "个");
	}
}

//图片缓存方法
			function 图片缓存(obj, callback) {
				var debug = false; // 默认打印调试日志
				if (obj.getAttribute('data-loaded')) {
					return;
				}

				var image_url = obj.getAttribute('data-lazyload');
				debug && console.log(image_url);

				// 1. 转换网络图片地址为本地缓存图片路径，判断该图片是否存在本地缓存
				// http://...jpg -> md5
				// 缓存目录 _downloads/image/(md5).jpg
				var image_md5 = md5(image_url);
				var local_image_url = '_downloads/image/' + image_md5 + '.jpg'; // 缓存本地图片url
				var absolute_image_path = plus.io.convertLocalFileSystemURL(local_image_url); // 平台绝对路径

				// new temp_img 用于判断图片文件是否存在
				var temp_img = new Image();
				temp_img.src = absolute_image_path;
				temp_img.onload = function() {
					debug && console.log('存在本地缓存图片文件' + local_image_url + '，直接显示');

					// 1.1 存在，则直接显示（本地已缓存，不需要淡入动画）
					obj.setAttribute('src', absolute_image_path);
					obj.setAttribute('data-loaded', true);
					obj.classList.add('img-lazyload');

					callback && callback();
					return;
				}
				temp_img.onerror = function() {
					debug && console.log('不存在本地缓存图片文件');

					// 1.2 下载图片缓存到本地
					debug && console.log('开始下载图片' + image_url + ' 缓存到本地: ' + local_image_url);

					function download_img() {
						var download_task = plus.downloader.createDownload(image_url, {
							filename: local_image_url // filename:下载任务在本地保存的文件路径
						}, function(download, status) {
							if (status != 200) {
								// 下载失败,删除本地临时文件
								debug && console.log('下载失败,status' + status);
								if (local_image_url != null) {
									plus.io.resolveLocalFileSystemURL(local_image_url, function(entry) {
										entry.remove(function(entry) {
											debug && console.log("临时文件删除成功" + local_image_url);
											// 重新下载图片
											download_img();
										}, function(e) {
											debug && console.log("临时文件删除失败" + local_image_url);
										});
									});
								}
							} else {
								// 把下载成功的图片显示
								// 将本地URL路径转换成平台绝对路径
								obj.setAttribute('src', plus.io.convertLocalFileSystemURL(local_image_url));
								obj.setAttribute('data-loaded', true);
								obj.classList.add('img-lazyload');

								callback && callback();
							}
						});
						download_task.start();
					}
					download_img();
				}

			}