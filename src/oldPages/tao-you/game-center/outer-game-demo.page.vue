<template>
  <!--<button @click="triggerPayMethod">点击充值</button>
  <button @click="test">点击充值</button>-->
</template>

<script>
  'use strict';
  export default {
    methods: {
      // 触发支付的选择弹窗
      triggerPayMethod() {
        var win = window.top;
        win.postMessage({
          action: 'game:recharge@popup', // 字符串 通知外面的窗口调用支付弹窗
          gamePayInfo: {
            gameID: 123, // 我方提供
            gameName: '传奇online', // 游戏的名字
            payMoney: 0.01, // 支付的金额(以元为单位)
            orderID: 'S890hj123', // 订单号
            goodsName: '商品名称', // 商品的名字
            goodsID: '12000345', // 商品的ID
            sign: 'xjkals789798asdhkjhkjasd' // 签名
          }
        }, '*');
      },
      test() {
        try{
          var gameHelper = GameHelper();
          gameHelper.postMessage({
            gameID: 123, // 我方提供
            gameName: '传奇online', // 游戏的名字
            payMoney: 0.01, // 支付的金额(以元为单位)
            orderID: 'S890hj123', // 订单号
            goodsName: '商品名称', // 商品的名字
            goodsID: '12000345', // 商品的ID
            sign: 'xjkals789798asdhkjhkjasd' // 签名
          });
        }catch(e) {
          console.log(e)
        }
      },
      //
      handleMsgFormIframe(e) {
        // 根据消息的种类来决定不同的行为
        if(e.data.hasOwnProperty('action')) {
          switch (e.data.action) {
            // 弹出支付弹窗
            case 'game:recharge@result':
              // TODO
              console.log('用户支付成功...');
              break;
            default: break;
          }
        }
      }
    },
    mounted() {
      // 处理与iframe之间的消息往来
      if(window.addEventListener) {
        window.addEventListener("message", this.handleMsgFormIframe, false);
      }
      else {
        window.attachEvent("onmessage", this.handleMsgFormIframe);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
