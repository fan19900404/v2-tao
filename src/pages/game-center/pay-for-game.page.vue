<template>
  <app-header :title="'游戏支付'" :type="type"></app-header>
  <div class="time-left">
    支付剩余时间: <span class="c-main">{{time.m1}}{{time.m2}}:{{time.s1}}{{time.s2}}</span>
  </div>

  <div class="buy-game-info dr-flex">
    <div class="game-img-container">
      <img class="game-img" :src="orderInfo.gameIcon">
    </div>
    <div class="game-text flex-1">
      <div class="game-name">{{orderInfo.gameName}}</div>
      <div class="game-money">¥: <span class="c-main">{{orderInfo.gameInitMoney}}</span></div>
    </div>
  </div>

  <div class="goods-info">
    <div class="goods-msg">
      <div class="per-msg-title dr-flex">
        <div class="name">游戏券抵扣</div>
        <div @click="toggleCoupon" class="detail c-898989 flex-1">
          <span v-show="!couponValue.value">{{couponInfo}}</span>
          <span v-show="couponValue.value">使用<i class="xieyi-c">{{couponInfo}}元</i>游戏券</span>
          <span v-show="!showCoupon"><i class="icon-more"></i></span>
          <span v-show="showCoupon"><i class="icon-more_unfold"></i></span>
        </div>
      </div>
      <div v-if="couponStatus"
           v-show="showCoupon"
           transition="expand"
           id="J-coupon-container"
           class="coupon-container">
        <div v-for="v in couponTypes" track-by="$index" class="per-msg coupon dr-flex">
          <!--<div class="coupon-name flex-1">{{v.value}}元夺宝券</div>-->
          <div class="coupon-name flex-1">{{v.ticketName}}</div>
          <i class="hidden-radio-container radio-show icon" :class="{
      'active': v === couponValue,
      'not-active': v != couponValue
      }">
            <input :value="v" v-model="couponValue" class="hidden-radio" type="radio">
          </i>
        </div>
      </div>
    </div>
    <div class="attention">
      <p class="order-id">订单号：{{orderInfo.orderID}}</p>
      <div class="agree flex">
        <label class="agree-check" :class="{
              'agree-check-active': agree,
              'agree-check-normal': !argee
          }">
          <input class="agree-check-input" type="checkbox" v-model="agree">
        </label>
        <p>我已阅读并同意<span v-link="{name: 'ServiceAgreement'}" class="xieyi-c">《淘游助手服务协议》</span></p>
      </div>
    </div>
  </div>

  <div class="select-taobi dr-flex">
    <!--<i class="pay-icon-tb taobi-logo-tb"></i>-->
    <div class="flex-1">
      <div>使用淘币余额抵扣</div>
      <!--<div class="pay-tip-tb">qwe</div>-->
    </div>
    <span class="taobi-num-tb">{{tbNum}}淘币</span>
    <i class="hidden-radio-container-tb radio-show-tb icon" :class="{
          'active-tb': choose_status === true_value,
          'not-active-tb': choose_status === false_value
        }">
      <input v-model="choose_status"
             :true-value="true_value"
             :false-value="false_value" class="hidden-radio-tb" type="checkbox">
    </i>
  </div>

  <div class="choose-method">
    <app-payment-method choose="aliPay"
                        :show_tip="show_tip"
                        :method_list="methodsList"
                        :tao-bi="fakerTaoBi"
                        :type="type"></app-payment-method>
  </div>
  <div class="btn-container">
    <div @click="pay" class="btn">{{buy_btn_msg}}</div>
  </div>

  <!-- common alert -->
  <common-alert :type="alertType"
                :show-alert="showAlert"
                :alert-msg="alertMsg"
                :alert-status="alertStatus"></common-alert>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppPaymentMethod from '../../components/feature/about-money-business/app-payment-method';
  import CommonAlert from '../../components/common-alert/common-alert.component';
  import AppHeader from '../../components/common-layout/header.component';
  import { buyGoodsUpdateTaoBi} from '../../vuex/actions';

  export default {
    components: {
      AppPaymentMethod,
      CommonAlert,
      AppHeader
    },
    data() {
      return {
        totalTime: 0,
        time: {
          m1: 0,
          m2: 0,
          s1: 0,
          s2: 0
        },
        timer: 'timer',
        couponTypes: [],
        couponValue: {
          value: 0,
          ticketID: null
        },
        agree: true,
        // 0 => 无可使用 1 => 未使用, 2 => 选择使用
        couponStatus: 1,
        showCoupon: false,
        fakerTaoBi: this.$route.params.taoBi,
        // 支付方法
        methodsList: ['aliPay', 'unionPay', 'taobiPay'],
        type: 'aliPay',
        // 弹窗
        alertType: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: '',
        // 夺宝券是否使用
        reduceMoney: 0,
        // 订单信息
        orderInfo: {},
        // 购买按钮的文字
        buy_btn_msg: '确认购买',
        // 是否显示充值的项目的提示
        show_tip: true,
        // 是否使用淘币支付
        true_value: 1,
        false_value: 0,
        usetb: 0,
        choose_status: 0,
        tbNum: 0
      }
    },
    computed: {
      couponInfo() {
        var text = '';
        if(0 === this.couponTypes.length) {
          text = '无可用券';
        }
        else {
          text = '未选择';
          if(this.couponValue.value > 0) {
            text = this.couponValue.value;
          }
        }
        return text;
      }
    },
    vuex: {
      getters: {
        taoBi: ({pay}) => pay.taoBi
    },
    actions: {
      buyGoodsUpdateTaoBi
    }
  },
  methods: {
    pay() {
      var that = this;
      var payType;
      if(that.agree) {
        var query = {};
        if('aliPay' === that.type || 'unionPay' === that.type) {
          that.buy_btn_msg = '获取支付链接中...';
          if('aliPay' === that.type) {
            payType = 1;
          }
          else if('unionPay' === that.type) {
            payType = 4;
          }
          query = {
            orderid: that.$route.query.orderID,
            ticketID: that.couponValue.ticketID,
            type: 4,
            payType: payType, // 淘游助手支付的标识,
            usetb: that.choose_status
          };
          Vue.ClientHttp().GET(query, Vue.ClientUrl.tao_game_pay_url)
            .then(function(res) {
              if(10000 == res.code) {
                that.buy_btn_msg = '前去支付...';
                window.location.href = res.result.payurl;
              }
              else {
                // 处理失败情况
                that.showAlert = true;
                that.alertMsg = '消息提示';
                that.alertStatus = res.msg;
              }
            });
        }
        else if('taobiPay' === that.type) {
          query = {
            type: 4,
            // 淘币支付标志
            payType: 5,
            orderID: that.$route.query.orderID,
            ticketID: that.couponValue.ticketID,
            usetb: that.choose_status
          };
          Vue.ClientHttp().GET(query, Vue.ClientUrl.taobipay_method)
            .then(function(res) {
              if(10000 == res.code) {
                  // 支付成功
                  window.location.href = res.url;
//                window.location.href = "/#/pay/return/" + that.$route.params.tradeNo;
              }
              else {
                // 处理失败情况
                that.showAlert = true;
                that.alertMsg = '消息提示';
                that.alertStatus = res.msg;
              }
            });
        }
        else {
          // TODO
        }
      }
      else {
        that.showAlert = true;
        that.alertMsg = '消息提示';
        that.alertStatus = '请同意淘游助手服务条款';
      }
    },
    updateTaoBi(num) {
      // 获取初始的淘币
      this.buyGoodsUpdateTaoBi(num);
    },
    toggleCoupon() {
      // 隐藏显示夺宝券
      if(this.couponTypes.length > 0) {
        this.showCoupon = !this.showCoupon;
      }
    },
    // 获取订单的信息
    getOrderInfo() {
      let query = {
        orderID: this.$route.query.orderID
      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.tao_game_order_info)
        .then((res) => {
          if(10000 === res.code) {
            this.orderInfo = res.result;
            this.couponTypes = res.result.ticketList || [];
            this.totalTime = res.result.limitTime;

            this.tbNum = +res.result.taoBi < +res.result.gameInitMoney ? +res.result.taoBi : +res.result.gameInitMoney;

            this.timer = setInterval(() => {
              if(this.totalTime > 0) {
                this.totalTime--;
                this.time.m1 = +parseInt(this.totalTime / 600);
                this.time.m2 = +parseInt(this.totalTime / 60 % 10);
                this.time.s1 = +parseInt(this.totalTime % 60 / 10);
                this.time.s2 = +parseInt(this.totalTime % 60 % 10);
              }
            }, 1000);
          }
          else {
            // 接口出错
            this.showAlert = true;
            this.alertStatus = res.msg;
          }
        })
    }
  },
  mounted() {
    $("body").css({"background-color":"#f8f8f8"});

//    this.updateTaoBi(this.$route.params.taoBi);

    this.getOrderInfo();
  },
  destroyed() {
    clearInterval(this.timer);
  }
  }
