<script>
  'use strict';
  import Vue from 'vue';
  export default {
    props: {
      shareConfig: {
        type: Object
      }
    },
    data() {
      return {
        wxConfig: {
          appId: '', // 必填，公众号的唯一标识
          timestamp: '', // 必填，生成签名的时间戳
          nonceStr: '', // 必填，生成签名的随机串
          signature: '' // 必填，签名，见附录1
        }
      }
    },
    computed: {
      shareInfo(){
        return {
          title: this.shareConfig.title, // 分享标题
          link: this.shareConfig.link, // 分享链接
          imgUrl: this.shareConfig.imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        }
      }
    },
    methods: {
      getWeChatConfig() {
        let query = {};
        let req_url = Vue.ClientUrl.wechat_config;
        Vue.ClientHttp().GET(query, req_url)
           .then((res) => {
              if(10000 === res.code) {
                // 配置微信
                let conf = {
                  debug: true,
                  jsApiList: [
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
                    'chooseWXPay'
                  ],
                  appId: res.result.appId,
                  nonceStr: res.result.nonceStr,
                  timestamp: res.result.timestamp,
                  signature: res.result.signature
                };
                wx.config(conf);
                // 进行ready操作
                wx.ready(function() {
                  // TODO
                });
//                console.log(this.shareInfo);

                let simpleShareInfo = {
                  title: '', // 分享标题
                  link: '', // 分享链接
                  imgUrl: '', // 分享图标
                  success: function () {
                    // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                    // 用户取消分享后执行的回调函数
                  }
                };
                let shareInfo = Object.assign({
                  desc: ''
                }, simpleShareInfo);
                // 分享到朋友圈
                wx.onMenuShareTimeline(simpleShareInfo);
                // 分享给朋友
                wx.onMenuShareAppMessage(Object.assign({
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                }, shareInfo));
                // 分享到QQ
//                wx.onMenuShareQQ(shareInfo);
                // 分享到腾讯微博
//                wx.onMenuShareWeibo(shareInfo);
                // 分享到QQ空间
//                wx.onMenuShareQZone(shareInfo);
              }
              else {
                // TODO
              }
           });
      }
    },
    mounted() {
      // TODO
    },
    mounted() {
      // 获取微信的配置
      this.getWeChatConfig();
    }
  }
</script>

<template>
  <div class="share"></div>
</template>

<style scoped lang="scss">
  .share {
    display: none;
  }
</style>
