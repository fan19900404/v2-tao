<!-- author: dreamapple -->
<template>
  <div v-show="showGift" class="mask dr-flex">
    <div class="gift dr-flex">
      <button @click="hideGift" class="close-btn"></button>
      <div v-link="'/welfare/taodou'" class="gift-coupon dr-flex">
        <div class="gift-coupon-text">
          <!--<span class="special-coupon">1元夺宝券</span>-->
          <!--<span class="limit">(满5可用)</span>-->
          <div class="new-coupon-text coupon-color">20元新人礼包</div>
          <div class="see coupon-color">点击查看</div>
        </div>
      </div>
      <p class="gift-text">夺宝券已送至您的账户<br>祝您夺宝愉快！</p>
      <div @click="getCoupon" class="gift-btn"></div>
    </div>
  </div>
</template>

<style scoped>
  .mask {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    z-index: 300;
    align-items: center;
  }
  .gift {
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin-top: -8rem;
    height: 38.7rem;
    width: 100%;
    background-image: url('/oldStatic/images/index/gift.png');
    background-size: 100% 100%;
    background-position: center;
  }
  .gift-btn {
    width: 52%;
    height: 4.8rem;
    margin-bottom: 2.25rem;
    background-image: url('/oldStatic/images/index/gift-btn.png');
    background-size: 100% 100%;
    background-position: center;
  }
  .gift-coupon {
    margin-bottom: 1.5rem;
    height: 5.6rem;
    width: 47.2%;
    background-image: url('/oldStatic/images/index/gift-coupon.png');
    background-size: 100% 100%;
    background-position: center;
    justify-content: center;
    align-items: center;
  }
  .gift-text {
    margin-bottom: 2rem;
    width: 42%;
    font-size: 1.2rem;
    line-height: 1.2rem;
    color: #ffaa57;
    text-align: center;
  }
  .gift-coupon-text {
    color: #ffde97;
    padding: 1rem 1.5rem;
  }
  .gift-coupon-text .special-coupon {
    font-size: 1.7rem;
  }
  .gift-coupon-text .limit {
    font-size: 1rem;
  }
  .coupon-color {
    color: #ffde97;
    text-align: center;
  }
  .new-coupon-text {
    font-size: 1.7rem;
  }
  .see {
    font-size: .9rem;
  }
  .close-btn {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border: none;
    outline: none;
    background-image: url('/oldStatic/images/index/gift-close.png');
    background-size: 95% 95%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: transparent;
    border-radius: 50%;
    right: 1rem;
    top: 9rem;
  }
</style>

<script>
  'use strict';
  export default {
    props: {
      showGift: {
        type: Boolean
      }
    },
    methods: {
      getCoupon() {
        this.$dispatch('home-gift-coupon');
      },
      hideGift() {
        this.$dispatch('hide-gift');
      }
    }
  }
</script>
