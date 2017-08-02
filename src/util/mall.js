import Timeago from 'timeago.js';

export const interfaceApi = 'http://api.mall.com/'; // 接口API地址
export const regs = {
  // 常用正则
  mobile: /^1\d{10}$/, // 手机正则
};

/**
 * 获取屏幕宽度
 *
 * @export
 * @returns
 */
export function screenWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/**
 * 获取屏幕高度
 *
 * @export
 * @returns
 */
export function screenHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

// 客户端检测
/**
 * 浏览器关键字检测
 *
 * @export
 * @param {string} ua 浏览器的userAgent字符串
 * @param {string} needle 探针（关键词）
 * @returns
 */
function deviceDetect(ua, needle) {
  return ua.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
}
/**
 * 浏览器版本检测
 *
 * @export
 * @param {string} nece 浏览器版本字符串
 * @returns
 */
function getVersion(nece) {
  return parseFloat(nece.split('.').slice(0, 2).join('.'));
}

/**
 * 浏览器检测
 *
 * @export
 * @returns
 */
export function device() {
  const ua = navigator.userAgent.toLowerCase(); // 浏览器的userAgent
  const isWindows = /windows/.test(ua); // 判断是否为微软系统
  const isIOS = deviceDetect(ua, 'iPhone') || deviceDetect(ua, 'iPad') || deviceDetect(ua, 'iPod'); // 判断是否为iphone手机
  const isAndroid = deviceDetect(ua, 'Android'); // 判断是否为安卓手机
  const isUCBrowser = deviceDetect(ua, 'UCBrowser'); // 判断是否为UC浏览器
  const isQQBrowser = deviceDetect(ua, 'MQQBrowser'); // 判断是否为QQ浏览器
  const isSafari = /.*version\/([\w.]+).*(safari).*/.test(ua); // 判断是否为safari浏览器
  const isWeixin = deviceDetect(ua, 'MicroMessenger'); // 判断是否为微信浏览器
  const qqBrowserVersion = isQQBrowser ? getVersion(ua.split('mqqbrowser/')[1]) : 0; // 获取qq浏览器版本
  const ucBrowserVersion = isUCBrowser ? getVersion(ua.split('ucbrowser/')[1]) : 0; // 获取uc浏览器版本
  const iosVersion = isIOS ? parseInt(ua.match(/\s*os\s*\d/gi)[0].split(' ')[2], 10) : 0; // 获取ios版本
  return {
    isWindows,
    isIOS,
    isAndroid,
    isUCBrowser,
    isQQBrowser,
    isSafari,
    isWeixin,
    qqBrowserVersion,
    ucBrowserVersion,
    iosVersion,
  };
}

/* 常用方法 */

/* 微信这一块，以后在改
// 微信
export const weixin = {
  init(callback) {
    mallUtils.http.weixin((res) => {
      wx.config({
        debug: false,
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [
          // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'chooseWXPay',
        ],
      });

      wx.ready(() => {
        !!callback && typeof callback === 'function' && callback();
      });

      wx.error((res) => {
        console.log(JSON.stringify(res));
      });
    });
  },
  share(opts) {
    const _opts = opts || {};
    _opts.icon = _opts.icon || 'http://res2.caiguo.com/images/logo.jpg';
    _opts.link = _opts.link || 'http://m.igapper.com';
    _opts.title = _opts.title || '间隔年，遇见真实的自己';
    _opts.desc = _opts.desc || '间隔年，闻见自由的味道，遇见真实的自己';

    // console.log("分享："+ JSON.stringify(_opts));

    wx.onMenuShareTimeline({
      title: _opts.title, // 分享标题
      link: _opts.link, // 分享链接
      imgUrl: _opts.icon, // 分享图标
      success() {
        // 用户确认分享后执行的回调函数
        mallUtils.layer.alert('分享成功');
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        // mallUtils.layer.alert("分享已取消");
      },
    });

    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: _opts.title, // 分享标题
      desc: _opts.desc, // 分享描述
      link: _opts.link, // 分享链接
      imgUrl: _opts.icon, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success() {
        mallUtils.layer.alert('分享成功');
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        // mallUtils.layer.alert("分享已取消");
      },
    });

    // 分享到QQ
    wx.onMenuShareQQ({
      title: _opts.title, // 分享标题
      desc: _opts.desc, // 分享描述
      link: _opts.link, // 分享链接
      imgUrl: _opts.icon, // 分享图标
      success() {
        mallUtils.layer.alert('分享成功');
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        // mallUtils.layer.alert("分享已取消");
      },
    });
  },
  chooseImage() {
    // 从相册中选择
    this.init(() => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success(res) {
              const serverId = res.serverId; // 返回图片的服务器端ID
              window.userInfo.user_avator = serverId;
              return serverId;
            },
          });
        },
      });
    });
  },
};*/

// 时间格式
/**
 * 时间格式化
 *
 * @export
 * @param {number} [timestamp=Date.now()] 时间戳
 * @param {string} [fmt='yyyy-MM-dd'] 时间的格式
 * @returns
 * 调用：
 * var time1 = dateFormat(+new Date(),“yyyy-MM-dd”);
 * var time2 = dateFormat( 1499399860611 ,“yyyy-MM-dd hh:mm:ss”);
 */
export function dateFormat(timestamp = Date.now(), fmt = 'yyyy-MM-dd') {
  const d = new Date(timestamp);
  let fmtStr = fmt;
  const o = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    S: d.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmtStr)) {
    fmtStr = fmtStr.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmtStr)) {
      fmtStr = fmtStr.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  });
  return fmtStr;
}

/**
 * formatDateToTimeago 日期转换：将datetime时间转化成类似于***的时间描述字符串
 * @param  {string} value: 时间戳
 * @return {string} 刚刚/12秒前/3分钟前/2小时前/4天前/3周前/6月前/3年前 or 12秒后/3分钟后/2小时后/24天后/6月后/3年后
 */
export function formatDateToTimeago(value) {
  if (value === '') return '';
  return new Timeago().format(value, 'zh_CN');
}

/**
 * 段落处理，超出长度的，一律截断，并且加上“...”
 *
 * @export
 * @param {string} [str=''] 需要处理的字符串
 * @param {number} [num=50] 需要处理的字符串长度
 * @param {string} [end='...'] 尾部需要添加的文案
 * @returns {string}
 */
export function substr(str = '', num = 50, end = '...') {
  if (str.length > num) {
    return `${str.substr(num)}${end}`;
  }
  return str;
}

/**
 * 格式化金币(整数)
 *
 * @export
 * @param {number} money 金额
 * @param {number} len 长度
 * @returns {string}
 */
export function moneyWidthComma(money = 0, len = 3) {
  const moneyNum = Number(money) || 0;
  const flag = +len || 3;

  if (moneyNum < 1) {
    // 如果数字小于1,直接返回
    return money;
  }

  return [...String(moneyNum)]
    .reverse()
    .map((v, i) => (i % flag === 0 ? `${v},` : v))
    .reverse()
    .join('')
    .slice(0, -1);
}
