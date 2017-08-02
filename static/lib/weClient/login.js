/**
 * 微端自动登录
 * 
 */
;
(function() {

  function fn(vue) {
    var isWeClient = getQueryString('app');
    if (isWeClient==1) {
      window.dsBridge && window.dsBridge.call("getSign", {}, function(res) {
        var params = {};
        if (typeof res == 'string') {
          try {
            params = JSON.parse(res);
            console.log(params);
          } catch (ex) {
            console.log(ex);
          }
        }
        Vue.ClientHttp(this).GET({ sign: params.sign, time: params.time, mac: params.mac, v: new Date().getTime() }, Vue.ClientUrl.weclient_auto_login).then((result) => {
          console.log('result');
          console.log(result);
          console.log(result.code);
          if (result.code == 10000) {
            localStorage.setItem('login', 1);
            localStorage.setItem('uID', result.result.userId);

            if (getQueryString('gameID')) {
              let gameID = getQueryString('gameID');
              let mID = getQueryString('mID');
              let url = localStorage.getItem('runningURl') + Vue.ClientUrl.special_game_url + '?gameID=' + gameID + '&mID=' + mID;
              console.log(url);
              window.location.replace(url);
              // history.replaceState({}, "play game", url);
            }
          }else {
            location.href = `${location.origin}/#/tao-you/user-login?app=1&mID=${localStorage.getItem('mID')}&sign=${params.sign}&time=${params.time}&mac=${params.mac}`;
           }
        });
      });
      localStorage.setItem('app', 1);
    } else {
      localStorage.setItem('app', 0);
    }

    function getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var pos = window.location.href.indexOf('?');
      var xx = window.location.href.substr(pos);
      var r = xx.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
  }

  if (typeof exports == "object") {
    module.exports = fn;
  } else if (typeof define == "function" && define.amd) {
    define([], function() {
      return fn;
    })
  } else if (window.Vue) {
    Vue.use(fn);
  }
})();