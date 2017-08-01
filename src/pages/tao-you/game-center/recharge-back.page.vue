<template>
  <p>支付取消</p>
</template>

<script>
  'use strict';
  export default {
    methods: {
      // 支付取消
      notifyCancelPay() {
        console.log('111');
        var win = window.top;
        win.postMessage(
          {action: 'game:recharge@cancel'},
          "*"
        )
      },
      // 跳转到首页
      backHome(flag) {
        // 返回到淘友助手的首页
        this.$router.push({
          name: 'TaoYouHome'
        })
      }
    },
    mounted() {
      this.notifyCancelPay();
    },
    mounted() {
      // 通知外层窗口支付取消
//      setTimeout(() => {
//        this.backHome();
//      }, 3000);
//      this.notifyCancelPay();
    }
  }
</script>
