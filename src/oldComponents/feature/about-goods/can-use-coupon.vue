<template>
  <div v-if="show" class="coupon-layer dr-flex">
    <div class="goods-info">
      <div class="goods-msg">
        <div class="per-msg for-close flex">
          <div class="name">您可以使用的夺宝券</div>
          <div class="close-container">
            <span @click="closeAlert" class="close"></span>
          </div>
          <!--<div @click="toggleCoupon" class="detail c-898989 flex-1">-->
            <!--{{couponInfo}}-->
            <!--<span v-show="false"><i class="icon icon-down icon-keyboard_arrow_down"></i></span>-->
            <!--<span v-show="false"><i class="icon icon-guide"></i></span>-->
          <!--</div>-->
        </div>
        <div v-if="this.couponStatus > 0"
             transition="expand"
             class="coupon-container">
          <div v-for="v in couponList" track-by="$index" class="per-msg coupon flex">
            <div class="coupon-name flex-1">{{v.name}}</div>
            <i class="hidden-radio-container radio-show icon" :class="{
          'active': couponValue === v.ticketID,
          'not-active': couponValue !== v.ticketID
        }">
              <input @click="choose($index)" :value="v.ticketID" v-model="couponValue"  class="hidden-radio" type="radio">
            </i>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <div @click="useCoupon" :class="{'btn-normal': !couponValue, 'btn-active': couponValue}" class="btn">使用夺宝券</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .for-close {
    position: relative;
    align-items: center;
  }
  .close-container {
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 1.45rem;
    right: -1rem;
  }
  .close {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .close::before,
  .close::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 1.6rem;
    top: 0.6rem;
    left: -1rem;
    background: #dfdfdf;
  }
  .close::after {
    transform: rotate(-45deg);
  }
  .close::before {
    transform: rotate(45deg);
  }
  .coupon-layer {
    top: 0;
    left: 0;
    position: fixed;
    z-index: 300;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
  }
  .attention {
    padding: 1.6rem 1.6rem 1.2rem 1.6rem;
  }
  .order-id {
    font-size: 1.4rem;
  }
  .active {
    background: #ff4a4a;
    border: 1px solid #ff4a4a;
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
    color: #fff;
  }
  .not-active {
    border: 1px solid #dfdfdf;
  }
  .active:before {
    content: "\e5ca";
    color: #fff;
  }
  .hidden-radio-container {
    position: relative;
  }
  .radio-show {
    width: 2.4rem;
    height: 2.4rem;
    line-height: 2.4rem;
    text-align: center;
    border-radius: 50%;
  }
  .hidden-radio {
    position: absolute;
    border: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: transparent;
    opacity: 0;
  }
  .c-main {
    color: #ff4a4a;
  }
  .c-898989 {
    color: #898989;
  }
  .goods-info {
    border-radius: .5rem;
    width: 90%;
    background-color: #fff;
  }
  .goods-msg {
    font-size: 1.4rem;
  }
  .coupon-container {
    max-height: 30rem;
    overflow: auto;
  }
  .per-msg {
    height: 4.5rem;
    margin-left: 1.6rem;
    margin-right: 1.6rem;
    border-bottom: 1px solid #dfdfdf;
  }
  .name {
    color: #898989;
  }
  .detail {
    text-align: right;
  }
  .icon-down,.icon-guide {
    font-size: 2rem;
    color: #898989;
  }
  .btn-container {
    box-sizing: border-box;
    padding: 1rem 1.6rem;
  }
  .btn {
    height: 4.3rem;
    border-radius: .5rem;
    color: #fff;
    line-height: 4.3rem;
    font-size: 1.8rem;
    text-align: center;
  }
  .btn-normal {
    background-color: #bbbbbb;
  }
  .btn-active {
    background-color: #ff4a4a;
  }
  /*.expand-transition {*/
    /*transition: all .3s ease;*/
    /*overflow: hidden;*/
  /*}*/
  /*.expand-enter, .expand-leave {*/
    /*height: 0;*/
    /*opacity: 0;*/
  /*}*/
</style>

<script>
  'use strict';

  export default {
    props: [
      'show',
      'couponList',
      'ticketId'
    ],
    components: {
    },
    data() {
      return {
        couponValue: null,
        // 0 => 无可使用 1 => 未使用, 2 => 选择使用
        couponStatus: 1,
        perTicketInfo: {},
        // 减少的钱
        reduceMoney: 0
      }
    },
    methods: {
      choose(index) {
        this.perTicketInfo = this.couponList[index];
        this.reduceMoney = this.couponList[index].reduceMoney;
      },
      closeAlert() {
        this.show = false;
        this.$dispatch('coupon-close', {
          ticketId: null,
          canUse: 0,
          ticketInfo:{
            name: null
          },
          reduceMoney: this.reduceMoney
        });
        this.couponValue = null;
        this.reduceMoney = 0;
      },
      useCoupon() {
        this.show = false;
        this.$dispatch('coupon-close',{
          ticketId: this.couponValue,
          ticketInfo: this.perTicketInfo,
          canUse: 1,
          reduceMoney: this.reduceMoney
        });
        this.couponValue = null;
        this.reduceMoney = 0;
      }
    },
    mounted() {
      var that = this;
      $("body").css({"background-color":"#f8f8f8"});
    },
    destroyed() {
      $("body").css({"background-color":"#fff"});
    }
  }
</script>
