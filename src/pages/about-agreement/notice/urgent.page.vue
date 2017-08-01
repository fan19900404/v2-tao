<template>
  <!-- author: dreamapple -->
  <div class="notice">
    <h2 class="title">活动调整通知</h2>
    <p class="info">“0元抢购iPhone7”将从2016年12月15日0点起，对以下活动内容做出如下调整，请您知晓：</p>
    <p class="detail">1、活动时间将调整为12月08日0点-1月28日0点。</p>
    <p class="detail">2、在活动时间结束后，如若未达到“总需参与人次”的商品，您可通过客服申请退款，所退款项将在3个工作日内，退还至您的账户中。</p>
    <a class="link" href="http://1.lly800.com/#/activity/zero?actID=6">我知道了</a>
  </div>
</template>

<script>
  'use strict';
  export default {
    mounted() {
      // $('body').css('background-color', '#ffdede');
    }
  }
</script>

<style scoped lang="scss">
  .notice {
    padding: 1rem;
    font-size: 1.3rem;
    font-weight: 400;
  }
  .title {
    text-align: center;
    color: #ff4a4a;
    font-size: 1.6rem;
  }
  .info {
    text-indent: 1rem;
    margin-top: .5rem;
  }
  .detail {
    margin-top: .5rem;
  }
  .link {
    display: block;
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    width: 80%;
    border-radius: 1rem;
    background-color: #ff4a4a;
    color: #ffffff;
    margin: 2rem auto;
    font-size: 1.4rem;
    font-weight: 600;
  }
</style>