</script>

<style scoped>

  .buy-game-info {
    height: 7.9rem;
    padding: 0 1.6rem 0 1.6rem;
    margin-bottom: 1rem;
    background-color: #fff;
    align-items: center;
  }
  .game-img-container {
    width: 5.4rem;
    height: 5.4rem;
    border-radius: .5rem;
    margin-right: 1.3rem;
  }
  .game-img {
    display: block;
    width: 5.4rem;
    height: 5.4rem;
    border-radius: .5rem;
  }
  .game-name {
    font-size: 1.4rem;
    line-height: 1.4rem;
  }
  .game-money {
    margin-top: .8rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
    color: #898989;
  }

  .xieyi-c {
    color: #ff4a4a;
  }
  .attention {
    padding: 1.6rem 1.6rem 1.2rem 1.6rem;
  }
  .order-id {
    font-size: 1.4rem;
  }
  .agree {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
  .agree-check {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 1rem;
    position: relative;
  }
  .agree-check-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .agree-check-normal {
    border: 1px solid #dfdfdf;
  }
  .agree-check-active {
    border: 1px solid #ff4a4a;
    background-image: url('/static/images/game-center/pay-check.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
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
  .time-left {
    background-color: #f8f8f8;
    text-align: center;
    height: 3.7rem;
    line-height: 3.7rem;
    font-size: 1.4rem;
  }
  .choose-method {
    background-color: #fff;
  }
  .btn-container {
    box-sizing: border-box;
    height: 8rem;
    padding: 1.8rem 1.6rem;
  }
  .btn-container .btn {
    width: 100%;
    height: 100%;
    background-color: #ff4a4a;
    color: #fff;
    font-size: 1.8rem;
    border-radius: .5rem;
    text-align: center;
    line-height: 4.8rem;
  }
  .goods-info {
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 1rem;
    background-color: #fff;
  }
  .goods-msg {
    font-size: 1.4rem;
  }
  .per-msg-title {
    height: 4.5rem;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    border-bottom: 1px solid #dfdfdf;
    align-items: center;
  }
  .per-msg:not(:last-child) {
    height: 4.5rem;
    margin-left: 1.6rem;
    padding-right: 1.6rem;
    border-bottom: 1px solid #dfdfdf;
    align-items: center;
  }
  .per-msg:last-child {
    height: 4.5rem;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    border-bottom: 1px solid #dfdfdf;
    align-items: center;
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
  .expand-transition {
    transition: all .3s ease;
    overflow: hidden;
  }

  .expand-enter, .expand-leave {
    height: 0;
    opacity: 0;
  }

  .select-taobi {
    height: 4.6rem;
    font-size: 1.4rem;
    border-top: 1px solid #dfdfdf;
    background-color: #ffffff;
    padding-left: 1.6rem;
    margin-bottom: 1rem;
    align-items: center;
  }

  .hidden-radio-container-tb {
    position: relative;
  }

  .radio-show-tb {
    width: 2.4rem;
    height: 2.4rem;
    line-height: 2.4rem;
    text-align: center;
    border-radius: 50%;
    margin-right: 1.6rem;
  }

  .hidden-radio-tb {
    position: absolute;
    border: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: transparent;
    opacity: 0;
  }

  .pay-icon-tb {
    width: 2.2rem;
    height: 2.2rem;
    margin-right: 1rem;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .pay-tip-tb {
    font-size: 1.1rem;
    color:#898989;
    line-height: 1;
  }

  .taobi-num-tb {
    color: #ff4a4a;
    margin-right: 1rem;
  }

  .active-tb {
    background: #ff4a4a;
    border: 1px solid #ff4a4a;
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
    color: #fff;
  }

  .not-active-tb {
    border: 1px solid #dfdfdf;
  }

  .active-tb:before {
    content: "\e5ca";
    color: #fff;
  }
  .pay-icon-tb {
    width: 2.2rem;
    height: 2.2rem;
    margin-right: 1rem;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .taobi-logo-tb {
    background-image: url(/static/images/taobiPay.png);
  }
</style>
