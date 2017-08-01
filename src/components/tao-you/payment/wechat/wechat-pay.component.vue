<template>
  <div @click.self="closeMask" :class="{'payment-mask-hide': !isShow, 'payment-mask-show': isShow}" class="payment-mask">
    <div class="payment-container">
      <!--<div class="payment-container__title">支付订单</div>-->
      <div class="payment-container__img-container">
        <div id="JS-payment-img" class="payment-container__img">
          <img :src="qrcode">
        </div>
      </div>
      <div class="payment-container__info"><span class="payment-price">￥{{price}}</span>&nbsp;&nbsp; 微信扫码 完成支付</div>
    </div>
  </div>
</template>
<script>
'use strict';
export default {
  props: {
    // 是否显示弹层
    isShow: {
      type: Boolean,
      default: false
    },

    // 支付二维码
    qrcode: {
      type: String,
      default: ''
    },

    // 订单金额
    price: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    closeMask() {
      this.isShow = false;
      this.$root.$broadcast('pay-cancel');
    }
  }
}
</script>
<style lang="scss" scoped>
.payment-mask-hide {
  z-index: -1;
  opacity: 0;
}

.payment-mask-show {
  z-index: 30;
  opacity: 1;
}

.payment-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-container {
  width: 2.2rem;
}

.payment-container__title {
  color: #ffffff;
  font-size: .24rem;
  line-height: .24rem;
  text-align: center;
}

.payment-container__img-container {
  width: 2.2rem;
  height: 2.2rem;
  margin: .3rem 0;
  padding: .15rem;
  background-color: #ffffff;
  box-sizing: border-box;
}

.payment-container__img {
  margin: 0;
  width: 1.9rem;
  height: 1.9rem;
  display: block;
}

.payment-container__info {
  color: #ffffff;
  font-size: .12rem;
  line-height: .12rem;
  text-align: center;
}

.payment-price {
  font-size: 1.35em;
}
</style>