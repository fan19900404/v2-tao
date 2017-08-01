<template>
  <app-header :title="'游戏支付'" :type="type"></app-header>
  <div class="time-left">
    支付剩余时间: <span class="c-main">{{time.m1}}{{time.m2}}:{{time.s1}}{{time.s2}}</span>
  </div>

  <div class="buy-game-info dr-flex">
    <div class="game-img-container">
      <img class="game-img" src="https://placeholdit.imgix.net/~text?txtsize=12&txt=108%C3%97108&w=108&h=108">
    </div>
    <div class="game-text flex-1">
      <div class="game-name">超级无敌大礼包</div>
      <div class="game-money">¥: <span class="c-main">10.00</span></div>
    </div>
  </div>

  <div class="goods-info">
    <div class="goods-msg">
      <div class="per-msg flex">
        <div class="name">游戏券抵扣</div>
        <div @click="toggleCoupon" class="detail c-898989 flex-1">
          {{couponInfo}}
        </div>
      </div>
      <div v-show="showCoupon"
           transition="expand"
           id="J-coupon-container"
           class="coupon-container">
        <div class="per-msg coupon flex">
          <div class="coupon-name flex-1">{{$route.query.ticketName}}</div>
          <i class="hidden-radio-container radio-show icon" :class="{
          'active': this.$route.query.ticketId,
          'not-active': !this.$route.query.ticketId
        }">
            <input value="0" v-model="couponValue" disabled  class="hidden-radio" type="radio">
          </i>
        </div>
      </div>
    </div>
    <div class="attention">
      <p class="order-id">订单号：{{$route.params.tradeNo}}</p>
      <div class="agree flex">
        <label class="agree-check" :class="{
              'agree-check-active': agree,
              'agree-check-normal': !argee
          }">
          <input class="agree-check-input" type="checkbox" v-model="agree">
        </label>
        <p>我已阅读并同意<span v-link="'/xieyi'" class="xieyi-c">《淘游1元购服务协议》</span></p>
      </div>
    </div>
  </div>
  <div class="choose-method">
    <app-payment-method :method_list="methodsList" :tao-bi="fakerTaoBi" :type="type"></app-payment-method>
  </div>
  <div class="btn-container">
    <div @click="pay" class="btn">确认购买</div>
  </div>

  <!-- common alert -->
  <common-alert :type="alertType"
                :show-alert="showAlert"
                :alert-msg="alertMsg"
                :alert-status="alertStatus"></common-alert>

  <app-bottom-bar></app-bottom-bar>
</template>

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
    background-image: url('/static/images/pay-check.png');
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
  .per-msg {
    height: 4.5rem;
    margin-left: 1.6rem;
    padding-right: 1.6rem;
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
  .expand-transition {
    transition: all .3s ease;
    overflow: hidden;
  }

  .expand-enter, .expand-leave {
    height: 0;
    opacity: 0;
  }
</style>

<script>
  'use strict';
  import Vue from 'vue';
  import AppPaymentMethod from '../../components/feature/about-money-business/app-payment-method';
  import CommonAlert from '../../components/common/alert/common-alert';
  import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';
  import { buyGoodsUpdateTaoBi} from '../../vuex/actions';

  export default {
    components: {
      AppPaymentMethod,
      CommonAlert,
      AppHeader,
      AppBottomBar
    },
    data() {
      return {
        totalTime: 10*60,
        time: {
          m1: 1,
          m2: 0,
          s1: 0,
          s2: 0
        },
        timer: 'timer',
        couponTypes: [1, 5, 10],
        couponValue: 0,
        agree: true,
        // 0 => 无可使用 1 => 未使用, 2 => 选择使用
        couponStatus: 1,
        showCoupon: false,
        fakerTaoBi: this.$route.params.taoBi,
        // 支付方法
        methodsList: ['aliPay', 'taobiPay'],
        type: 'aliPay',
        // 弹窗
        alertType: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: '',
        // 夺宝券是否使用
        reduceMoney: 0,
        // 商品名称
        goodsName: ''
      }
    },
    computed: {
      couponInfo() {
        let text = '';
        if(0 === this.reduceMoney) {
          text = '无';
        }
        else {
          text = this.reduceMoney + '元';
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
      if(that.agree) {
        var query = {
          orderid: this.$route.params.tradeNo
        };
        if('aliPay' === that.type) {
          Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.get_pay_url)
            .then(function(res) {
              if(10000 == res.code) {
                window.location.href = res.result.payurl;
              }
              else {
                // 处理失败情况
                that.showAlert = true;
                that.alertMsg = '消息提示';
                that.alertStatus = '错误消息: ' + res.msg;
              }
            });
        }
        else if('taobiPay' === that.type) {
          Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.taobi_pay)
            .then(function(res) {
              if(10000 == res.code) {
                window.location.href = "/#/pay/return/" + that.$route.params.tradeNo;
              }
              else {
                // 处理失败情况
                that.showAlert = true;
                that.alertMsg = '消息提示';
                that.alertStatus = '错误消息: ' + res.msg;
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
        that.alertStatus = '请同意一元购服务条款';
      }
    },
    updateTaoBi(num) {
      // 获取初始的淘币
      this.buyGoodsUpdateTaoBi(num);
    },
    toggleCoupon() {
      // 隐藏显示夺宝券
      if(+this.$route.query.canUse && (this.$route.query.ticketName)) {
        this.showCoupon = !this.showCoupon;
      }
    },
    // 获取订单的信息
    getOrderInfo() {
      var that = this;
      var query = {
        number: this.$route.params.number,
        order: this.$route.params.tradeNo
      };
      Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.order_info)
        .then(function(res) {
          if(10000 == res.code) {
            that.reduceMoney = res.result.reduceMoney;
            that.goodsName = res.result.name;
            that.totalTime = res.result.rectime;
          }
          else {
            // 订单失效
            that.showAlert = true;
            that.alertMsg = '消息提示';
            that.alertStatus = res.msg;
          }
        })
    }
  },
  mounted() {
    $("body").css({"background-color":"#f8f8f8"});

    console.log(this.$route.query);

    this.updateTaoBi(this.$route.params.taoBi);
    this.getOrderInfo();

    var that = this;
    this.timer = setInterval(function() {
      if(that.totalTime > 0) {
        that.totalTime--;
        that.time.m1 = +parseInt(that.totalTime / 600);
        that.time.m2 = +parseInt(that.totalTime / 60 % 10);
        that.time.s1 = +parseInt(that.totalTime % 60 / 10);
        that.time.s2 = +parseInt(that.totalTime % 60 % 10);
      }
    }, 1000);
  },
  destroyed() {
    $("body").css({"background-color":"#fff"});
    clearInterval(this.timer);
  }
  }
</script>
