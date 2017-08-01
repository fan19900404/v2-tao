<!-- author: dreamapple -->
<template>
  <div v-show="show" transition="action" class="mask">
    <div class="intro">
      <p class="intro-text"><span class="intro-text-number">1.</span>活动期间，iPhone7 128G、iPhone7 Plus128G、移动300元充值卡、移动500元充值卡的中奖用户将获得当期消费本金的100%（以淘币发放），相当于0元就购！</p>
      <p class="intro-text"><span class="intro-text-number">2.</span>不中即返，畅享夺宝激情！若您在活动期间内的上述商品中：5元≤单笔消费≤29元却未中奖就有50%的几率获得1元的淘币返利，若单笔消费≥30却未中奖立得2~15元的淘币返利！</p>
      <p class="intro-text"><span class="intro-text-number">3.</span>淘币红包将在活动奖品揭晓后派发，因网络延迟等原因可能会延迟1-2分钟到账，请耐心等待。</p>
      <p class="intro-text"><span class="intro-text-number">4.</span>仅限氧气用户参与，先领取活动资格才能在活动期间获得奖励。</p>
      <p class="intro-text"><span class="intro-text-number">5.</span>每人最多可购买商品总需参与人次的15%。</p>
      <p class="intro-text"><span class="intro-text-number">6.</span>单个用户每件商品每期只可参与一次。</p>
      <p class="intro-text"><span class="intro-text-number">7.</span>如发现用户通过作弊行为（包括但不限于使用刷单软件、刷单设备等）参与本次活动，淘游夺宝有权取消用户的中奖资格，不返还本金或取消所得红包。</p>
      <p class="intro-text"><span class="intro-text-number">8.</span>如有疑问，请联系客服咨询。</p>
      <p class="intro-text"><span class="intro-text-number">9.</span>如若活动期间内未达到“总需参与人次”的商品，您可通过客服申请退款，所退款项将在3个工作日内，退还至您的账户中。</p>
      <p class="intro-text"><span class="intro-text-number">10.</span>本活动最终解释权归淘游夺宝所有。</p>


      <div @click="close" class="close-rule">
        <div class="close-rule-arrow">︿</div>
        <div class="close-rule-text">规则</div>
      </div>
    </div>
  </div>
</template>

<script>
  'use strict';
  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      close() {
        this.show = false;
      }
    }
  }
</script>

<style scoped>
  .mask {
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 200;
  }
  .action-transition .intro {
    transition: all .3s linear;
    opacity: 1;
    margin-top: 0;
    padding-bottom: 4rem;
    background-color: #ffdede;
  }
  .action-enter .intro {
    opacity: 0;
    margin-top: -30rem;
  }
  .action-leave .intro {
    opacity: 0;
    margin-top: -30rem;
  }
  .intro {
    position: relative;
    box-sizing: border-box;
    padding: 3rem 2.4rem 0 3.9rem;
  }
  .intro-text {
    position: relative;
    color: #984646;
    font-size: 1.2rem;
    line-height: 1.2rem;
    margin-top: 1.2rem;
  }
  .intro-text-number {
    position: absolute;
    width: 1.5rem;
    left: -1.5rem;
  }
  .close-rule {
    position: absolute;
    bottom: 0;
    right: 1.5rem;
    width: 3.9rem;
    height: 4.4rem;
  }
  .close-rule-arrow,
  .close-rule-text {
    background-color: #ff4a4a;
    color: #fff;
  }
  .close-rule-arrow {
    text-align: center;
    font-weight: 600;
    font-size: 1.6rem;
    height: 1.7rem;
    border-top-left-radius: 3.9rem;
    border-top-right-radius: 3.9rem;
  }
  .close-rule-text {
    text-align: center;
    height: 2.7rem;
    font-size: 1.2rem;
    line-height: 2rem;
  }
</style>
