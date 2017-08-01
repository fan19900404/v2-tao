(function(){
	var mallUtils = {
		screen:{
			width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		},
		interfaceApi: 'http://api.mall.com/',
		regs:{
			mobile: /^1\d{10}$/
		}
	};

	//客户端检测

	var device = function(){
		function deviceDetect(needle) {
		    needle = needle.toLowerCase();
		    return navigator.userAgent.toLowerCase().indexOf(needle) !== -1;
		}
		function getVersion(nece) {
		    var arr = nece.split('.');
		    return parseFloat(arr[0] + '.' + arr[1]);
		}
        var ua = navigator.userAgent.toLowerCase();
        return {
            isWindows: /windows/.test(ua),
            isIOS: deviceDetect('iPhone') || deviceDetect('iPad') || deviceDetect('iPod'),
            isAndroid: deviceDetect('Android'),
            isUCBrowser: deviceDetect('UCBrowser'),
            isQQBrowser: deviceDetect('MQQBrowser'),
            isSafari:/.*version\/([\w.]+).*(safari).*/.test(ua),
            isWeixin: deviceDetect('MicroMessenger'),
            qqBrowserVersion: this.isQQBrowser ? getVersion(ua.split('mqqbrowser/')[1]) : 0,
            ucBrowserVersion: this.isUCBrowser ? getVersion(ua.split('ucbrowser/')[1]) : 0,
            iosVersion: this.isIOS ? parseInt(ua.match(/\s*os\s*\d/gi)[0].split(' ')[2], 10) : 0
        };
    }
	mallUtils.device = device();

	/* 常用方法 */
	mallUtils.funs = {
		preventDefault:function(ev){
			//阻止冒泡 默认事件
			ev.preventDefault && ev.preventDefault();
        	ev.stopPropagation && ev.stopPropagation();
        	return false;
		},
		unTouchMove:function(){
			/* 禁止滚屏 */
			document.addEventListener('touchmove',this.preventDefault, false);
		},
		activeTouchMove:function(){
			/* 恢复滚屏 */
			document.removeEventListener('touchmove',this.preventDefault, false);
		},
		scroll:function(callback){
			//监听窗口滚动事件
			if(callback && typeof callback === 'function') {
				window.addEventListener("scroll",callback);
			}
		},
		unscroll:function(callback){
			//解除窗口滚动事件
			window.removeEventListener("scroll",callback);
		}
	}

	/* 弹框 */
	mallUtils.layer = {
		err:function(text, time){
			//错误提示框
			layer.open({
			    content: text,
			    skin: 'msg',
			    time: time || 2
			});
		},
		alert:function(content,time,endcallback){
			//提示框自动消失
			layer.open({
			    content: content,
			    skin: 'msg',
			    time: time || 2,
			    end: endcallback
			});
		},
		confirm:function(content,yesCallback,cancelCallback){
			//确认框
			var _content = [];
			if(!!!content) {
				return false;
			}
			if(content.indexOf('&') === -1){
				_content[0] = content;
			}
			else{
				_content = content.split('&');
			}

			//成功提示框
			var _html = '';
			_html	+=		'<p class="layer-text">';
			_content.forEach(function(item){
				_html	+=		'<span class="layer-text">'+ item +'</span>';
			});
			_html	+=		'</p>';

			layer.open({
				className: 'layer-no-yes',
			    content: content,
			    btn: ['确认', '取消'],
			    shadeClose: false,
			    yes: function(){
			        layer.closeAll();
			    	mallUtils.funs.activeTouchMove();
			    	if(!!yesCallback && typeof yesCallback === 'function') {
			    		return yesCallback();
			    	}
			    }, no: function(){
			        layer.closeAll();
			    }
			});
		},
		yes:function(content,callback){
			var _content = [];
			if(!!!content) {
				return false;
			}
			if(content.indexOf('&') === -1){
				_content[0] = content;
			}
			else{
				_content = content.split('&');
			}

			//成功提示框
			var _html = '';
			_html	+=		'<p class="layer-text">';
			_content.forEach(function(item){
				_html	+=		'<span class="layer-text">'+ item +'</span>';
			});
			_html	+=		'</p>';
			//成功提示框
			layer.open({
				className: 'layer-yes',
			    content: _html,
			    shadeClose: false,
			    btn:['确定'],
			    yes:function(){
			    	layer.closeAll();
			    	mallUtils.funs.activeTouchMove();
			    	if(!!callback && typeof callback === 'function') {
			    		return callback();
			    	}
			    }
			})
		}
	};

	mallUtils.checkLoggedIn = function (context) {
		if (1 !== +localStorage.getItem('login')) {
			if (context) {
				localStorage.setItem('Q_next_url', location.hash.slice(1));
				context.$router.go({
					name: 'TaoYouUserLogin',
					query: {
					mID: localStorage.getItem('mID') || 8
					},
					replace: true
				});
			 }
			return false;
		}
		return true;
	};

	/* 请求 */
	mallUtils.http = {
		get: function(opt, successCallback){
			// if(!!!opt) {
			// 	return mallUtils.layer.err("请求参数错误")
			// }
			// if(!!!opt.method || opt.method === '') {
			// 	console.error(opt);
			// 	return mallUtils.layer.err("接口参数错误")
			// }

			//opt.openid = userInfo.openid;

			Vue.http
			.get(mallUtils.interfaceApi, opt)
			.then(function (res) {
		      	var data = res.data;
		      	if(data.code === 10000) {
		      		//console.log(data.return);
		      		return successCallback(data.return || {})
		      	}
		      	else{
					return mallUtils.layer.err(data.msg)
		      	}
		      }, function (res, data, status) {
		          mallUtils.layer.err("服务器繁忙")
		    });

		},
		weixin: function(successCallback){
			Vue.http
			.get('微信信息接口',{ url: location.href})
			.then(function (res) {
		      	var data = res.data;
		      	successCallback(data);

		      }, function (res, data, status) {
		          mallUtils.layer.err("服务器繁忙")
		    });
		}
	};

	//微信
	mallUtils.weixin = {
		init:function(callback){
			mallUtils.http.weixin(function(res){
				wx.config({
					debug: false,
				    appId: res.appId, // 必填，公众号的唯一标识
				    timestamp: res.timestamp, // 必填，生成签名的时间戳
				    nonceStr: res.nonceStr, // 必填，生成签名的随机串
				    signature: res.signature,// 必填，签名，见附录1
				    jsApiList: [	// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'hideMenuItems',
              'showMenuItems',
              "chooseImage",
              "previewImage",
              "uploadImage",
              "downloadImage",
              "chooseWXPay"
				    ]
				});

				wx.ready(function(){
					!!callback && (typeof callback === "function") && callback();
				});

				wx.error(function(res){
					console.log(JSON.stringify(res));
				});
			});


		},
		share:function(opts){
			var _opts = opts || {};
		    _opts.icon = _opts.icon || 'http://res2.caiguo.com/images/logo.jpg';
		    _opts.link = _opts.link || 'http://m.igapper.com';
		    _opts.title= _opts.title || "间隔年，遇见真实的自己";
		    _opts.desc = _opts.desc || "间隔年，闻见自由的味道，遇见真实的自己";

 			//console.log("分享："+ JSON.stringify(_opts));

			wx.onMenuShareTimeline({
			    title: 	_opts.title, // 分享标题
			    link: 	_opts.link, // 分享链接
			    imgUrl: _opts.icon, // 分享图标
			    success: function () {
			        // 用户确认分享后执行的回调函数
			        mallUtils.layer.alert("分享成功");
			    },
			    cancel: function () {
			        // 用户取消分享后执行的回调函数
			        //mallUtils.layer.alert("分享已取消");
			    }
			});


			//分享给朋友
	        wx.onMenuShareAppMessage({
	            title: 	_opts.title, // 分享标题
			    desc: 	_opts.desc, // 分享描述
			    link: 	_opts.link, // 分享链接
			    imgUrl: _opts.icon, // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	            success: function () {
	               mallUtils.layer.alert("分享成功");
	            },
			    cancel: function () {
			        // 用户取消分享后执行的回调函数
			        //mallUtils.layer.alert("分享已取消");
			    }
	        });

	        //分享到QQ
	        wx.onMenuShareQQ({
	            title: 	_opts.title, // 分享标题
			    desc: 	_opts.desc, // 分享描述
			    link: 	_opts.link, // 分享链接
			    imgUrl: _opts.icon, // 分享图标
	            success: function () {
	               mallUtils.layer.alert("分享成功");
	            },
	            cancel: function () {
	               // 用户取消分享后执行的回调函数
	               //mallUtils.layer.alert("分享已取消");
	            }
	        });
		},
		chooseImage:function(){
			//从相册中选择
			this.init(function(){
				wx.chooseImage({
				    count: 1, // 默认9
				    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) {
				        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				        wx.uploadImage({
						    localId:  localId, // 需要上传的图片的本地ID，由chooseImage接口获得
						    isShowProgressTips: 1, // 默认为1，显示进度提示
						    success: function (res) {
						        var serverId = res.serverId; // 返回图片的服务器端ID
						        window.userInfo.user_avator = serverId;
						        return serverId;
						    }
						});
				    }
				});
			})
		}
	}

	//时间格式
	mallUtils.date = {
		format:function(dateStr,fmt){
			var d = "";
			if(arguments.length == 1){
			    fmt = dateStr;
			    d = new Date();
			}
			else{
			    d = new Date(dateStr);
			}
			  var o = {
			    "M+" : d.getMonth()+1,                 //月份
			    "d+" : d.getDate(),                    //日
			    "h+" : d.getHours(),                   //小时
			    "m+" : d.getMinutes(),                 //分
			    "s+" : d.getSeconds(),                 //秒
			    "S"  : d.getMilliseconds()             //毫秒
			  };
			  if(/(y+)/.test(fmt)){
			    fmt=fmt.replace(RegExp.$1, (d.getFullYear()+"").substr(4 - RegExp.$1.length));
			  }
			  for(var k in o){
			     if(new RegExp("("+ k +")").test(fmt)){
			        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			     }
			  }
			  return fmt;
		}
	}
	window.mallUtils = mallUtils;
})();

// 微信分享
(function() {
  "use strict";
  // TODO
});

window.mobileCheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
